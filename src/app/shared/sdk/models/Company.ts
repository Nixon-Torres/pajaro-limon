/* tslint:disable */

declare var Object: any;
export interface CompanyInterface {
  "name"?: string;
  "id"?: number;
  "updatedAt": Date;
  "createdAt": Date;
}

export class Company implements CompanyInterface {
  "name": string;
  "id": number;
  "updatedAt": Date;
  "createdAt": Date;
  constructor(data?: CompanyInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Company`.
   */
  public static getModelName() {
    return "Company";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Company for dynamic purposes.
  **/
  public static factory(data: CompanyInterface): Company{
    return new Company(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Company',
      plural: 'Companies',
      path: 'Companies',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date',
          default: new Date(0)
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date',
          default: new Date(0)
        },
      },
      relations: {
      }
    }
  }
}
