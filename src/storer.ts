import { Inject, Injectable } from '@angular/core';
import { IStorerConfig, IStorerEvent, StorerType, StorerEvent } from '.';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class Storer {

  events: Subject<IStorerEvent>;
  private _prefix: string;
  private _webStorage: Storage;

  constructor(
    @Inject('STORER_CONFIG') config: IStorerConfig = {}
  ) {
    this.prefix = config.prefix
      ? config.prefix
      : '';
    this.storageType = config.storageType
      ? config.storageType
      : StorerType.localStorage;
    this.events = new Subject<IStorerEvent>();
  }

  clear(): void {
    this.remove(...this.keys);
  }

  clearAll(): void {
    this._webStorage.clear();
    this.events.next({ type: StorerEvent.clear });
  }

  get(key: string): any {
    key = this.prefixKey(key);
    let str = this._webStorage.getItem(key);
    if (str) {
      try {
        str = JSON.parse(str);
      } catch (e) {
        str = null;
      }
    }
    this.events.next({ key, type: StorerEvent.get });
    return str;
  }

  remove(...keys: string[]): void {
    keys.forEach((key: string) => {
      key = this.prefixKey(key);
      this._webStorage.removeItem(key);
      this.events.next({ key, type: StorerEvent.remove });
    });
  }

  set(key: string, value: any): void {
    key = this.prefixKey(key);
    value = typeof value === 'object'
      ? JSON.stringify(value)
      : value;
    this._webStorage.setItem(key, value);
    this.events.next({ key, value, type: StorerEvent.set });
  }

  get keys(): string[] {
    return Object.keys(this._webStorage)
      .filter(x => x.startsWith(this.prefix));
  }

  get length(): number {
    return this.keys.length;
  }

  get prefix(): string {
    return this._prefix;
  }
  set prefix(prefix: string) {
    const PERIOD = '.';
    if (prefix && !prefix.endsWith(PERIOD)) {
      prefix += PERIOD;
    }
    this._prefix = prefix || '';
  }

  set storageType(storageType: StorerType) {
    this._webStorage = window[StorerType[storageType]];
  }

  private prefixKey(key: string): string {
    return `${this.prefix}${key}`;
  }
}
