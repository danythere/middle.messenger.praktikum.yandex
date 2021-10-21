import Block from '../../../components/base/Block';
import classes from './MessageFeed/messageFeed.css';
import { DefaultPropsType } from '../../../components/types';
import Controller from '../../../api/Controller';
import { store } from '../../../store';
import { IUser } from '../../../interfaces/user';

/**
 * Лента сообщений в диалоге.
 */
export default class MessageFeed extends Block {
   private _isUnloadingMessages: boolean;

   private _loadsNumber = 0;

   private _hasMore = true;

   private _previousScrollHeight: number;

   private _needScrollBottom: boolean;

   private _previousScroll: number;

   constructor(props: DefaultPropsType) {
      super('div', { ...props });
   }

   getStateFromProps(): void {
      const state = store.getState() as {
         user: {
            profile: IUser;
         };
      };
      this.state = {
         classes,
         messages: [],
         currentUser: state.user?.profile?.id,
      };
   }

   componentBeforeMount(): void {
      new Controller().getChatSocket().then(socket => {
         if (socket) {
            // eslint-disable-next-line no-param-reassign
            socket.onmessage = event => {
               const data = JSON.parse(event.data);
               if (data?.type === 'pong' || data?.type === 'user connected') {
                  return;
               }
               this._isUnloadingMessages = false;
               if (data.length === 0) {
                  this._hasMore = false;
                  return;
               }
               if (
                  this._loadsNumber === 1 &&
                  this.state.messages.length &&
                  Array.isArray(data)
               ) {
                  return;
               }
               this._setMessages(data);
            };
            if (this._loadsNumber === 0) {
               new Controller().getMessages(0);
               setInterval(() => {
                  new Controller().pingChat();
               }, 10000);
               this._loadsNumber += 1;
            }
         }
      });
   }

   protected _setMessages(messages: unknown[] | unknown): void {
      if (Array.isArray(messages)) {
         this.state.messages = [...this.state.messages, ...messages];
      } else {
         this._needScrollBottom = true;
         this.state.messages = [messages, ...this.state.messages];
      }
   }

   componentAfterRender(): void {
      const content = this.getContent();
      if (content) {
         if (this._loadsNumber === 1 || this._needScrollBottom) {
            content.scrollTop = content.scrollHeight;
         } else {
            content.scrollTop =
               content.scrollHeight - this._previousScrollHeight;
         }
         this.getContent()?.addEventListener(
            'scroll',
            this._checkPosition.bind(this),
         );
      }
   }

   protected _unloadMessages(): void {
      this._loadsNumber += 1;
      this._needScrollBottom = false;
      new Controller().getMessages(this.state.messages.length);
   }

   protected _checkPosition(): void {
      const content = this.getContent();
      if (
         content &&
         this._hasMore &&
         !this._isUnloadingMessages &&
         content.scrollTop < 300
      ) {
         this._needScrollBottom = false;
         this._isUnloadingMessages = true;
         this._previousScroll = content?.scrollTop;
         this._previousScrollHeight = content?.scrollHeight;
         this._unloadMessages();
      }
   }

   render(): string {
      return `<div class="{{classes.message-feed}}">
      {{#each (reverse messages)}}
      {{#if (equalPrimitive this.user_id ../currentUser)}}
      <div class="{{../classes.dialog-screen__message-wrapper_my}} {{../classes.dialog-screen__message-wrapper}}">
          <div class="{{../classes.dialog-screen__message}}">
              {{{this.content}}}
          </div>
      </div>
      {{else}}
      <div class="{{../classes.dialog-screen__message-wrapper}}">
          <div class="{{../classes.dialog-screen__message}}">
              {{{this.content}}}
          </div>
      </div>
      {{/if}}
      {{/each}}
  </div>`;
   }

   static regName = 'MessageFeed';
}
