import { ClassesType } from 'components/types';
import Block from './Block';
import classes from './Heading/heading.css';

interface IHeadingProps {
   classes: ClassesType;
   title: string;
}
/**
 * Базовый компонент отображения заголовков.
 */
export default class Heading extends Block {
   constructor(props: IHeadingProps) {
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
