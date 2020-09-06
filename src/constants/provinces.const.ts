import { IExpenses, IProvinceChildCareCost, ISalary, Provinces, Roles } from '../types/index.types';



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
  },
  [Provinces.QC]: {
    [Roles.RemoteDevCanada]: {
      grossYr: 90000,
      netMo: 5102
    },
    [Roles.RemoteDevUS]: {
      grossYr: 150000,
      netMo: 7770
    },
    [Roles.jobEntryLevelAny]: {
      grossYr: 24317,
      netMo: 1942
    },
    [Roles.DesignerEntryLevel]: {
      grossYr: 34000,
      netMo: 2201
    },
    [Roles.DesignerJr]: {
      grossYr: 40000,
      netMo: 2529
    },
    [Roles.DesignerIntermediate]: {
      grossYr: 50000,
      netMo: 3046
    },
    [Roles.DesignerRemoteUS]: {
      grossYr: 58790,
      netMo: 3478
    }
  },
  [Provinces.BC]: {
    [Roles.RemoteDevCanada]: {
      grossYr: 90000,
      netMo: 5631
    },
    [Roles.RemoteDevUS]: {
      grossYr: 150000,
      netMo: 8667
    },
    [Roles.jobEntryLevelAny]: {
      grossYr: 24317,
      netMo: 2036
    },
    [Roles.DesignerEntryLevel]: {
      grossYr: 34000,
      netMo: 2320
    },
    [Roles.DesignerJr]: {
      grossYr: 40000,
      netMo: 2690
    },
    [Roles.DesignerIntermediate]: {
      grossYr: 50000,
      netMo: 3279
    },
    [Roles.DesignerRemoteUS]: {
      grossYr: 58790,
      netMo: 3784
    }
  },

}

export const provinceChildCareCosts: IProvinceChildCareCost = {
  [Provinces.MB]: {
    infant: 651,
    toddler: 451,
    preSchool: 451
  },
  [Provinces.QC]: {
    infant: 152,
    toddler: 152,
    preSchool: 152
  },
  [Provinces.BC]: { //Burnaby, surrey values...
    infant: 1020,
    toddler: 1020,
    preSchool: 755
  }
}

export const householdExpenses: IExpenses = {
  [Provinces.MB]: [{ name: "Home", value: 850 },
  { name: "Startup", value: 20 },
  { name: "Supermarket", value: 500 },
  { name: "Health", value: 30 },
  { name: "Pet", value: 20 },
  { name: "Transportation", value: 100 },
  { name: "Baby", value: 60 },
  { name: "Communication", value: 150 },
  { name: "Restaurants", value: 60 },
  { name: "Non-recurring", value: 100 }],
  [Provinces.QC]: [{ name: "Home", value: 800 },
  { name: "Startup", value: 20 },
  { name: "Supermarket", value: 500 },
  { name: "Health", value: 30 },
  { name: "Pet", value: 20 },
  { name: "Transportation", value: 100 },
  { name: "Baby", value: 60 },
  { name: "Communication", value: 150 },
  { name: "Restaurants", value: 60 },
  { name: "Non-recurring", value: 100 }],
  [Provinces.BC]: [{ name: "Home", value: 1500 },
  { name: "Startup", value: 20 },
  { name: "Supermarket", value: 600 },
  { name: "Health", value: 30 },
  { name: "Pet", value: 20 },
  { name: "Transportation", value: 100 },
  { name: "Baby", value: 60 },
  { name: "Communication", value: 150 },
  { name: "Restaurants", value: 60 },
  { name: "Non-recurring", value: 100 }]
}