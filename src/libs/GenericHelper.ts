import { JPSalaryCAD, SarahSalaryCAD } from '../constants/salaries.const';
import { IProvinceChildCareCost, JPRoles, SarahRoles } from '../types/index.types';



export class GenericHelper {


  public static calculateChildCareCost(year: number, province: string, provinceChildCareData: IProvinceChildCareCost) {
    if (year === 1) {
      return provinceChildCareData[province].infant
    }
    if (year >= 2 && year <= 3) {
      return provinceChildCareData[province].toddler
    }

    if (year >= 3 && year <= 4) {
      return provinceChildCareData[province].preSchool
    }

    return 0
  }


  public static calculateExpectedSalary(year: number, province: string) {

    let jpRole;
    let sarahRole;

    if (year === 1) {
      jpRole = JPRoles.RemoteDevCanada
      sarahRole = SarahRoles.jobEntryLevelAny
    }

    if (year === 2) {
      jpRole = JPRoles.RemoteDevCanada
      sarahRole = SarahRoles.DesignerEntryLevel
    }

    if (year >= 3 && year <= 5) {
      jpRole = JPRoles.RemoteDevCanada;
      sarahRole = SarahRoles.DesignerJr
    }

    if (year >= 6 && year <= 7) {
      jpRole = JPRoles.RemoteDevUS
      sarahRole = SarahRoles.DesignerIntermediate
    }

    if (year > 7) {
      jpRole = JPRoles.RemoteDevUS
      sarahRole = SarahRoles.DesignerRemoteUS
    }

    return {
      jpRole,
      sarahRole,
      jpGrossSalary: JPSalaryCAD[province][jpRole].grossYr,
      sarahGrossSalary: SarahSalaryCAD[province][sarahRole].grossYr,
      jpNetSalaryMo: JPSalaryCAD[province][jpRole].netMo,
      sarahNetSalaryMo: SarahSalaryCAD[province][sarahRole].netMo,

    }
  }

  public static formatCurrency(currency: string, number) {

    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(number)

  }

}