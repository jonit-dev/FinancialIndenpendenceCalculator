import { Person } from './classes/Person';
import { provinceChildCareCosts } from './constants/salaries.const';
import { SimulationHelper } from './libs/SimulationHelper';
import { IExpenses, Provinces, Roles } from './types/index.types';

/*#############################################################|
|  >>> YOUR INPUT
*##############################################################*/

/*
TODO: 

- Multiple provinces comparison
- Married, non married support
- Kids, without kids support, multiple kids
*/


// Your users ========================================

const joao = new Person(30, "Joao", Roles.RemoteDevCanada, [
  {
    year: 5,
    nextRole: Roles.RemoteDevUS
  }
])

const sarah = new Person(33, "Sarah", Roles.jobEntryLevelAny, [
  { year: 1, nextRole: Roles.DesignerEntryLevel },
  { year: 2, nextRole: Roles.DesignerJr },
  { year: 5, nextRole: Roles.DesignerIntermediate },
  { year: 7, nextRole: Roles.DesignerRemoteUS },
])

const family = [joao, sarah]

const startingCapital = 0

const maxYears = 20 //for how long should we calculate?

const province = Provinces.MB //for tax considerations...
const childBenefitValue = 500
const interestRate = 8 //8% is the average annual rate for US stocks. Check VOO ETF
const avgCanada10YearInflation = 1.59

const householdExpenses: IExpenses = {
  [Provinces.MB]: [{ name: "Home", value: 850 },
  { name: "Startup", value: 20 },
  { name: "Supermarket", value: 500 },
  { name: "Health", value: 30 },
  { name: "Pet", value: 20 },
  { name: "Transportation", value: 100 },
  { name: "Baby", value: 60 },
  { name: "Communication", value: 150 },
  { name: "Restaurants", value: 60 },
  { name: "Non-recurring", value: 100 }]
}

const baseExpenses = householdExpenses[province].reduce((total, el) => total + el.value, 0)

// PROGRAM ========================================

const results = SimulationHelper.calculateResults(family, startingCapital, maxYears, province, provinceChildCareCosts, baseExpenses, interestRate, avgCanada10YearInflation, childBenefitValue, "NO")

console.log(results);


