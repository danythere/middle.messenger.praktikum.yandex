import Block from './Block';
import classes from './Button/button.css';
import { DefaultPropsType } from '../types';

/**
 * Базовый компонент кнопки.
 */
export default class Button extends Block {
   constructor(props: DefaultPropsType) {
      super('div', props);
   }

   getStateFromProps(): void {
      this.state = {
         classes,
         capture: '',
         background: '',
         icon: null,
         style: 'default',
         size: 's',
      };
   }

   componentAfterRender(): void {
      if (this.props.onClick) {
         this.getContent()?.addEventListener('click', this.props.onClick);
      }
   }

   render(): string {
      return `<button type='button' class="{{classes.button}}
      {{getClass 'button_color_' background classes}} {{getClass 'button_style_' style classes}}
   {{getClass 'button_size_' size classes}}">
   {{#if icon}}
   <img src="{{icon}}" class="{{classes.button__icon}}" />
   {{else}}
   {{capture}}
   {{/if}}
</button>`;
   }
}
