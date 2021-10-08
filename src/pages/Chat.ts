/* eslint-disable global-require */
import Block from '../components/base/Block';
import classes from './Chat/chat.css';
import { DefaultPropsType } from '../components/types';
import { registerComponent } from '../helpers';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const components = require('./Chat/blocks/*.ts') as {
   [key: string]: { default: typeof Block };
};

Object.values(components).forEach(component => {
   if (component.default.name !== 'WithStore') {
      registerComponent(component.default);
   }
});
/**
 * Страница с чатами.
 */
export default class Chat extends Block {
   constructor(props: DefaultPropsType) {
      super('div', { ...props });
   }

   getStateFromProps(): void {
      this.state = {
         classes,
      };
   }

   render(): DocumentFragment {
      return `<div class="{{classes.chat}}">
     {{{DialogList}}}
      {{{DialogScreen}}}
   </div>`;
   }
}
