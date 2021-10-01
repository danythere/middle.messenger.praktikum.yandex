import Fetch from '../utils/Fetch';

/**
 * Контроллер.
 */
export default class Controller {
   protected static _instance: Controller = new Controller();

   protected _fetch: Fetch = new Fetch();

   constructor() {
      if (Controller._instance) {
         return Controller._instance;
      }
      this.searchUsers = this.searchUsers.bind(this);
   }

   public auth(data: JSON): Promise<XMLHttpRequest> {
      return this._fetch.post('https://ya-praktikum.tech/api/v2/auth/signin', {
         data,
         headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
         },
      });
   }

   public registrate(data: JSON): Promise<XMLHttpRequest> {
      return this._fetch.post('https://ya-praktikum.tech/api/v2/auth/signup', {
         data,
         headers: { 'Content-Type': 'application/json' },
      });
   }

   public logout(): Promise<XMLHttpRequest> {
      return this._fetch.post('https://ya-praktikum.tech/api/v2/auth/logout');
   }

   public sendMessage(): void {
      // do smth
   }

   public loadMessages(): void {
      // do smth
   }

   public loadDialog(): void {
      // do smth
   }

   public getCurrentUser(): Promise<XMLHttpRequest> {
      return this._fetch.get('https://ya-praktikum.tech/api/v2/auth/user');
   }

   public changeProfile(data: JSON): Promise<XMLHttpRequest> {
      return this._fetch.put('https://ya-praktikum.tech/api/v2/user/profile', {
         data,
         headers: { 'Content-Type': 'application/json' },
      });
   }

   public changePassword(data: JSON): Promise<XMLHttpRequest> {
      return this._fetch.put('https://ya-praktikum.tech/api/v2/user/password', {
         data,
         headers: { 'Content-Type': 'application/json' },
      });
   }

   public getChats(): Promise<XMLHttpRequest> {
      return new Promise((resolve, reject) => {
         this._fetch.get('https://ya-praktikum.tech/api/v2/chats').then(res => {
            resolve(res.response);
         });
      });
   }

   public createChat(data: JSON): Promise<XMLHttpRequest> {
      return this._fetch.post('https://ya-praktikum.tech/api/v2/chats', {
         data,
         headers: { 'Content-Type': 'application/json' },
      });
   }

   public searchUsers(data: JSON): Promise<XMLHttpRequest> {
      return new Promise((resolve, reject) => {
         this._fetch
            .post('https://ya-praktikum.tech/api/v2/user/search', {
               headers: { 'Content-Type': 'application/json' },
               data,
            })
            .then(res => {
               resolve(res.response);
            });
      });
   }

   public addUserInChat(data: JSON): Promise<XMLHttpRequest> {
      return new Promise((resolve, reject) => {
         this._fetch.put('https://ya-praktikum.tech/api/v2/chats/users', {
            headers: { 'Content-Type': 'application/json' },
            data,
         });
      });
   }

   public changeAvatar(): void {}
}
