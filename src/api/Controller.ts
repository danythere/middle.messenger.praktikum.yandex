import { IChat } from 'interfaces/chat';
import { IUser } from 'interfaces/user';
import Fetch from '../utils/Fetch';

const API_LINK = 'https://ya-praktikum.tech/api/v2';
/**
 * Контроллер.
 */
export default class Controller {
   protected static _instance: Controller = new Controller();

   protected _chatSocket: WebSocket;

   protected _chatSocketOpened: boolean;

   protected _fetch: Fetch = new Fetch();

   constructor() {
      if (Controller._instance) {
         return Controller._instance;
      }
      this.searchUsers = this.searchUsers.bind(this);
   }

   public auth(data: string): Promise<XMLHttpRequest> {
      return this._fetch.post(`${API_LINK}/auth/signin`, {
         data,
         headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
         },
      });
   }

   public async registrate(data: string): Promise<boolean> {
      await this._fetch.post(`${API_LINK}/auth/signup`, {
         data,
      });
      return true;
   }

   public async logout(): Promise<boolean> {
      await this._fetch.post(`${API_LINK}/auth/logout`);
      return true;
   }

   public async getCurrentUser(): Promise<IUser> {
      const res = await this._fetch.get(`${API_LINK}/auth/user`);
      return JSON.parse(res.response);
   }

   public async changeProfile(data: string): Promise<IUser> {
      const res = await this._fetch.put(`${API_LINK}/user/profile`, {
         data,
      });
      return JSON.parse(res.response);
   }

   public changePassword(data: string): Promise<XMLHttpRequest> {
      return this._fetch.put(`${API_LINK}/user/password`, {
         data,
      });
   }

   public async getChats(
      data: {
         offset?: number;
         limit?: number;
         title?: string;
      } = {},
   ): Promise<IChat[]> {
      const res = await this._fetch.get(`${API_LINK}/chats`, {
         data,
      });
      return JSON.parse(res.response);
   }

   public createChat(data: string): Promise<XMLHttpRequest> {
      return this._fetch.post(`${API_LINK}/chats`, {
         data,
      });
   }

   public async searchUsers(data: string): Promise<IUser[]> {
      const res = await this._fetch.post(`${API_LINK}/user/search`, {
         data,
      });
      return JSON.parse(res.response);
   }

   public async getToken(id: number): Promise<{ token: string }> {
      const res = await this._fetch.post(`${API_LINK}/chats/token/${id}`);
      return JSON.parse(res.response);
   }

   public async addUserInChat(data: string): Promise<boolean> {
      await this._fetch.put(`${API_LINK}/chats/users`, {
         data,
      });
      return true;
   }

   public async changeAvatar(form: FormData): Promise<IUser> {
      const res = await this._fetch.put(`${API_LINK}/user/profile/avatar`, {
         data: form,
         headers: {
            Accept: 'application/json',
         },
      });
      return JSON.parse(res.response);
   }

   public setChatSocket(
      userId: number,
      chatId: number,
      token: string,
   ): WebSocket {
      this._chatSocket = new WebSocket(
         `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`,
      );
      this._chatSocketOpened = false;
      this._chatSocket.addEventListener('open', () => {
         this._chatSocketOpened = true;
      });
      return this._chatSocket;
   }

   public getChatSocket(): Promise<WebSocket | null> {
      return new Promise(resolve => {
         if (this._chatSocketOpened) {
            resolve(this._chatSocket);
         } else if (this._chatSocket) {
            this._chatSocket.addEventListener('open', () => {
               resolve(this._chatSocket);
            });
         } else {
            resolve(null);
         }
      });
   }

   sendMessage(message: string): void {
      this.getChatSocket().then(socket => {
         socket?.send(
            JSON.stringify({
               content: message,
               type: 'message',
            }),
         );
      });
   }

   pingChat(): void {
      this.getChatSocket().then(socket => {
         socket?.send(JSON.stringify({ type: 'ping' }));
      });
   }

   async getChatUsers(
      chatId: number,
      data: {
         offset?: number;
         limit?: number;
         title?: string;
      } = {},
   ): Promise<IUser[]> {
      const res = await this._fetch.get(`${API_LINK}/chats/${chatId}/users`, {
         data,
      });
      return JSON.parse(res.response);
   }

   async deleteChatUser(data: string): Promise<boolean> {
      const res = await this._fetch.delete(`${API_LINK}/chats/users`, {
         data,
         headers: {
            'content-type': 'application/json',
         },
      });
      return true;
   }

   getMessages(current: number): void {
      this.getChatSocket().then(socket => {
         socket?.send(
            JSON.stringify({
               content: `${current}`,
               type: 'get old',
            }),
         );
      });
   }
}
