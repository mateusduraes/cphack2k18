export const getKeyId = (id: any) => `id_${id}`;

export const getId = (object: any) => object.hash;

export enum ActionTypes {
  GET = 0,
  POST = 1,
  DELETE = 2,
  PUT = 3,
  PATCH = 4,
  AFTERSYNC = 5
}

export enum ConnectionTypes {
  ONLY_INTERNET = 0,
  ONLY_LOCAL = 1,
  BOTH = 3
}

export interface ItemOfService {
  action: ActionTypes;
  object?: any;
  type: string;
  keyData?: string;
  keyId: string;
  pathServer?: string;
  params?: any;
  isList?: boolean;
  idSearch?: any;
  errorSync?: any;
  connectionType?: ConnectionTypes;
}

export class StorageApp {
    toSync: ItemOfService[];
    collection: any;

    constructor(toSync: any[], collection: any) {
      this.toSync = toSync;
      this.collection = collection;
    }
}
