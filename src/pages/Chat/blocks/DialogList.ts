import Block from '../../../components/base/Block';
import dialogList from './DialogList/dialogList.hbs';
import compile from '../../../utils/helpers';
import { config } from './DialogList/config';
import { DefaultPropsType } from '../../../components/types';

/**
 * Лента диалогов.
 */
export default class DialogList extends Block {
   constructor(props: DefaultPropsType) {
      super('div', { ...props });
   }

   render(): DocumentFragment {
      const fragment = compile(dialogList, config);
      return fragment.content;
   }
}
