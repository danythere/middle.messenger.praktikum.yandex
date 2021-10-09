import Block from './Block';
import classes from './Heading/heading.css';
import { DefaultPropsType } from '../types';

/**
 * Базовый компонент отображения заголовков.
 */
export default class Heading extends Block {
   constructor(props: DefaultPropsType) {
      super('div', props);
   }

   getStateFromProps(): void {
      this.state = {
         classes,
         title: '',
      };
   }

   render(): string {
      return `<h1 class="{{classes.heading}}">
      {{title}}
  </h1>`;
   }

   static regName = 'Heading';
}
}
