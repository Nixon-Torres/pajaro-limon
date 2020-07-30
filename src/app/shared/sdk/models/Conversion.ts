/* tslint:disable */

declare var Object: any;
export interface ConversionInterface {
  "description": string;
  "url"?: string;
  "state": string;
  "convertedAt"?: Date;
  "id"?: number;
  "updatedAt": Date;
  "createdAt": Date;
}

export class Conversion implements ConversionInterface {
  "description": string;
  "url": string;
  "state": string;
  "convertedAt": Date;
  "id": number;
  "updatedAt": Date;
  "createdAt": Date;
  constructor(data?: ConversionInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Conversion`.
   */
  public static getModelName() {
    return "Conversion";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Conversion for dynamic purposes.
  **/
  public static factory(data: ConversionInterface): Conversion{
    return new Conversion(data);
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
      name: 'Conversion',
      plural: 'Conversions',
      path: 'Conversions',
      idName: 'id',
      properties: {
        "description": {
          name: 'description',
          type: 'string'
        },
        "url": {
          name: 'url',
          type: 'string'
        },
        "state": {
          name: 'state',
          type: 'string',
          default: 'created'
        },
        "convertedAt": {
          name: 'convertedAt',
          type: 'Date'
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
