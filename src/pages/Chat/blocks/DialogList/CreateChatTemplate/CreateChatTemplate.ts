import Block from '../../../../../components/base/Block';
import compile from '../../../../../utils/helpers';
import createChatTemplate from './createChatTemplate.hbs';
import { getConfig } from './config';
import Controller from './../../../../../api/Controller';

/**
 * Блок диалога, отображаемый в ленте диалогов.
 */
export default class CreateChatTemplate extends Block {
   constructor(props) {
      super('div', { ...props });
   }

   private _createChat(): void {
      new Controller().createChat(JSON.stringify({
         title:this._config.components.inputs.chatName.inst.getValue()
      });
      console.log('chat was created');
   }

   render(): DocumentFragment {
      const config= getConfig({
         createChatHandler: this._createChat.bind(this),
      });
      this._config=config;
      const fragment = compile(
         createChatTemplate,
         config,
      );
      return fragment.content;
   }
}
