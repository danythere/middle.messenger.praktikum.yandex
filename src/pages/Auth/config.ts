import Input from '../../components/base/Input';
import Heading from '../../components/base/Heading';
import Button from '../../components/base/Button';
import Router from '../../utils/Router';
import classes from './auth.css';
import Validator from '../../utils/Validator';

const headingConfig = { title: 'Войти' };
const loginInputConfig = {
   type: 'text',
   capture: 'Логин',
   name: 'login',
   width: '200',
   height: '25',
   validFunc: Validator.validateLogin,
};
const enterButtonConfig = {
   capture: 'Войти',
   background: 'primary',
};
const passwordInputConfig = {
   type: 'password',
   name: 'password',
   capture: 'Пароль',
   width: '200',
   height: '25',
   validFunc: Validator.validatePassword,
};
const createAccountButtonConfig = {
   capture: 'Создать аккаунт',
   background: 'secondary',
   eventHandlers: {
      onClick: (): void => {
         import('../Registration').then(page => {
            const Registration = page.default;
            Router.getInstance().changePage(new Registration({}));
         });
      },
   },
};
export const getConfig = (eventHandlers: {
   [prop: string]: void;
}): {
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
} => ({
   classes,
   components: {
      headings: {
         heading: {
            config: headingConfig,
            inst: new Heading(headingConfig),
            template: null,
         },
      },
      inputs: {
         loginInput: {
            config: {
               ...loginInputConfig,
               capture: 'Логин',
               validType: 'login',
            },
            inst: new Input(loginInputConfig),
            template: null,
         },
         passwordInput: {
            config: {
               ...passwordInputConfig,
               capture: 'Пароль',
               validType: 'password',
            },
            inst: new Input(passwordInputConfig),
            template: null,
         },
      },
      buttons: {
         enterButton: {
            config: enterButtonConfig,
            inst: new Button({
               ...enterButtonConfig,
               eventHandlers: { onClick: eventHandlers.onClick },
            }),
            template: null,
         },
         createAccountButton: {
            config: createAccountButtonConfig,
            inst: new Button(createAccountButtonConfig),
            template: null,
         },
      },
   },
});
