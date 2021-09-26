import Block from '../components/base/Block';
import auth from './Auth/auth.hbs';
import compile from '../utils/helpers';
import { getConfig } from './Auth/config';
import Input from '../components/base/Input';
import Button from '../components/base/Button';
import Heading from '../components/base/Heading';
import { ClassesType } from './types';
import { switchPage, Names } from './pageSwitcher';
import { DefaultPropsType } from '../components/types';

/**
 * Страница авторизации.
 */
export default class Auth extends Block {
   private _config: {
      classes: ClassesType;
      components: {
         headings: {
            [prop: string]: {
               config: unknown;
               inst: Heading;
               template: (() => string) | null;
            };
         };
         inputs: {
            [prop: string]: {
               config: unknown;
               inst: Input;
               template: (() => string) | null;
            };
         };
         buttons: {
            [prop: string]: {
               config: unknown;
               inst: Button;
               template: (() => string) | null;
            };
         };
      };
   };

   constructor(props: DefaultPropsType) {
      super('div', { ...props });
   }

   protected _submit(): void {
      let successValid = true;
      Object.entries(this._config.components.inputs).forEach(
         ([, input]: [
            string,
            {
               config: { [prop: string]: unknown };
               inst: Input;
               template: () => string;
            },
         ]) => {
            const validRes = input.inst.validate();
            if (validRes) {
               successValid = false;
            }
         },
      );
      if (successValid) {
         const content = this.getContent();
         if (content) {
            const form = content.querySelector('form');
            const formData = new FormData(form || undefined);
            console.log(formData);
            switchPage(Names.Chat);
         }
      }
   }

   render(): DocumentFragment {
      const config = getConfig({ onClick: this._submit.bind(this) });
      const fragment = compile(auth, config);
      this._config = config;
      return fragment.content;
   }
}
