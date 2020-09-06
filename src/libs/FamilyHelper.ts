import { Person } from '../classes/Person';



export class FamilyHelper {


  public static increaseAge(family: Person[]) {

    return family.map((person) => {
      return {
        ...person,
        age: person.age++
      }
    })

  }

  public static upgradeRoles(family: Person[], year: number) {
    return

  }

}