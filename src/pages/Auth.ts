import Block from '../components/mvc/Block';
import auth from './Auth/auth.hbs';
import compile from '../components/utils/helpers';
import { config } from './Auth/config';

export default class Auth extends Block {
   constructor(props) {
      super('div', { ...props, rootStyle: 'height:100%' });
   }

   render(): DocumentFragment {
      const fragment = compile(auth, config);

      return fragment.content;
   }
}
