import Block from './Block';
import compile from '../../utils/helpers';
import classes from './Input/input.css';
import input from './Input/input.hbs';
import { DefaultPropsType } from '../types';

/**
 * Базовый компонент поля ввода.
 */
export default class Input extends Block {
   private _value: string;

   constructor(props: DefaultPropsType) {
      super('div', props);
      this._value = (props.value as string) || '';
   }

   getValue(): string {
      return this._value;
   }

   validate(): string | null {
      if (this.props.validFunc) {
         const validRes = this.props.validFunc(this._value);
         const content = this.getContent();
         if (content) {
            const errorIcon = content.querySelector('[name="error-icon"]');
            const inputEl = content.querySelector('input');

            if (validRes) {
               if (inputEl) {
                  inputEl.classList.add(classes.input_style_invalid);
               }
               if (errorIcon) {
                  errorIcon.classList.remove(
                     classes['input__invalid-mark_hide'],
                  );
                  errorIcon?.setAttribute('title', validRes);
               }
            } else {
               if (inputEl) {
                  inputEl.classList.remove(classes.input_style_invalid);
               }
               if (errorIcon) {
                  errorIcon.classList.add(classes['input__invalid-mark_hide']);
               }
            }
         }
         return validRes;
      }
      return null;
   }

   render(): DocumentFragment {
      const fragment = compile(input, {
         classes,
         value: this._value,
         type: this.props.type,
         name: this.props.name,
         width: this.props.width,
         height: this.props.height,
         background: this.props.background || 'transparent',
         style: this.props.style || 'default',
         placeholder: this.props.placeholder,
         invalidText: this.props.invalidText,
      });
      const inputElement = fragment.content.querySelector('input');
      const errorIcon = fragment.content.querySelector('[name="error-icon"]');
      inputElement?.addEventListener('change', (event: InputEvent) => {
         this._value = (<HTMLInputElement>event.target).value;
      });
      if (this.props.validFunc) {
         inputElement?.addEventListener('blur', () => {
            const validRes = this.props.validFunc(this.getValue());
            if (validRes) {
               inputElement.classList.add(classes.input_style_invalid);
               if (errorIcon) {
                  errorIcon.classList.remove(
                     classes['input__invalid-mark_hide'],
                  );
                  errorIcon?.setAttribute('title', validRes);
               }
            } else {
               inputElement.classList.remove(classes.input_style_invalid);
               if (errorIcon) {
                  errorIcon.classList.add(classes['input__invalid-mark_hide']);
               }
            }
         });
      }

      return fragment.content;
   }
}
