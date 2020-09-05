

export enum Provinces {
  MB = "MB"
}

export interface IProvinceChildCareCost {
  [province: string]: {
    infant: 651,
    toddler: 451,
    preSchool: 451
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

export enum JPRoles {
  RemoteDevCanada = "RemoteDevCanada",
  RemoteDevUS = "RemoteDevUS"
}

export enum SarahRoles {
  jobEntryLevelAny = "jobEntryLevelAny",
  DesignerEntryLevel = "DesignerEntryLevel",
  DesignerJr = "DesignerJr",
  DesignerIntermediate = "DesignerIntermediate",
  DesignerRemoteUS = "DesignerRemoteUS"
}