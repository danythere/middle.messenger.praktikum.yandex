import Block from '../mvc/Block';
import classes from './Button/button.css';
import button from './Button/button.hbs';
import compile from '../../utils/helpers';

/**
 * Базовый компонент кнопки.
 */
export default class Button extends Block {
   constructor(props: { [props: string]: unknown }) {
      // Создаём враппер дом-элемент button
      super('div', props);
   }

   render(): DocumentFragment {
      const fragment = compile(button, {
         classes,
         background: this.props.background,
         capture: this.props.capture,
         icon: this.props.icon,
         style: this.props.style || 'default',
         size: this.props.size || 's',
      });
      if (this.props.eventHandlers?.onClick) {
         fragment.content
            .querySelector('button')
            ?.addEventListener('click', this.props.eventHandlers.onClick);
      }
      return fragment.content;
   }
}
