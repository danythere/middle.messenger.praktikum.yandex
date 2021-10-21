import Block from '../components/base/Block';
import classes from './ErrorPage/errorPage.css';
import { DefaultPropsType } from '../components/types';

/**
 * Страница с ошибкой.
 */
export default class ErrorPage extends Block {
   constructor(props: DefaultPropsType) {
      super('div', { ...props });
   }

   getStateFromProps(): void {
      this.state = {
         classes,
         type: 'notFound',
         title: '404',
         image: 'error.svg',
      };
   }

   render(): string {
      return `<div class="{{classes.error-page__content}}">
      <span>{{{Heading title=title}}}</span>
      <div>
        <img class="{{classes.error-page__image}}" src="{{image}}" />
      </div>
    </div>`;
   }

   static regName = 'ErrorPage';
}
