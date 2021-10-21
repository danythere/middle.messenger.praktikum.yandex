import Block from './Block';
import classes from './Input/input.css';

export interface IInputProps {
   value: string;
   type: string;
   placeholder: string;
   name: string;
   width: number;
   height: number;
   capture: string;
   validFunc: () => string | null;
}

interface IInputState {
   value: string;
   classes: { [key: string]: string };
   style: string;
   background: string;
}
/**
 * Базовый компонент поля ввода.
 */
export default class Input extends Block {
   private _value: string;

   state: IInputState;

   constructor(props: IInputProps) {
      super('div', props);
      this._value = (props.value as string) || '';
   }

   getStateFromProps(props: IInputProps): void {
      this.state = {
         classes,
         style: 'default',
         background: 'transparent',
         value: props.value,
      };
   }

   setValue(value: string): void {
      this.state.value = value;
      this._value = value;
   }

   componentAfterRender(): void {
      const content = this.getContent();
      if (content) {
         const inputElem = content.querySelector('input');
         inputElem?.addEventListener('input', (event: InputEvent) => {
            this._value = (<HTMLInputElement>event.target).value;
            if (this.props.onChange) {
               this.props.onChange(this._value);
            }
         });

         inputElem?.addEventListener('blur', () => {
            if (this.props.validFunc) {
               const errorIcon = content.querySelector('[name="error-icon"]');
               const validRes = this.props.validFunc(this._value);
               if (validRes) {
                  inputElem.classList.add(classes.input_style_invalid);
                  if (errorIcon) {
                     errorIcon.classList.remove(
                        classes['input__invalid-mark_hide'],
                     );
                     errorIcon?.setAttribute('title', validRes);
                  }
               } else {
                  inputElem.classList.remove(classes.input_style_invalid);
                  if (errorIcon) {
                     errorIcon.classList.add(
                        classes['input__invalid-mark_hide'],
                     );
                  }
               }
            }
         });
      }
   }

   getValue(): string {
      return this._value;
   }

   validate(): string | null {
      if (this.props.validFunc) {
         const validRes = this.props.validFunc(this._value);
         const content = this.getContent();
         if (content) {
            const inputEl = content.querySelector('input');
            const errorIcon = content.querySelector('[name="error-icon"]');
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

   render(): string {
      return `<div><input class="{{classes.input}} {{getClass 'input_style_' style classes}}
      {{getClass 'input_background_' background classes}}"
      type="{{type}}" name="{{name}}" value="{{value}}" placeholder="{{placeholder}}"
      style="width:{{width}}px;height:{{height}}px" />
   <div title="{{invalidText}}" name="error-icon" class="{{classes.input__invalid-mark}} {{classes.input__invalid-mark_hide}}">!</div></div>
   `;
   }

   static regName = 'Input';
}
