import Block from './Block';
import { DefaultPropsType } from '../types';
import classes from './Avatar/avatar.css';

/**
 * Базовый компонент отображения аватара.
 */
export default class Avatar extends Block {
   constructor(props: DefaultPropsType) {
      super('div', props);
   }

   getStateFromProps(): void {
      this.state = {
         classes,
         size: 's',
      };
   }

   render(): string {
      return `<div name="avatar">
      {{#if link}}
      <img src="{{link}}" class="{{classes.avatar}} {{getClass 'avatar_size_' size classes}}" />
      {{else}}
      <div class="{{classes.avatar}} {{classes.avatar_empty}} {{getClass 'avatar_size_' size classes}}"> </div>
      {{/if}}

   </div>`;
   }

   static regName = 'Avatar';
}
