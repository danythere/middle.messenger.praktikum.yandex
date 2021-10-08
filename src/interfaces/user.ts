export interface IUser {
   id: number;
   login: string;
   first_name: string;
   second_name: string;
   email: string;
   phone: string;
   display_name: string | null;
   avatar: string | null;
   status: number | null;
}
