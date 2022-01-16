/* eslint-disable global-require */
import Block from '../components/base/Block';
import classes from './Chat/chat.css';
import { DefaultPropsType } from '../components/types';
import { registerComponent } from '../helpers';

const components = require.context('./Chat/blocks/', false, /\.ts$/);

components.keys().forEach(item => {
   const component = components(item);
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

   render(): string {
      return `<div class="{{classes.chat}}">
                  {{{DialogList}}}
                  {{{DialogScreen}}}
      </div>`;
   }
}
