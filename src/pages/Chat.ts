import Block from '../components/base/Block';
import chat from './Chat/chat.hbs';
import compile from '../utils/helpers';
import { config } from './Chat/config';
import { DefaultPropsType } from '../components/types';
import Controller from '../api/Controller';

/**
 * Страница с чатами.
 */
export default class Chat extends Block {
   constructor(props: DefaultPropsType) {
      super('div', { ...props });
   }

   render(): DocumentFragment {
      new Controller().getChats().then(res => {
         debugger;
         console.log(res);
      });
      const fragment = compile(chat, config);
      return fragment.content;
   }
}
