import { provinceChildCareCosts } from './constants/salaries.const';
import { GenericHelper } from './libs/GenericHelper';
import { InterestHelper } from './libs/InterestHelper';
import { Provinces } from './types/index.types';


const expenses = [
  { name: "Home", value: 850 },
  { name: "Startup", value: 20 },
  { name: "Supermarket", value: 500 },
  { name: "Health", value: 30 },
  { name: "Pet", value: 20 },
  { name: "Transportation", value: 100 },
  { name: "Baby", value: 60 },
  { name: "Communication", value: 150 },
  { name: "Restaurants", value: 60 },
  {
    name: "Non-recurring", value: 100
  },
]
const baseExpenses = expenses.reduce((total, el) => total + el.value, 0)
const province = Provinces.MB //for tax considerations...
const childBenefitValue = 500
const interestRate = 8 //8% is the average annual rate for US stocks. Check VOO ETF
const avgCanada10YearInflation = 1.59
const realInterestRateYr = interestRate - avgCanada10YearInflation
const realInterestRateMo = realInterestRateYr / 12
const startingCapital = 0
const age = 30

let capital = startingCapital

console.log(`Starting Capital: ${startingCapital}`);

let currentAge = age;

for (let year = 1; year <= 60; year++) {


  let extraIncome;
  const childCareCost = GenericHelper.calculateChildCareCost(year, province, provinceChildCareCosts);

  const { jpNetSalaryMo, sarahNetSalaryMo, jpRole, sarahRole, jpGrossSalary, sarahGrossSalary } = GenericHelper.calculateExpectedSalary(year, province)

  console.log(`🖩 *** Year: ${year} - Your Age: ${currentAge} *** 🖩 `);
  console.log(`> Province: ${province}`);
  console.log(`> Real Interest Rate/Mo: ${realInterestRateMo.toFixed(2)}%`);
  console.log(`> JP Role: ${jpRole} - Gross Salary/yr: ${GenericHelper.formatCurrency('CAD', jpGrossSalary)} - Net Income/mo (after tax): ${GenericHelper.formatCurrency('CAD', jpNetSalaryMo)}`);
  console.log(`> Sarah Role: ${sarahRole} - Gross Salary/yr: ${GenericHelper.formatCurrency('CAD', sarahGrossSalary)} - Net Income/mo (after tax): ${GenericHelper.formatCurrency('CAD', sarahNetSalaryMo)}`);
  const totalRevenue = jpNetSalaryMo + sarahNetSalaryMo
  console.log(`> Total Revenue: ${GenericHelper.formatCurrency('CAD', totalRevenue)}`);
  const totalExpenses = baseExpenses + childCareCost
  console.log(`> Total Expenses: ${GenericHelper.formatCurrency('CAD', totalExpenses)}`);

  if (year < 21) {
    extraIncome = childBenefitValue + 100
  } else {
    // no child benefit after 21 yr/old
    extraIncome = 200  //digital assets, etc, etc...
  }

  const monthlyInvestment = (totalRevenue - totalExpenses) + extraIncome

  console.log(`> Monthly Investment: $${GenericHelper.formatCurrency('CAD', monthlyInvestment)}`);

  // calculate Future Value of Capital

  capital = -InterestHelper.FV(realInterestRateMo / 100, 12, monthlyInvestment, capital) // in 12 months

  const passiveIncomeMo = (capital * 0.05) / 12

  console.log(`> Capital after 12 months: ${GenericHelper.formatCurrency('CAD', capital)}`);

  console.log(`> Estimated Passive Income (5% per year): ${GenericHelper.formatCurrency('CAD', passiveIncomeMo)}/mo`);


  console.log('\n');


  currentAge++


}