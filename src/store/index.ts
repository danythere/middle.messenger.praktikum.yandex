import chats from './chats';
import user from './user';
import { Store } from '../utils/Store';
import Block from '../components/base/Block';
import { DefaultPropsType } from '../components/types';
import { ClassType } from '../components/interfaces';

export const store = new Store({
   chats,
   user,
});


// КАК ЭТО ТИПИЗИРОВАТЬ? :((( Возвращаемый тип функции connect...
export function connect(
   stateToProps: (state: any) => any,
   Component: typeof Block,
): ClassType<WithStore> {
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
