import Block from '../../../components/base/Block';
import dialogScreen from './DialogScreen/dialogScreen.hbs';
import compile from '../../../utils/helpers';
import { getConfig } from './DialogScreen/config';
import Avatar from '../../../components/base/Avatar';
import MessageInput from './MessageInput';
import { ClassesType } from '../../types';

/**
 * Экран открытого диалога.
 */
export default class DialogScreen extends Block {
   private _config: {
      classes: ClassesType;
      userName: string;
      messages: { text: string; author: boolean }[];
      components: {
         avatars: {
            [prop: string]: {
               config: unknown;
               inst: Avatar;
               template: (() => string) | null;
            };
         };
         chat: {
            [prop: string]: {
               config: unknown;
               inst: MessageInput;
               template: (() => string) | null;
            };
         };
      };
   };

   constructor(props: { [props: string]: unknown }) {
      super('div', { ...props });
   }

   _sendMessage(e: Event): void {
      e.preventDefault();
      let successValid = true;

      const validRes =
         this._config.components.chat?.messageInput?.inst?.validate();
      if (validRes) {
         successValid = false;
      }
      if (successValid) {
         const content = this.getContent();
         if (content) {
            const form = content.querySelector('form');
            const formData = new FormData(form || undefined);
            console.log(formData);
         }
      }
   }

   private _openUsersPopup(): void {
      this._config.components.chat.addUserPopup.inst.open();
   }

   render(): DocumentFragment {
      const config = getConfig({
         onSendClick: this._sendMessage.bind(this),
         onAddUserClick: this._openUsersPopup.bind(this),
      });
      this._config = config;
      const fragment = compile(dialogScreen, config);
      return fragment.content;
   }
}
