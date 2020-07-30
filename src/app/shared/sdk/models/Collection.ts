/* tslint:disable */
import {
  Stream,
  Media,
  Product
} from '../index';

declare var Object: any;
export interface CollectionInterface {
  "description": string;
  "state": string;
  "startTime": number;
  "id"?: number;
  "streamId"?: number;
  "collectionId"?: number;
  "updatedAt": Date;
  "createdAt": Date;
  "publishedAt"?: Date;
  "published": boolean;
  stream?: Stream;
  banner?: Media;
  products?: Product[];
}

export class Collection implements CollectionInterface {
  "description": string;
  "state": string;
  "startTime": number;
  "id": number;
  "streamId": number;
  "collectionId": number;
  "updatedAt": Date;
  "createdAt": Date;
  "publishedAt": Date;
  "published": boolean;
  stream: Stream;
  banner: Media;
  products: Product[];
  constructor(data?: CollectionInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Collection`.
   */
  public static getModelName() {
    return "Collection";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Collection for dynamic purposes.
  **/
  public static factory(data: CollectionInterface): Collection{
    return new Collection(data);
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
      name: 'Collection',
      plural: 'Collections',
      path: 'Collections',
      idName: 'id',
      properties: {
        "description": {
          name: 'description',
          type: 'string'
        },
        "state": {
          name: 'state',
          type: 'string',
          default: 'created'
        },
        "startTime": {
          name: 'startTime',
          type: 'number',
          default: 0
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "streamId": {
          name: 'streamId',
          type: 'number'
        },
        "collectionId": {
          name: 'collectionId',
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
        "publishedAt": {
          name: 'publishedAt',
          type: 'Date'
        },
        "published": {
          name: 'published',
          type: 'boolean',
          default: false
        },
      },
      relations: {
        stream: {
          name: 'stream',
          type: 'Stream',
          model: 'Stream',
          relationType: 'belongsTo',
                  keyFrom: 'streamId',
          keyTo: 'id'
        },
        banner: {
          name: 'banner',
          type: 'Media',
          model: 'Media',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'singleId'
        },
        products: {
          name: 'products',
          type: 'Product[]',
          model: 'Product',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'collectionId'
        },
      }
    }
  }
}
