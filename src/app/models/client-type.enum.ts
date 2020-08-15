export enum ClientType {
    Administrator,Company,Customer
}

export namespace ClientType {

    export function values() {
      return Object.keys(ClientType).filter(
        (type) => isNaN(<any>type) && type !== 'values'
      );
    }
  }
