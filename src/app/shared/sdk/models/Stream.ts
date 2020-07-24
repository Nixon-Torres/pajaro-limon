/* tslint:disable */
import {
  Media,
  Collection
} from '../index';

declare var Object: any;
export interface StreamInterface {
  "description": string;
  "startTime"?: Date;
  "endTime"?: Date;
  "state": string;
  "id"?: number;
  "updatedAt": Date;
  "createdAt": Date;
  "publishedAt"?: Date;
  "published": boolean;
  video?: Media;
  collections?: Collection[];
}

export class Stream implements StreamInterface {
  "description": string;
  "startTime": Date;
  "endTime": Date;
  "state": string;
  "id": number;
  "updatedAt": Date;
  "createdAt": Date;
  "publishedAt": Date;
  "published": boolean;
  video: Media;
  collections: Collection[];
  constructor(data?: StreamInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Stream`.
   */
  public static getModelName() {
    return "Stream";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Stream for dynamic purposes.
  **/
  public static factory(data: StreamInterface): Stream{
    return new Stream(data);
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
      name: 'Stream',
      plural: 'Streams',
      path: 'Streams',
      idName: 'id',
      properties: {
        "description": {
          name: 'description',
          type: 'string'
        },
        "startTime": {
          name: 'startTime',
          type: 'Date'
        },
        "endTime": {
          name: 'endTime',
          type: 'Date'
        },
        "state": {
          name: 'state',
          type: 'string',
          default: 'created'
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
        video: {
          name: 'video',
          type: 'Media',
          model: 'Media',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'singleId'
        },
        collections: {
          name: 'collections',
          type: 'Collection[]',
          model: 'Collection',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'collectionId'
        },
      }
    }
  }
}
