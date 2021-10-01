import Block from '../components/base/Block';
import profile from './Profile/profile.hbs';
import compile from '../utils/helpers';
import { getConfig } from './Profile/config';
import Avatar from '../components/base/Avatar';
import Input from '../components/base/Input';
import Heading from '../components/base/Heading';
import Button from '../components/base/Button';
import { ClassesType } from './types';
import Router from '../utils/Router';
import Controller from '../api/Controller';

/**
 * Страница авторизации.
 */
export default class Profile extends Block {
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
         avatars: {
            [prop: string]: {
               config: unknown;
               inst: Avatar;
               template: (() => string) | null;
            };
         };
         password: {
            [prop: string]: {
               config: unknown;
               inst: Input;
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
            new Controller().changeProfile(
               JSON.stringify(Object.fromEntries(formData)),
            );
            console.log(formData);
            // new Router('#root').go('/messenger');
         }
      }
   }

   protected _changePassword(): void {
      let successValid = true;
      Object.entries(this._config.components.password).forEach(
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
            const form = content.querySelector('#password-form');
            const formData = new FormData(form || undefined);
            new Controller().changePassword(
               JSON.stringify(Object.fromEntries(formData)),
            );
            console.log(formData);
            // new Router('#root').go('/messenger');
         }
      }
   }

   render(): DocumentFragment {
      new Controller().getCurrentUser().then(res => {
         console.log(res);
      });
      const config = getConfig({
         onClick: this._submit.bind(this),
         changePassword: this._changePassword.bind(this),
      });
      this._config = config;
      const fragment = compile(profile, config);
      const backButton = fragment?.content.querySelector('#back');
      backButton?.addEventListener('click', () => {
         new Router('#root').go('/messenger');
      });
      return fragment.content;
   }
}
