import Block from './Block';
import { DefaultPropsType } from '../types';
import emptyAvatar from '../../assets/empty_avatar.jpg';
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
         emptyAvatar,
      };
   }

   render(): string {
      return `<div name="avatar">
      {{#if link}}
      <img src="{{link}}" class="{{classes.avatar}} {{getClass 'avatar_size_' size classes}}" />
      {{else}}
      <img src="{{emptyAvatar}}" class="{{classes.avatar}} {{getClass 'avatar_size_' size classes}}" />
      {{/if}}

   </div>`;
   }

   static regName = 'Avatar';
}
