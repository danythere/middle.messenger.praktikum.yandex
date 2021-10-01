import Block from './Block';
import compile from '../../utils/helpers';
import classes from './Popup/popup.css';
import { DefaultPropsType } from '../types';
import popup from './Popup/popup.hbs';

/**
 * Базовый компонент попап окна
 */
export default class Popup extends Block {
   constructor(props: DefaultPropsType) {
      super('div', props);
   }

   open(): void {
      this._open();
   }

   close(): void {
      this._close();
   }

   private _open(): void {
      this.setProps({ mode: 'visible' });
   }

   private _close(): void {
      this.setProps({ mode: 'hide' });
   }

   render(): DocumentFragment {
      const fragment = compile(popup, {
         classes,
         title: this.props.title,
         width: this.props.width,
         height: this.props.height,
         mode: this.props.mode || 'hide',
         components: this.props.components,
      });
      fragment.content
         .querySelector('#close-button')
         ?.addEventListener('click', () => {
            this._close();
         });
      return fragment.content;
   }
}
