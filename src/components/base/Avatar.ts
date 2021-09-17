import Block from './Block';
import compile from '../../utils/helpers';
import avatar from './Avatar/avatar.hbs';
import { DefaultPropsType } from '../types';
import classes from './Avatar/avatar.css';

/**
 * Базовый компонент отображения аватара.
 */
export default class Avatar extends Block {
   constructor(props: DefaultPropsType) {
      super('div', props);
   }

   render(): DocumentFragment {
      const fragment = compile(avatar, {
         classes,
         size: this.props.size,
         link: this.props.link,
      });
      return fragment.content;
   }
}
