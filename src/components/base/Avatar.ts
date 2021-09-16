import Block from '../mvc/Block';
import compile from '../../utils/helpers';
import avatar from './Avatar/avatar.hbs';
import classes from './Avatar/avatar.css';

/**
 * Базовый компонент отображения аватара.
 */
export default class Avatar extends Block {
   constructor(props: { [props: string]: unknown }) {
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
