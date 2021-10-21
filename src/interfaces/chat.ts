import { IUser } from './user';

export interface IChat {
   id: number;
   title: string;
   avatar: string;
   created_by: number;
   unread_count: number;
   last_message: {
      user: IUser;
      time: string;
      content: string;
      id: number;
   };
}
