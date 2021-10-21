import chats from './chats';
import user from './user';
import { Store } from '../utils/Store';
import Block from '../components/base/Block';
import { DefaultPropsType } from '../components/types';
import { IChat } from '../interfaces/chat';
import { IUser } from '../interfaces/user';

export interface IStore {
   chats: IChat[];
   user: { profile: IUser };
}
export const store = new Store({
   chats,
   user,
});

export function connect(
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   stateToProps: (state: unknown) => any,
   Component: typeof Block,
): unknown {
   return class WithStore extends Component {
      constructor(props: DefaultPropsType) {
         super({ ...props, ...stateToProps(store.getState()) });
      }

      componentBeforeMount() {
         super.componentBeforeMount();

         store.on('changed', () => {
            this.setProps({
               ...this.props,
               ...stateToProps(store.getState()),
            });
         });
      }
   };
}
