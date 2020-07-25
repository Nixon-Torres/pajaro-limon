/* tslint:disable */
import {
  Collection,
  Sku
} from '../index';

declare var Object: any;
export interface ProductInterface {
  "reference": string;
  "description": string;
  "price": number;
  "brand"?: string;
  "subLine"?: string;
  "event"?: string;
  "state"?: string;
  "positionX": number;
  "positionY": number;
  "id"?: number;
  "collectionId"?: number;
  "updatedAt": Date;
  "createdAt": Date;
  "publishedAt"?: Date;
  "published": boolean;
  collection?: Collection;
  skus?: Sku[];
}

export class Product implements ProductInterface {
  "reference": string;
  "description": string;
  "price": number;
  "brand": string;
  "subLine": string;
  "event": string;
  "state": string;
  "positionX": number;
  "positionY": number;
  "id": number;
  "collectionId": number;
  "updatedAt": Date;
  "createdAt": Date;
  "publishedAt": Date;
  "published": boolean;
  collection: Collection;
  skus: Sku[];
  constructor(data?: ProductInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Product`.
   */
  public static getModelName() {
    return "Product";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Product for dynamic purposes.
  **/
  public static factory(data: ProductInterface): Product{
    return new Product(data);
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
      name: 'Product',
      plural: 'Products',
      path: 'Products',
      idName: 'id',
      properties: {
        "reference": {
          name: 'reference',
          type: 'string'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "price": {
          name: 'price',
          type: 'number'
        },
        "brand": {
          name: 'brand',
          type: 'string'
        },
        "subLine": {
          name: 'subLine',
          type: 'string'
        },
        "event": {
          name: 'event',
          type: 'string'
        },
        "state": {
          name: 'state',
          type: 'string',
          default: 'created'
        },
        "positionX": {
          name: 'positionX',
          type: 'number',
          default: 0
        },
        "positionY": {
          name: 'positionY',
          type: 'number',
          default: 0
        },
        "id": {
          name: 'id',
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
        collection: {
          name: 'collection',
          type: 'Collection',
          model: 'Collection',
          relationType: 'belongsTo',
                  keyFrom: 'collectionId',
          keyTo: 'id'
        },
        skus: {
          name: 'skus',
          type: 'Sku[]',
          model: 'Sku',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'productId'
        },
      }
    }
  }
}
