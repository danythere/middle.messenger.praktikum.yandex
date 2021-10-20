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

export interface IMessage {
   chat_id: number;
   content: string;
   file: File;
   id: number;
   is_read: boolean;
   time: string;
   type: string;
}
