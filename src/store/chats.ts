import { Action } from '../utils/Store';
import { IChat } from '../interfaces/chat';

const SET_CURRENT_CHAT = 'chat/SET_CURRENT';

export const setCurrentChat = (
   chat: IChat,
): { type: string; payload: unknown } => ({
   type: SET_CURRENT_CHAT,
   payload: chat,
});

export default (state = { currentChat: {} }, action: Action): unknown => {
   switch (action.type) {
      case SET_CURRENT_CHAT:
         return { currentChat: action.payload };
      default:
         return state;
   }
};
