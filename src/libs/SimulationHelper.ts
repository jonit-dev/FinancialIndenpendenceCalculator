import { Person } from '../classes/Person';
import { RolesSalary } from '../constants/salaries.const';
import { IProvinceChildCareCost, IProvinceResult, IResult, Provinces } from '../types/index.types';
import { GenericHelper } from './GenericHelper';
import { InterestHelper } from './InterestHelper';



export class SimulationHelper {

  public static calculateResults(family: Person[], startingCapital: number, maxYears: number, province: Provinces, provinceChildCareCosts: IProvinceChildCareCost, baseExpenses: number, interestRate: number, inflationRate: number, childBenefitValue: number, printResults: "FULL" | "SUMMARY" | "NO"): IProvinceResult {

    let results: IResult[] = []

    const realInterestRateYr = interestRate - inflationRate
    const realInterestRateMo = realInterestRateYr / 12

    let timeTo1M;
    let timeToFinancialIndependence;
    let capital = startingCapital

    console.log(`Starting Capital: ${startingCapital}`);

    for (let year = 1; year <= maxYears; year++) {


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

      const agesString = family.map((person) => `${person.name}'s Age: ${person.age}`).join('\n')

      const salariesString = family.map((person) => {


        const grossSalary = RolesSalary[province][person.role].grossYr;
        const netSalaryMo = RolesSalary[province][person.role].netMo;

        return `> ${person.name}'s Salary: ${person.role} => ${GenericHelper.formatCurrency('CAD', grossSalary)} gross(yr) / ${GenericHelper.formatCurrency('CAD', netSalaryMo)} net(mo)`

      }).join('\n')



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

      // check if one of our goals were met
      if (capital >= 1000000 && !timeTo1M) {
        timeTo1M = year
      }
      if ((passiveIncomeMo > totalExpenses) && !timeToFinancialIndependence) {
        timeToFinancialIndependence = year
      }

      // increase 1 year in all family members

      family.forEach((person) => person.age++)

      // check if we should upgrade family member roles

      family = family.map((person) => {

        if (person.nextRoles.length) {

          const nextRole = person.nextRoles[0]

          if (year > nextRole.year) { //means we should update its roles

            person.nextRoles.shift() //remove first next role item

            // remove next role and update family member
            return {
              ...person,
              role: nextRole.nextRole
            }
          }
          return person
        }


        return person
      })


      switch (printResults) {

        case "FULL":
          console.log(`🖩 *** Year: ${year} *** 🖩 `);
          console.log(agesString);
          console.log(`> Province: ${province}`);
          console.log(`> Real Interest Rate/Mo: ${realInterestRateMo.toFixed(2)}%`);
          console.log(salariesString);
          console.log(`> Total Revenue: ${GenericHelper.formatCurrency('CAD', totalRevenue)}`);
          console.log(`> Total Expenses: ${GenericHelper.formatCurrency('CAD', totalExpenses)}`);
          console.log(`> Total Extra income: ${GenericHelper.formatCurrency('CAD', extraIncome)}`);
          console.log(`> Monthly Investment: $${GenericHelper.formatCurrency('CAD', monthlyInvestment)}`);
          console.log(`> Capital after 12 months: ${GenericHelper.formatCurrency('CAD', capital)}`);
          console.log(`> Estimated Passive Income (5% per year): ${GenericHelper.formatCurrency('CAD', passiveIncomeMo)}/mo`);
          console.log('\n');
          break;

        case "SUMMARY":
          console.log(`🖩 *** Year: ${year} *** 🖩 `);
          console.log(agesString);
          console.log(salariesString);
          console.log(`> Capital after 12 months: ${GenericHelper.formatCurrency('CAD', capital)}`);
          console.log('\n');
          break;
        case "NO":
          break;
      }
    }

    return {
      province,
      results,
      timeTo1M,
      timeToFinancialIndependence
    }


  }


}