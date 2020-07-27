/* tslint:disable */
import {
  Product
} from '../index';

declare var Object: any;
export interface SkuInterface {
  "plu": string;
  "size"?: string;
  "color"?: string;
  "id"?: number;
  "productId"?: number;
  "updatedAt": Date;
  "createdAt": Date;
  "publishedAt"?: Date;
  "published": boolean;
  product?: Product;
}

export class Sku implements SkuInterface {
  "plu": string;
  "size": string;
  "color": string;
  "id": number;
  "productId": number;
  "updatedAt": Date;
  "createdAt": Date;
  "publishedAt": Date;
  "published": boolean;
  product: Product;
  constructor(data?: SkuInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Sku`.
   */
  public static getModelName() {
    return "Sku";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Sku for dynamic purposes.
  **/
  public static factory(data: SkuInterface): Sku{
    return new Sku(data);
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
      name: 'Sku',
      plural: 'Skus',
      path: 'Skus',
      idName: 'id',
      properties: {
        "plu": {
          name: 'plu',
          type: 'string'
        },
        "size": {
          name: 'size',
          type: 'string'
        },
        "color": {
          name: 'color',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "productId": {
          name: 'productId',
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
        product: {
          name: 'product',
          type: 'Product',
          model: 'Product',
          relationType: 'belongsTo',
                  keyFrom: 'productId',
          keyTo: 'id'
        },
      }
    }
  }
}
