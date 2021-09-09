import Block from '../components/mvc/Block';
import registration from './Registration/registration.hbs';
import compile from '../components/utils/helpers';
import { config } from './Registration/config';

export default class Registration extends Block {
   constructor(props) {
      super('div', { ...props, rootStyle: 'height:100%' });
   }

   render(): DocumentFragment {
      const fragment = compile(registration, config);

      return fragment.content;
   }
}