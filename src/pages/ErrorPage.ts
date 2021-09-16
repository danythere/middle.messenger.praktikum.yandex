import Block from '../components/mvc/Block';
import errorPage from './ErrorPage/errorPage.hbs';
import compile from '../utils/helpers';
import { notFoundConfig, commonConfig } from './ErrorPage/config';

/**
 * Страница с ошибкой.
 */
export default class ErrorPage extends Block {
   constructor(props: { [props: string]: unknown }) {
      super('div', { ...props });
   }

   render(): DocumentFragment {
      let fragment = null;
      if (this.props.type === 'notFound') {
         fragment = compile(errorPage, notFoundConfig);
      } else {
         fragment = compile(errorPage, commonConfig);
      }
      return fragment.content;
   }
}
