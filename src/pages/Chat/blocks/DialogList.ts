import Block from '../../../components/mvc/Block';
import dialogList from './DialogList/dialogList.hbs';
import compile from '../../../utils/helpers';
import { config } from './DialogList/config';

/**
 * Лента диалогов.
 */
export default class DialogList extends Block {
   constructor(props: { [props: string]: unknown }) {
      super('div', { ...props });
   }

   render(): DocumentFragment {
      const fragment = compile(dialogList, config);
      return fragment.content;
   }
}
