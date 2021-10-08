/* eslint-disable @typescript-eslint/no-var-requires */
import Block from '../../../components/base/Block';
import classes from './DialogScreen/dialogScreen.css';
import Controller from '../../../api/Controller';
import { connect, store } from '../../../store';
import { registerComponent } from '../../../helpers';
import { IUser } from '../../../interfaces/user';
import AddUsersTemplate from './DialogScreen/AddUsersTemplate/AddUsersTemplate';
import UserListTemplate from './DialogScreen/UserListTemplate/UserListTemplate';

const addUserTemplate = require('./DialogScreen/AddUsersTemplate/AddUsersTemplate.ts');
const messageFeed = require('./MessageFeed.ts');
const userListTemplate = require('./DialogScreen/UserListTemplate/UserListTemplate.ts');

registerComponent(addUserTemplate.default);
registerComponent(messageFeed.default);
registerComponent(userListTemplate.default);
/**
 * Экран открытого диалога.
 */
class DialogScreen extends Block {
   private _token: string;

   constructor(props: { [props: string]: unknown }) {
      super('div', { ...props });
   }

   getStateFromProps(): void {
      this.state = {
         classes,
         chatUsers: [],
         isLoading: false,
         users: [],
         messages: [],
         openAddUserPopup: this._openAddUserPopup.bind(this),
         openUserListPopup: this._openUserListPopup.bind(this),
      };
   }

   protected _openAddUserPopup(): void {
      const child = this.getChild('addUserPopup') as AddUsersTemplate;
      child?.open({
         width: 300,
         height: 400,
         title: 'Добавить пользователя',
         onChooseHandler: this._chooseHandler.bind(this),
      });
   }

   protected _openUserListPopup(): void {
      const child = this.getChild('userListPopup') as UserListTemplate;
      child?.open({
         width: 300,
         height: 400,
         title: 'Пользователи чата',
      });
   }

   protected _chooseHandler(newUser: IUser): void {
      this.state.users = [...this.state.users, newUser];
   }

   componentDidUpdate(oldProps: any, newProps: any): boolean {
      if (oldProps?.chat?.id !== newProps?.chat?.id) {
         this.state.isLoading = true;
         new Controller().getChatUsers(newProps.chat.id).then(users => {
            this.state.users = JSON.parse(users);
            return true;
         });
         new Controller().getToken(newProps.chat.id).then(res => {
            const { token } = JSON.parse(res);
            this._createSocket(token);
         });
      }
      return true;
   }

   protected _createSocket(token: string): void {
      const state = store.getState() as {
         user: {
            profile: IUser;
         };
      };
      new Controller().setChatSocket(
         state.user.profile.id,
         this.props.chat.id,
         token,
      );
      this.state.isLoading = false;
   }

   render(): string {
      return `<div class="{{classes.dialog-screen}}">
      <div class="{{classes.dialog-screen__content}}">
          {{#if chat.id}}
          <div class="{{classes.dialog-screen__header}}">
              {{{Avatar}}}
              <div class="{{classes.dialog-screen__name}}">
                  {{{Heading title=chat.title}}}
              </div>
              {{{Button capture='Добавить пользователя' background='primary' size='m' onClick=openAddUserPopup}}}
              {{{AddUsersTemplate name='addUserPopup'}}}
              {{{Button capture='Участники' background='secondary' size='m' onClick=openUserListPopup}}}
              {{{UserListTemplate name='userListPopup' chatId=chat.id}}}
              <hr>
          </div>
          {{{MessageFeed users=users name='messageFeed'}}}
          <form>
              <div class="{{classes.dialog-screen__message-input}}">
                  {{{MessageInput name='messageInput'}}}
              </div>
          </form>
          {{else}}
          <div class="{{classes.dialog-screen__empty-view-text}}">
              {{{Heading title="Выберите чат для начала общения!"}}}
          </div>
          {{/if}}
      </div>
  </div>`;
   }
}
const DialogScreenWithStore = connect(
   (state: any) => ({ chat: state.chats.currentChat || null }),
   DialogScreen,
);
export default DialogScreenWithStore;

registerComponent(DialogScreenWithStore, 'DialogScreen');
