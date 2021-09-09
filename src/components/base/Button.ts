import Block from '../mvc/Block';
import classes from './Button/button.css';
import button from './Button/button.hbs';
import compile from '../utils/helpers';

export default class Button extends Block {
   constructor(props: object) {
      // Создаём враппер дом-элемент button
      super('div', props);
   }

   render(): DocumentFragment {
      const fragment = compile(button, {
         classes,
         background: this.props.background,
         capture: this.props.capture,
      });
      if (this.props.eventHandlers?.onClick) {
         fragment.content
            .querySelector('button')
            ?.addEventListener('click', this.props.eventHandlers.onClick);
      }
      return fragment.content;
   }
}
