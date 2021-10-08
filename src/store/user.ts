import { Action } from '../utils/store';
import { IUser } from '../interfaces/user';

const SET_USER = 'user/SET';
const DELETE_USER = 'user/DELETE';

export const setUser = (user: IUser): { type: string; payload: unknown } => ({
   type: SET_USER,
   payload: user,
});

export const deleteUser = (): { type: string } => ({
   type: DELETE_USER,
});

export default (state = { profile: null }, action: Action): unknown => {
   switch (action.type) {
      case SET_USER:
         return { profile: action.payload };
      case DELETE_USER:
         return { profile: null };
      default:
         return state;
   }
};
