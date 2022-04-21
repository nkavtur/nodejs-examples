export abstract class AbstractModel {

  asRaw() {
    const proto = Object.getPrototypeOf(this);
    const modifiedJsonObj: any = {};

    Object.entries(Object.getOwnPropertyDescriptors(proto))
      .filter(([key, descriptor]) => typeof descriptor.get === 'function')
      .map(([key, descriptor]) => {
        if (descriptor && key[0] !== '_') {
          try {
            const val = (this as any)[key];
            modifiedJsonObj[key] = val;
          } catch (error) {
            console.error(`Error calling getter ${key}`, error);
          }
        }
      });

    return modifiedJsonObj;
  }

  asJson() {
    return JSON.stringify(this.asRaw());
  }
}

export default class Note extends AbstractModel {

  constructor(private _title: string, private _body: string) {
    super();
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get body(): string {
    return this._body;
  }

  set body(value: string) {
    this._body = value;
  }

}

