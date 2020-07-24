/* tslint:disable */
import { Injectable } from '@angular/core';
import { Role } from '../../models/Role';
import { Company } from '../../models/Company';
import { User } from '../../models/User';
import { Media } from '../../models/Media';
import { Conversion } from '../../models/Conversion';
import { Stream } from '../../models/Stream';
import { Collection } from '../../models/Collection';
import { Email } from '../../models/Email';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Role: Role,
    Company: Company,
    User: User,
    Media: Media,
    Conversion: Conversion,
    Stream: Stream,
    Collection: Collection,
    Email: Email,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
