import Block from '../../../components/base/Block';
import dialogList from './DialogList/dialogList.hbs';
import compile from '../../../utils/helpers';
import { getConfig } from './DialogList/config';
import { DefaultPropsType } from '../../../components/types';

/**
 * Лента диалогов.
 */
export default class DialogList extends Block {
   constructor(props: DefaultPropsType) {
      super('div', { ...props });
   }

   _openCreateChatPopup(): void {
      this._config.components.popups.createChat.inst.open();
   }

   render(): DocumentFragment {
      const config = getConfig({
         createChatHandler: this._openCreateChatPopup.bind(this),
      });
      this._config = config;
      const fragment = compile(dialogList, config);
      return fragment.content;
   }
}
