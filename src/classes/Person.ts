import { Roles } from '../types/index.types';

interface INextRole {
  year: number,
  nextRole: Roles
}


export class Person {

  public age: number;
  public name: string;
  public role: Roles
  public nextRoles: INextRole[]

  constructor(age, name, role: Roles, nextRoles: INextRole[]) {
    this.age = age;
    this.name = name;
    this.role = role;
    this.nextRoles = nextRoles
  }




}