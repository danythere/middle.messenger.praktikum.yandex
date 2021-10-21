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

   public registrate(data: string): Promise<boolean> {
      return new Promise(resolve => {
         this._fetch
            .post(`${API_LINK}/auth/signup`, {
               data,
               headers: { 'Content-Type': 'application/json' },
            })
            .then(() => {
               resolve(true);
            });
      });
   }

   public logout(): Promise<boolean> {
      return new Promise(resolve => {
         this._fetch.post(`${API_LINK}/auth/logout`).then(() => {
            resolve(true);
         });
      });
   }

   public getCurrentUser(): Promise<string> {
      return new Promise(resolve => {
         this._fetch.get(`${API_LINK}/auth/user`).then(res => {
            resolve(res.response);
         });
      });
   }

   public changeProfile(data: string): Promise<string> {
      return new Promise(resolve => {
         this._fetch
            .put(`${API_LINK}/user/profile`, {
               data,
               headers: { 'Content-Type': 'application/json' },
            })
            .then(res => {
               resolve(res.response);
            });
      });
   }

   public changePassword(data: string): Promise<XMLHttpRequest> {
      return this._fetch.put(`${API_LINK}/user/password`, {
         data,
         headers: { 'Content-Type': 'application/json' },
      });
   }

   public getChats(
      data: {
         offset?: number;
         limit?: number;
         title?: string;
      } = {},
   ): Promise<string> {
      return new Promise(resolve => {
         this._fetch
            .get(`${API_LINK}/chats`, {
               data,
            })
            .then(res => {
               resolve(res.response);
            });
      });
   }

   public createChat(data: string): Promise<XMLHttpRequest> {
      return this._fetch.post(`${API_LINK}/chats`, {
         data,
         headers: { 'Content-Type': 'application/json' },
      });
   }

   public searchUsers(data: JSON): Promise<string> {
      return new Promise(resolve => {
         this._fetch
            .post(`${API_LINK}/user/search`, {
               headers: { 'Content-Type': 'application/json' },
               data,
            })
            .then(res => {
               resolve(res.response);
            });
      });
   }

   public getToken(id: number): Promise<string> {
      return new Promise(resolve => {
         this._fetch.post(`${API_LINK}/chats/token/${id}`).then(data => {
            resolve(data.response);
         });
      });
   }

   public addUserInChat(data: string): Promise<boolean> {
      return new Promise(resolve => {
         this._fetch
            .put(`${API_LINK}/chats/users`, {
               headers: { 'Content-Type': 'application/json' },
               data,
            })
            .then(() => {
               resolve(true);
            });
      });
   }

   public changeAvatar(form: FormData): Promise<string> {
      return new Promise(resolve => {
         this._fetch
            .put(`${API_LINK}/user/profile/avatar`, {
               data: form,
               headers: {
                  Accept: 'application/json',
               },
            })
            .then(res => {
               resolve(res.response);
            });
      });
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

   getChatUsers(
      chatId: number,
      data: {
         offset?: number;
         limit?: number;
         title?: string;
      } = {},
   ): Promise<string> {
      return new Promise(resolve => {
         this._fetch
            .get(`${API_LINK}/chats/${chatId}/users`, {
               data,
            })
            .then(res => {
               resolve(res.response);
            });
      });
   }

   deleteChatUser(data: JSON): Promise<boolean> {
      return new Promise(resolve => {
         this._fetch
            .delete(`${API_LINK}/chats/users`, {
               data,
               headers: {
                  'content-type': 'application/json',
               },
            })
            .then(() => {
               resolve(true);
            });
      });
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
