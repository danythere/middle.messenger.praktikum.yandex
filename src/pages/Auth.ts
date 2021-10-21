import Block from '../components/base/Block';
import classes from './Auth/auth.css';
import Validator from '../utils/Validator';
import { DefaultPropsType } from '../components/types';
import Router from '../utils/Router';
import Controller from '../api/Controller';
import Input from '../components/base/Input';
import { connect, IStore } from '../store';

/**
 * Страница авторизации.
 */
class Auth extends Block {
   constructor(props: DefaultPropsType) {
      super('div', { ...props });
   }

   getStateFromProps(): void {
      this.state = {
         classes,
         passwordValidFunc: Validator.validatePassword,
         loginValidFunc: Validator.validateLogin,
         createAccountClickHandler: this._createAccount,
         enterClickHandler: this._auth.bind(this),
      };
   }

   protected _createAccount(): void {
      new Router('#root').go('/sign-up');
   }

   componentDidUpdate(_oldProps: any, newProps: any): boolean {
      if (newProps.user && newProps.user.profile.id) {
         new Router('#root').go('/messenger');
      }
      return true;
   }

   protected _auth(): void {
      const loginInput = this.getChild('login') as unknown as Input;
      const passwordInput = this.getChild('password') as unknown as Input;
      if (
         loginInput &&
         passwordInput &&
         !loginInput.validate() &&
         !passwordInput.validate()
      ) {
         const content = this.getContent();
         if (content) {
            const form = content.querySelector('form') as HTMLFormElement;
            const formData = new FormData(form);
            new Controller()
               .auth(
                  JSON.stringify(
                     Object.fromEntries(
                        formData as unknown as Iterable<[string, unknown]>,
                     ),
                  ),
               )
               .then(() => {
                  new Router('#root').go('/messenger');
               });
         }
      }
   }

   render(): string {
      return `<div class="{{classes.auth}}">
      <div class="{{classes.auth-ground}}">
          <div class="{{classes.auth-ground__name}}">
              {{{Heading title='Авторизация'}}}
          </div>
          <form>
              <div class="{{classes.auth-ground__input-form_margin}} {{classes.auth-ground__input-form}}">
                  <label class="{{classes.auth-ground__label}}" for="login">Логин
                  </label>
                  {{{Input type='text'
                  name = 'login'
                  validFunc=loginValidFunc
                  width = '200'
                  height = '25'}}}
              </div>
              <div class="{{classes.auth-ground__input-form_margin}} {{classes.auth-ground__input-form}}">
                  <label class="{{classes.auth-ground__label}}" for="password">Пароль
                  </label>
                  {{{Input
                  type='password'
                  name = 'password'
                  width = '200'
                  validFunc=passwordValidFunc
                  height = '25'}}}
              </div>
          </form>
          <div class="{{classes.auth-ground__enter-button}}">{{{Button capture='Войти' onClick=enterClickHandler
              background='primary'}}}</div>
          <div class="{{classes.auth-ground__create-account-button}}">
              {{{Button capture='Создать аккаунт' onClick=createAccountClickHandler background='secondary'}}}
          </div>
      </div>
  </div>`;
   }
}

const AuthWithStore = connect(
   (state: IStore) => ({ user: state.user || null }),
   Auth as unknown as typeof Block,
);
export default AuthWithStore;
