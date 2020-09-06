import { IPersonAsset, Person } from '../classes/Person';
import { householdExpenses, RolesSalary } from '../constants/provinces.const';
import { IProvinceChildCareCost, IProvinceResult, IResult, Provinces } from '../types/index.types';
import { GenericHelper } from './GenericHelper';
import { InterestHelper } from './InterestHelper';


export class SimulationHelper {

  public static printComparisonResults(simulationLength: number, simulationResults: IProvinceResult[]) {

    console.log('📊 Simulation Comparison Results 📊');

    console.log(`> Total simulation length: ${simulationLength} yrs`);

    for (const result of simulationResults) {
      console.log(`📍 Province: ${result.province}`);
      console.log(`> Time to 1M CAD: ${result.timeTo1M} yrs`);
      console.log(`> Time to financial independence: ${result.timeToFinancialIndependence} yrs`);
      console.log(`> Final Capital: ${GenericHelper.formatCurrency('CAD', result.finalCapital)}`);
      if (result.assets.length) {
        console.log(`> Assets: ${JSON.stringify(result.assets)}`);
      }
      console.log(`\n`);
    }


  }


  public static calculateResults(family: Person[], startingCapital: number, maxYears: number, province: Provinces, provinceChildCareCosts: IProvinceChildCareCost, interestRate: number, inflationRate: number, childBenefitValue: number, printResults: "FULL" | "SUMMARY" | "NO", buyHome?: boolean, buyHomePrice?: number): IProvinceResult {


    let results: IResult[] = []

    const assetHolder = family[0];
    let baseExpenses = householdExpenses[province].reduce((total, el) => total + el.value, 0);
    let hasHome = false
    const rentalValue = householdExpenses[province].find((item) => item.name === "Rental")!.value;

    const realInterestRateYr = interestRate - inflationRate;
    const realInterestRateMo = realInterestRateYr / 12;
    const homeAppreciationRate = 3 //avg 3% per year

    let timeTo1M;
    let timeToFinancialIndependence;
    let capital = startingCapital

    if (printResults !== "NO") console.log(`>📍 Province: ${province} | Starting Capital: ${GenericHelper.formatCurrency('CAD', startingCapital)}`);

    for (let year = 1; year <= maxYears; year++) {


      //Buy home, if simulation requires it
      if (buyHome && buyHomePrice && capital >= buyHomePrice && hasHome === false) {
        capital -= buyHomePrice
        baseExpenses -= rentalValue!
        console.log(`> 🏡 Goal: Bought a home for ${GenericHelper.formatCurrency('CAD', buyHomePrice)}!`);
        hasHome = true
        assetHolder.assets.push({
          name: "Home",
          value: buyHomePrice
        })
      }




      let extraIncome;
      const childCareCost = GenericHelper.calculateChildCareCost(year, province, provinceChildCareCosts);

      const totalRevenue = family.reduce((total, person) => total + RolesSalary[province][person.role].netMo, 0)

      const totalExpenses = baseExpenses + childCareCost

      if (year < 21) {
        extraIncome = childBenefitValue + 100
      } else {
        // no child benefit after 21 yr/old
        extraIncome = 200  //digital assets, etc, etc...
      }

      const monthlyInvestment = (totalRevenue - totalExpenses) + extraIncome

      // calculate Future Value of Capital

      capital = -InterestHelper.FV(realInterestRateMo / 100, 12, monthlyInvestment, capital) // in 12 months

      const passiveIncomeMo = (capital * 0.05) / 12

      // increase 1 year in all family members
      family.forEach((person) => person.age++)

      // check if we should upgrade family member roles

      family.forEach((person) => {

        if (person.nextRoles.length) {

          const nextRole = person.nextRoles[0]

          if (year >= nextRole.year) { //means we should update its roles

            person.nextRoles.shift() //remove first next role item

            // remove next role and update family member
            person.role = nextRole.role
          }
        }
      })


      //appreciate our home value, if we have it
      assetHolder.assets.forEach((asset) => {

        if (asset.name === "Home") {
          asset.value = -InterestHelper.FV((homeAppreciationRate / 100) / 12, 12, 0, asset.value)
        }

      })



      results.push({
        family,
        year,
        totalRevenue,
        totalExtra: extraIncome,
        totalExpenses,
        totalInvestment: monthlyInvestment,
        capital,
        passiveIncomeMo
      })

      if (printResults !== "NO") console.log(`🖩 *** Year: ${year} *** 🖩 `);

      // check if one of our goals were met
      if (capital >= 1000000 && !timeTo1M) {
        timeTo1M = year
        if (printResults !== "NO") console.log(`> Goal: 💰 1M of capital reached! 💰`);
      }
      if ((passiveIncomeMo > totalExpenses) && !timeToFinancialIndependence) {
        timeToFinancialIndependence = year
        if (printResults !== "NO") console.log(`> Goal: 🤑 Financial Independence Reached! FU Money!! 🤑`);
      }

      const agesString = family.map((person) => `> ${person.name}'s Age: ${person.age}`).join('\n')

      const salariesString = family.map((person) => {

        const grossSalary = RolesSalary[province][person.role].grossYr;
        const netSalaryMo = RolesSalary[province][person.role].netMo;

        return `> ${person.name}'s Salary: ${person.role} => ${GenericHelper.formatCurrency('CAD', grossSalary)} gross(yr) / ${GenericHelper.formatCurrency('CAD', netSalaryMo)} net(mo)`

      }).join('\n')


      switch (printResults) {

        case "FULL":
          console.log(agesString);

          console.log(`> Real Interest Rate/Mo: ${realInterestRateMo.toFixed(2)}%`);
          console.log(salariesString);
          console.log(`> Total Revenue: ${GenericHelper.formatCurrency('CAD', totalRevenue)}`);
          console.log(`> Total Expenses: ${GenericHelper.formatCurrency('CAD', totalExpenses)}`);
          console.log(`> Total Extra income: ${GenericHelper.formatCurrency('CAD', extraIncome)}`);
          console.log(`> Monthly Investment: $${GenericHelper.formatCurrency('CAD', monthlyInvestment)}`);
          console.log(`> Total Capital: ${GenericHelper.formatCurrency('CAD', capital)}`);
          console.log(`> Estimated Passive Income per Month (5%/yr rate): ${GenericHelper.formatCurrency('CAD', passiveIncomeMo)}`);
          console.log('\n');
          break;

        case "SUMMARY":
          console.log(`📍 Province: ${province}`);
          console.log(agesString);
          console.log(salariesString);
          console.log(`> Total Capital: ${GenericHelper.formatCurrency('CAD', capital)}`);
          console.log(`> Estimated Passive Income per Month (5%/yr rate): ${GenericHelper.formatCurrency('CAD', passiveIncomeMo)}`);
          console.log('\n');
          break;
        case "NO":
          break;
      }
    }

    const assetsResults: IPersonAsset[] = assetHolder.assets

    return {
      province,
      results,
      timeTo1M,
      timeToFinancialIndependence,
      finalCapital: capital,
      assets: assetsResults
    }


  }


}