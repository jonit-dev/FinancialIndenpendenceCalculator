import { IProvinceChildCareCost, ISalary, Provinces, Roles } from '../types/index.types';



export const RolesSalary: ISalary = {
  [Provinces.MB]: {
    [Roles.RemoteDevCanada]: {
      grossYr: 90000,
      netMo: 5521
    },
    [Roles.RemoteDevUS]: {
      grossYr: 150000,
      netMo: 8708
    },
    [Roles.jobEntryLevelAny]: {
      grossYr: 24317,
      netMo: 2026
    },
    [Roles.DesignerEntryLevel]: {
      grossYr: 34000,
      netMo: 2303
    },
    [Roles.DesignerJr]: {
      grossYr: 40000,
      netMo: 2652
    },
    [Roles.DesignerIntermediate]: {
      grossYr: 50000,
      netMo: 3223
    },
    [Roles.DesignerRemoteUS]: {
      grossYr: 58790,
      netMo: 3713
    }
  }
}

export const SarahSalaryCAD: ISalary = {
  [Provinces.MB]: {

  }
}


export const provinceChildCareCosts: IProvinceChildCareCost = {
  [Provinces.MB]: {
    infant: 651,
    toddler: 451,
    preSchool: 451
  }
}