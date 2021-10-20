import Block from '../../../../../components/base/Block';
import Controller from '../../../../../api/Controller';
import { store } from '../../../../../store';
import popupClasses from '../../../../../components/base/popup.css';
import { DefaultPropsType, ClassesType } from '../../../../../components/types';
import { IUser } from '../../../../../interfaces/user';
import { IChat } from '../../../../../interfaces/chat';
import { IPopupOptions } from '../../../../../components/interfaces';
import List from '../../../../../components/base/List';

interface IAddUsersTemplateOptions extends IPopupOptions {
   onChooseHandler: () => unknown;
}
/**
 * Окно с добавлением участника чата.
 */
export default class AddUsersTemplate extends Block {
   private _onChooseHandler: (item: IUser) => unknown;

   state: {
      classes: ClassesType;
      mode: string;
      columns: [
         { displayProperty: 'login' },
         { displayProperty: 'first_name' },
      ];
      source: (data: string) => Promise<string>;
      searchHandler?: void;
      itemClickHandler?: void;
      width?: number;
      title?: string;
      height?: number;
   };

   constructor(props: DefaultPropsType) {
      super('div', { ...props });
   }

   getStateFromProps(): void {
      this.state = {
         classes: popupClasses,
         mode: 'hide',
         columns: [
            { displayProperty: 'login' },
            { displayProperty: 'first_name' },
         ],
         source: new Controller().searchUsers,
         searchHandler: this._searchHandler.bind(this),
         itemClickHandler: this._chooseParticapant.bind(this),
      };
   }

   protected _chooseParticapant(item: IUser): void {
      const state = store.getState() as { chats: { currentChat: IChat } };
      new Controller()
         .addUserInChat(
            JSON.stringify({
               users: [item.id],
               chatId: state.chats?.currentChat?.id,
            }),
         )
         .then(() => {
            if (this._onChooseHandler) {
               this._onChooseHandler(item);
            }
         });
   }

   componentAfterRender(): void {
      this.getContent()
         ?.querySelector('div[name="close-button"]')
         ?.addEventListener('click', () => {
            this.state.mode = 'hide';
         });
   }

   open(options: IAddUsersTemplateOptions): void {
      this._open(options);
   }

   close(): void {
      this._close();
   }

   private _open(options: IAddUsersTemplateOptions): void {
      this.state.mode = 'visible';
      this.state.width = options.width;
      this.state.title = options.title;
      this.state.height = options.height;
      if (options.onChooseHandler) {
         this._onChooseHandler = options.onChooseHandler;
      }
   }

   private _close(): void {
      this.state.mode = 'hide';
   }

   private _searchHandler(value: string): void {
      const child = this.getChild('list') as List;
      child?.setSearchString(value);
   }

   render(): string {
      return `<div class="{{classes.popup__overlay}} {{getClass 'popup_' mode classes}}">
      <div class="{{classes.popup}}"
          style="width:{{width}}px;height:{{height}}px;top:calc(50% - {{devide height  2}}px);left:calc(50% - {{devide width 2}}px)">
          <div class="{{classes.popup__header}}">
              <div> {{title}}</div>
              <div name="close-button" class="{{classes.popup__close-button}}">X</div>
          </div>
          <div>
              {{{Input onChange=searchHandler}}}
              {{{List name='list' onItemClick=itemClickHandler columns=columns source=source searchStringKey='login'}}}
          </div>
      </div>
  </div>`;
   }

   static regName = 'AddUsersTemplate';
}
