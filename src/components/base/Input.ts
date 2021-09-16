import Block from '../mvc/Block';
import compile from '../../utils/helpers';
import classes from './Input/input.css';
import input from './input/input.hbs';

/**
 * Базовый компонент поля ввода.
 */
export default class Input extends Block {
   private _value: string;

   private _initialStyle = 'default';

   constructor(props: { [props: string]: unknown }) {
      // Создаём враппер дом-элемент button
      super('div', props);
      this._value = (props.value as string) || '';
      this._initialStyle = (props.style as string) || 'default';
   }

   getValue(): string {
      return this._value;
   }

   validate(): string | null {
      if (this.props.validFunc) {
         const validRes = this.props.validFunc(this._value);
         if (validRes) {
            this.setProps({
               invalid: true,
               invalidIconVisible: true,
               invalidText: validRes,
            });
         } else {
            this.setProps({
               invalid: false,
               style: this._initialStyle,
               invalidIconVisible: false,
            });
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
         invalidIconVisible: this.props.invalidIconVisible,
         invalidText: this.props.invalidText,
         invalid: this.props.invalid,
      });
      const inputElement = fragment.content.querySelector('input');
      inputElement?.addEventListener('change', (event: InputEvent) => {
         this._value = (<HTMLInputElement>event.target).value;
      });
      if (this.props.validFunc) {
         inputElement?.addEventListener('blur', () => {
            const validRes = this.props.validFunc(this.getValue());
            if (validRes) {
               this.setProps({
                  invalid: true,
                  invalidIconVisible: true,
                  invalidText: validRes,
               });
            } else {
               this.setProps({
                  invalid: false,
                  style: this._initialStyle,
                  invalidIconVisible: false,
               });
            }
         });
      }

      return fragment.content;
   }
}
