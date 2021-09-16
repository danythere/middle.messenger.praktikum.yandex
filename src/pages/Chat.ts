import Block from '../components/mvc/Block';
import chat from './Chat/chat.hbs';
import compile from '../utils/helpers';
import { config } from './Chat/config';

/**
 * Страница с чатами.
 */
export default class Chat extends Block {
   constructor(props: { [props: string]: unknown }) {
      super('div', { ...props });
   }

   render(): DocumentFragment {
      const fragment = compile(chat, config);
      return fragment.content;
   }
}
