import Block from './base/Block';

export default interface IComponentConfig {
   config: { [prop: string]: string | number | void };
   inst: Block;
   template: (() => string) | null;
}

export interface IPopupOptions {
   mode?: 'visible' | 'hide';
   width: number;
   title: string;
   height: number;
}
