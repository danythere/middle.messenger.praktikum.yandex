import Block from '../components/base/Block';
import chat from './Chat/chat.hbs';
import compile from '../utils/helpers';
import { config } from './Chat/config';
import { DefaultPropsType } from '../components/types';

/**
 * Страница с чатами.
 */
export default class Chat extends Block {
   constructor(props: DefaultPropsType) {
      super('div', { ...props });
   }

   render(): DocumentFragment {
      const fragment = compile(chat, config);
      return fragment.content;
   }
}
