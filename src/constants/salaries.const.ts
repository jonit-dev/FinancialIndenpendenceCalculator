import { IProvinceChildCareCost, ISalary, JPRoles, Provinces, SarahRoles } from '../types/index.types';



export const JPSalaryCAD: ISalary = {
  [Provinces.MB]: {
    [JPRoles.RemoteDevCanada]: {
      grossYr: 90000,
      netMo: 5521
    },
    [JPRoles.RemoteDevUS]: {
      grossYr: 150000,
      netMo: 8708
    }
  }
}

export const SarahSalaryCAD: ISalary = {
  [Provinces.MB]: {
    [SarahRoles.jobEntryLevelAny]: {
      grossYr: 24317,
      netMo: 2026
    },
    [SarahRoles.DesignerEntryLevel]: {
      grossYr: 34000,
      netMo: 2303
    },
    [SarahRoles.DesignerJr]: {
      grossYr: 40000,
      netMo: 2652
    },
    [SarahRoles.DesignerIntermediate]: {
      grossYr: 50000,
      netMo: 3223
    },
    [SarahRoles.DesignerRemoteUS]: {
      grossYr: 58790,
      netMo: 3713
    }
  }
}


export const provinceChildCareCosts: IProvinceChildCareCost = {
  [Provinces.MB]: {
    infant: 651,
    toddler: 451,
    preSchool: 451
  }
}