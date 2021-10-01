import Block from '../../../../../components/base/Block';
import Input from '../../../../../components/base/Input';
import compile from '../../../../../utils/helpers';
import addUsersTemplate from './addUsersTemplate.hbs';
import Controller from './../../../../../api/Controller';
import { getConfig } from './config';

/**
 * Блок диалога, отображаемый в ленте диалогов.
 */
export default class AddUsersTemplate extends Block {
   constructor(props) {
      super('div', { ...props });
   }

   private _searchHandler(value): void {
     this._config.components.list.users.inst.setSearchString(value);
   }

   protected _chooseUserHandler(item):void{
      new Controller().addUserInChat(JSON.stringify({users:[item.id], chatId:96}))
      console.log(item);
   }

   render(): DocumentFragment {
      this._config = getConfig({
         searchHandler: this._searchHandler.bind(this),
         onListItemClick:this._chooseUserHandler.bind(this)
      });
      const fragment = compile(
         addUsersTemplate,
         this._config),
      );
      return fragment.content;
   }
}
