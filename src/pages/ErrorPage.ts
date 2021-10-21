import Block from '../components/base/Block';
import classes from './ErrorPage/errorPage.css';
import { DefaultPropsType } from '../components/types';
import errorIcon from '../assets/error.svg';

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
         errorIcon,
      };
   }

   render(): string {
      return `<div class="{{classes.error-page__content}}">
      <span>{{{Heading title=title}}}</span>
      <div>
        <img class="{{classes.error-page__image}}" src="{{errorIcon}}" />
      </div>
    </div>`;
   }

   static regName = 'ErrorPage';
}
