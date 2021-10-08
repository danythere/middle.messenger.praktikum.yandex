import Block from '../../../components/base/Block';
import classes from './DialogList/dialogList.css';
import { DefaultPropsType } from '../../../components/types';
import Controller from '../../../api/Controller';
import { connect, store } from '../../../store';
import { setCurrentChat } from '../../../store/chats';
import { registerComponent } from '../../../helpers';
import Router from '../../../utils/Router';
import { IUser } from '../../../interfaces/user';
import CreateChatTemplate from './DialogList/CreateChatTemplate/CreateChatTemplate';
import { IChat } from '../../../interfaces/chat';

const RES_LINK = 'https://ya-praktikum.tech/api/v2/resources';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const component = require('./DialogList/CreateChatTemplate/CreateChatTemplate.ts');

registerComponent(component.default);
/**
 * Лента диалогов.
 */
class DialogList extends Block {
   constructor(props: DefaultPropsType) {
      super('div', { ...props });
   }

   getStateFromProps(): void {
      const state = store.getState() as {
         user: {
            profile: IUser;
         };
      };
      const avatar = state?.user?.profile?.avatar;
      this.state = {
         classes,
         currentChat: {},
         exitHandler: this._exitHandler.bind(this),
         openCreateChat: this._openCreateChatPopup.bind(this),
         onChooseHandler: this._chooseDialog.bind(this),
         addChatHandler: this._addChatHandler.bind(this),
         openProfile: this._openProfile.bind(this),
         avatar: avatar ? `${RES_LINK}${avatar}` : null,
         hasMore: true,
         chats: [],
         loadMore: this._loadMore.bind(this),
      };
   }

   protected _loadMore(): void {
      this._loadChatList(undefined, this.state.chats.length, true);
   }

   protected componentDidUpdate(oldProps: any, newProps: any): boolean {
      if (newProps.avatar && newProps.avatar !== this.state.avatar) {
         this.state.avatar = newProps.avatar;
         return true;
      }
      if (newProps?.currentChat?.id !== oldProps?.currentChat?.id) {
         this.state.currentChat = newProps.currentChat;
         return true;
      }
      return true;
   }

   protected _openProfile(): void {
      new Router('#root').go('/settings');
   }

   protected _addChatHandler(): void {
      const child = this.getChild('createChatPopup') as CreateChatTemplate;
      child?.close();
      this._loadChatList(this.state.chats.length + 1);
   }

   protected _exitHandler(): void {
      new Controller().logout().then(() => {
         new Router('#root').go('/');
      });
   }

   protected _chooseDialog(chat: IChat): void {
      store.dispatch(setCurrentChat(chat));
      this.state.currentChat = chat;
   }

   protected _loadChatList(limit = 10, offset = 0, loadMore = false): void {
      new Controller().getChats({ limit, offset }).then(chats => {
         const newChats = JSON.parse(chats);
         if (newChats.length < 10) {
            this.state.hasMore = false;
            if (newChats.length === 0) {
               return;
            }
         }
         if (loadMore) {
            this.state.chats = [...this.state.chats, ...newChats];
            return;
         }
         this.state.chats = newChats;
      });
   }

   componentBeforeMount(): void {
      this._loadChatList();
   }

   _openCreateChatPopup(): void {
      const child = this.getChild('createChatPopup') as CreateChatTemplate;
      child?.open({
         width: 300,
         height: 100,
         title: 'Создать чат',
         onCreateHandler: this._addChatHandler.bind(this),
      });
   }

   render(): string {
      return `<div class="{{classes.dialog-list}}">
      <div class="{{classes.dialog-list__header}}">
          <div class="{{classes.dialog-list__first-line}}">
              <div class="{{classes.my-profile}}">
                  {{{Avatar link=avatar}}}
                  <div class="{{classes.my-profile__button}}">
                      {{{Button background='primary' capture='Мой профиль' onClick=openProfile}}}
                  </div>
              </div>
              {{{Button capture='Создать чат' onClick=openCreateChat}}}
              {{{Button capture='Выход' onClick=exitHandler}}}
              {{{CreateChatTemplate name='createChatPopup' onCreate=addChatHandler }}}
          </div>
          <div class="{{classes.dialog-list__search}}">
              {{{Input type='text'
              placeholder='Поиск...'
              name='search'
              background='gray'
              width=300
              height=30
              style='rounded'}}}
          </div>
      </div>
      <div class="{{classes.dialog-list__body}}">
          {{#each chats}}
          {{#if (equalPrimitive (getValueFromObject this 'id') ../currentChat.id)}}
          <div class="{{../classes.dialog-list__message-preview}}">
              {{{DialogPreview style='active' data=this onChoose=../onChooseHandler}}}
          </div>
          {{else}}
          <div class="{{../classes.dialog-list__message-preview}}">
              {{{DialogPreview data=this onChoose=../onChooseHandler}}}
          </div>
          {{/if}}
          {{/each}}
      </div>
      <div>
          {{#if hasMore}}
          {{{Button capture='Загрузить еще...' onClick=loadMore}}}
          {{/if}}
      </div>
  </div>`;
   }
}

const DialogListWithStore = connect(
   (state: any) => ({
      avatar: state?.user?.profile?.avatar
         ? `${RES_LINK}${state.user.profile.avatar}`
         : null,
   }),
   DialogList,
);
export default DialogListWithStore;

registerComponent(DialogListWithStore, 'DialogList');
