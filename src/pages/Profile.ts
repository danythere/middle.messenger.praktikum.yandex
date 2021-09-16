import Block from '../components/mvc/Block';
import profile from './Profile/profile.hbs';
import compile from '../utils/helpers';
import { getConfig } from './Profile/config';
import Router from '../utils/Router';
import Avatar from '../components/base/Avatar';
import Input from '../components/base/Input';
import Heading from '../components/base/Heading';
import Button from '../components/base/Button';

/**
 * Страница авторизации.
 */
export default class Profile extends Block {
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
         avatars: {
            [prop: string]: {
               config: unknown;
               inst: Avatar;
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
               config: unknown;
               inst: Input;
               template: (() => string) | null;
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
      const config = getConfig({
         onClick: this._submit.bind(this),
      });
      this._config = config;
      const fragment = compile(profile, config);
      const backButton = fragment?.content.querySelector('#back');
      backButton?.addEventListener('click', () => {
         import('./Chat').then(Page => {
            const Chat = Page.default;
            Router.getInstance().changePage(new Chat({}));
         });
      });
      return fragment.content;
   }
}
