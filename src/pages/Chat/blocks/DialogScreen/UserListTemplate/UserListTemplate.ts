import Block from '../../../../../components/base/Block';
import Controller from '../../../../../api/Controller';
import { DefaultPropsType } from '../../../../../components/types';
import classes from './userListTemplate.css';
import { IUser } from '../../../../../interfaces/user';
import { IPopupOptions } from '../../../../../components/interfaces';

/**
 * Блок диалога, отображаемый в ленте диалогов.
 */
export default class UserListTemplate extends Block {
   constructor(props: DefaultPropsType) {
      super('div', { ...props });
   }

   getStateFromProps(): void {
      this.state = {
         classes,
         mode: 'hide',
         users: [],
         hasMore: true,
         loadMore: this._loadMore.bind(this),
      };
   }

   componentAfterRender(): void {
      const itemsArray = [
         ...this.getContent()?.querySelectorAll('span[name="delete-button"'),
      ];
      this.state.users.forEach((item: IUser, index: number) => {
         itemsArray[index].addEventListener('click', () => {
            new Controller().deleteChatUser(
               JSON.stringify({
                  users: [item.id],
                  chatId: this.props.chatId,
               }),
            );
            this.state.users = this.state.users.filter(
               (obj: IUser) => obj.id !== item.id,
            );
         });
      });
      this.getContent()
         ?.querySelector('div[name="close-button"]')
         ?.addEventListener('click', () => {
            this.state.mode = 'hide';
         });
   }

   open(options: IPopupOptions): void {
      this._open(options);
   }

   close(): void {
      this._close();
   }

   private _open(options: IPopupOptions): void {
      this.state.mode = 'visible';
      this.state.width = options.width;
      this.state.title = options.title;
      this.state.height = options.height;
      this._loadUserList();
   }

   private _close(): void {
      this.state.mode = 'hide';
   }

   protected _loadUserList(limit = 10, offset = 0, loadMore = false): void {
      new Controller()
         .getChatUsers(this.props.chatId, { limit, offset })
         .then(users => {
            const newUsers = JSON.parse(users);
            if (newUsers.length < 10) {
               this.state.hasMore = false;
               if (newUsers.length === 0) {
                  return;
               }
            }
            if (loadMore) {
               this.state.users = [...this.state.users, ...newUsers];
               return;
            }
            this.state.users = newUsers;
         });
   }

   protected _loadMore(): void {
      this._loadUserList(10, this.state.users.length, true);
   }

   render(): string {
      return `<div class="{{classes.popup__overlay}} {{getClass 'popup_' mode classes}}">
      <div class="{{classes.popup}}"
          style="width:{{width}}px;height:{{height}}px;top:calc(50% - {{devide height  2}}px);left:calc(50% - {{devide width 2}}px)">
          <div class="{{classes.popup__header}}">
              <div> {{title}}</div>
              <div name="close-button" class="{{classes.popup__close-button}}">X</div>
          </div>
          <div class="{{classes.user-list-template__body}}">
           {{#each users}}
           <div name='list-item' class="{{../classes.user-list-template__item}}">
           {{getValueFromObject this 'first_name'}} <span name="delete-button" class="{{../classes.user-list-template__delete-button}}">X</span>
           </div>
           {{/each}}
          </div>
          <div>
          {{#if hasMore}}
          {{{Button capture='Загрузить еще...' onClick=loadMore}}}
          {{/if}}</div>
      </div>
  </div>`;
   }
}
