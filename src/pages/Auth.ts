import Block from '../components/mvc/Block';
import auth from './Auth/auth.hbs';
import compile from '../utils/helpers';
import { getConfig } from './Auth/config';
import Router from '../utils/Router';
import Input from '../components/base/Input';
import Button from '../components/base/Button';
import Heading from '../components/base/Heading';

/**
 * Страница авторизации.
 */
export default class Auth extends Block {
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
            import('./Chat').then(Page => {
               const Chat = Page.default;
               Router.getInstance().changePage(new Chat({}));
            });
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
