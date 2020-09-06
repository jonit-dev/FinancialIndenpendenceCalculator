import { Roles } from '../types/index.types';

interface INextRole {
  year: number,
  role: Roles
}

export interface IPersonAsset {
  name: string,
  value: number
}

export class Person {

  public age: number;
  public name: string;
  public role: Roles
  public nextRoles: INextRole[]
  public assets: IPersonAsset[]

  constructor(age: number, name: string, role: Roles, nextRoles: INextRole[], assets: IPersonAsset[] = []) {
    this.age = age;
    this.name = name;
    this.role = role;
    this.nextRoles = nextRoles
    this.assets = assets;
  }




}