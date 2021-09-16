import Block from './mvc/Block';

export default interface IComponentConfig {
   config: { [prop: string]: string | number | void };
   inst: Block;
   template: (() => string) | null;
}
