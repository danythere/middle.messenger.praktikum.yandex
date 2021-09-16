import Block from '../components/mvc/Block';
import registration from './Registration/registration.hbs';
import compile from '../utils/helpers';
import { getConfig } from './Registration/config';
import Router from '../utils/Router';
import Input from '../components/base/Input';
import Heading from '../components/base/Heading';
import Button from '../components/base/Button';

/**
 * Страница регистрации.
 */
export default class Registration extends Block {
   private _config: {
      classes: { [props: string]: string };
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

   constructor(props: { [props: string]: unknown }) {
      super('div', { ...props });
   }

   protected _submit(): void {
      let successValid = true;
      Object.entries(this._config.components.inputs).forEach(
         ([, input]: [
            string,
            {
               config: { [props: string]: unknown };
               inst: Input;
               template: () => string;
            },
         ]) => {
            const inputInst: Input = input.inst;
            const validRes = inputInst.validate();
            if (validRes) {
               successValid = false;
            }
         },
      );
      if (successValid) {
         const content = this.getContent();
         if (content) {
            const form = content.querySelector('form');
            if (form) {
               const formData = new FormData(form);
               console.log(formData);
               import('./Chat').then(Page => {
                  const Chat = Page.default;
                  Router.getInstance().changePage(new Chat({}));
               });
            }
         }
      }
   }

   render(): DocumentFragment {
      const config = getConfig({ onClick: this._submit.bind(this) });
      this._config = config;
      const fragment = compile(registration, config);
      return fragment.content;
   }
}
