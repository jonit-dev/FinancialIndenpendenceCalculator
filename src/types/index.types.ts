import { IPersonAsset, Person } from '../classes/Person';


export enum Provinces {
  MB = "MB",
  QC = "QC",
  BC = "BC"
}

export interface IProvinceChildCareCost {
  [province: string]: {
    infant: number,
    toddler: number,
    preSchool: number
  }
}

export interface ISalary {
  [province: string]: {
    [role: string]: {
      grossYr: number,
      netMo: number
    }
  }
}

interface IExpense {
  name: string, value: number
}

export interface IExpenses {
  [province: string]: IExpense[]
}

export enum Roles {
  RemoteDevCanada = "RemoteDevCanada",
  RemoteDevUS = "RemoteDevUS",
  jobEntryLevelAny = "jobEntryLevelAny",
  DesignerEntryLevel = "DesignerEntryLevel",
  DesignerJr = "DesignerJr",
  DesignerIntermediate = "DesignerIntermediate",
  DesignerRemoteUS = "DesignerRemoteUS"
}

export interface IResult {
  family: Person[]
  year: number,
  totalRevenue: number,
  totalExtra: number,
  totalExpenses: number,
  totalInvestment: number,
  capital: number,
  passiveIncomeMo: number
}

export interface IProvinceResult {
  province: Provinces,
  timeTo1M: number | undefined,
  timeToFinancialIndependence: number | undefined,
  results: IResult[],
  finalCapital: number,
  assets: IPersonAsset[]
}