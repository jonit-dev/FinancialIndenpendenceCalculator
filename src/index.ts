import _ from 'lodash';

import { Person } from './classes/Person';
import { provinceChildCareCosts } from './constants/provinces.const';
import { SimulationHelper } from './libs/SimulationHelper';
import { IProvinceResult, Provinces, Roles } from './types/index.types';

/*#############################################################|
|  >>> YOUR INPUT
*##############################################################*/


// Your users ========================================

const joao = new Person(30, "Joao", Roles.RemoteDevCanada, [
  {
    year: 5,
    role: Roles.RemoteDevUS
  }
])

const sarah = new Person(33, "Sarah", Roles.jobEntryLevelAny, [
  { year: 1, role: Roles.DesignerEntryLevel },
  { year: 2, role: Roles.DesignerJr },
  { year: 5, role: Roles.DesignerIntermediate },
  { year: 7, role: Roles.DesignerRemoteUS },
])

const family = [joao, sarah]

const startingCapital = 239000

const maxYears = 15 //for how long do you expect to work?

const childBenefitValue = 500
const interestRate = 8 //8% is the average annual rate for US stocks. Check VOO ETF
const avgCanada10YearInflation = 1.59




// PROGRAM ========================================

const MBResults = SimulationHelper.calculateResults(_.cloneDeep(family), startingCapital, maxYears, Provinces.MB, provinceChildCareCosts, interestRate, avgCanada10YearInflation, childBenefitValue, "NO")

//With home buying
// const QCResults = SimulationHelper.calculateResults(_.cloneDeep(family), startingCapital, maxYears, Provinces.QC, provinceChildCareCosts, interestRate, avgCanada10YearInflation, childBenefitValue, "NO", true, 300000)

const QCResults = SimulationHelper.calculateResults(_.cloneDeep(family), startingCapital, maxYears, Provinces.QC, provinceChildCareCosts, interestRate, avgCanada10YearInflation, childBenefitValue, "NO")

const BCResults = SimulationHelper.calculateResults(_.cloneDeep(family), startingCapital, maxYears, Provinces.BC, provinceChildCareCosts, interestRate, avgCanada10YearInflation, childBenefitValue, "NO")

const simulationResults: IProvinceResult[] = [
  MBResults,
  QCResults,
  BCResults
]

SimulationHelper.printComparisonResults(maxYears, simulationResults)



// const QCResults = SimulationHelper.calculateResults(family, startingCapital, maxYears, Provinces.QC, provinceChildCareCosts, baseExpenses, interestRate, avgCanada10YearInflation, childBenefitValue, "NO")
