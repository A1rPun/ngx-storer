import { StorerEvent } from '.';

export interface IStorerEvent {
  type: StorerEvent;
  key?: string;
  value?: any;
}
