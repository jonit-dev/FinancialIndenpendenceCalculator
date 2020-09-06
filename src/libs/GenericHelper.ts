import { IProvinceChildCareCost } from '../types/index.types';




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

  public static formatCurrency(currency: string, number: number) {

    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(number)

  }

}