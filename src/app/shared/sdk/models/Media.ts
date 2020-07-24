/* tslint:disable */

declare var Object: any;
export interface MediaInterface {
  "key"?: string;
  "url": string;
  "ext": string;
  "fileName": string;
  "size": string;
  "type": string;
  "tags"?: Array<any>;
  "alt"?: string;
  "fieldName"?: string;
  "storageCode"?: string;
  "id"?: number;
  "multipleId"?: number;
  "multipleType"?: string;
  "singleId"?: number;
  "singleType"?: string;
  "updatedAt": Date;
  "createdAt": Date;
  multiple?: any;
  single?: any;
}

export class Media implements MediaInterface {
  "key": string;
  "url": string;
  "ext": string;
  "fileName": string;
  "size": string;
  "type": string;
  "tags": Array<any>;
  "alt": string;
  "fieldName": string;
  "storageCode": string;
  "id": number;
  "multipleId": number;
  "multipleType": string;
  "singleId": number;
  "singleType": string;
  "updatedAt": Date;
  "createdAt": Date;
  multiple: any;
  single: any;
  constructor(data?: MediaInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Media`.
   */
  public static getModelName() {
    return "Media";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Media for dynamic purposes.
  **/
  public static factory(data: MediaInterface): Media{
    return new Media(data);
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
      name: 'Media',
      plural: 'medias',
      path: 'medias',
      idName: 'id',
      properties: {
        "key": {
          name: 'key',
          type: 'string'
        },
        "url": {
          name: 'url',
          type: 'string'
        },
        "ext": {
          name: 'ext',
          type: 'string'
        },
        "fileName": {
          name: 'fileName',
          type: 'string'
        },
        "size": {
          name: 'size',
          type: 'string'
        },
        "type": {
          name: 'type',
          type: 'string'
        },
        "tags": {
          name: 'tags',
          type: 'Array&lt;any&gt;'
        },
        "alt": {
          name: 'alt',
          type: 'string'
        },
        "fieldName": {
          name: 'fieldName',
          type: 'string'
        },
        "storageCode": {
          name: 'storageCode',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "multipleId": {
          name: 'multipleId',
          type: 'number'
        },
        "multipleType": {
          name: 'multipleType',
          type: 'string'
        },
        "singleId": {
          name: 'singleId',
          type: 'number'
        },
        "singleType": {
          name: 'singleType',
          type: 'string'
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
        multiple: {
          name: 'multiple',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'multipleId',
          keyTo: 'id'
        },
        single: {
          name: 'single',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'singleId',
          keyTo: 'id'
        },
      }
    }
  }
}
