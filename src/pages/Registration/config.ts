import Input from '../../components/base/Input';
import Heading from '../../components/base/Heading';
import Button from '../../components/base/Button';
import classes from './registration.css';
import Router from '../../utils/Router';
import Validator from '../../utils/Validator';

const headingConfig = {
   title: 'Регистрация',
};

const firstNameInputConfig = {
   type: 'text',
   placeholder: '',
   name: 'first_name',
   width: '200',
   height: '25',
   validFunc: Validator.validateName,
};
const secondNameInputConfig = {
   type: 'text',
   placeholder: '',
   name: 'second_name',
   width: '200',
   height: '25',
   validFunc: Validator.validateName,
};
const loginInputConfig = {
   type: 'text',
   placeholder: '',
   name: 'login',
   width: '200',
   height: '25',
   validFunc: Validator.validateLogin,
};

const mailInputConfig = {
   type: 'text',
   placeholder: '',
   name: 'email',
   width: '200',
   height: '25',
   validFunc: Validator.validateEmail,
};
const passwordInputConfig = {
   type: 'password',
   placeholder: '',
   name: 'password',
   width: '200',
   height: '25',
   validFunc: Validator.validatePassword,
};
const phoneInputConfig = {
   type: 'text',
   placeholder: '',
   name: 'phone',
   width: '200',
   height: '25',
   validFunc: Validator.validatePhone,
};

const createAccountButtonConfig = {
   capture: 'Создать аккаунт',
   background: 'primary',
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
         firstNameInput: {
            config: {
               ...firstNameInputConfig,
               capture: 'Имя',
            },
            inst: new Input({ ...firstNameInputConfig }),
            template: null,
         },
         secondNameInput: {
            config: {
               ...secondNameInputConfig,
               capture: 'Фамилия',
            },
            inst: new Input(secondNameInputConfig),
            template: null,
         },
         loginInput: {
            config: {
               ...loginInputConfig,
               capture: 'Логин',
            },
            inst: new Input(loginInputConfig),
            template: null,
         },
         mailInput: {
            config: {
               ...mailInputConfig,
               capture: 'Почта',
            },
            inst: new Input(mailInputConfig),
            template: null,
         },
         passwordInput: {
            config: {
               ...passwordInputConfig,
               capture: 'Пароль',
            },
            inst: new Input(passwordInputConfig),
            template: null,
         },
         phoneInput: {
            config: {
               ...phoneInputConfig,
               capture: 'Телефон',
            },
            inst: new Input(phoneInputConfig),
            template: null,
         },
      },
      buttons: {
         createAccountButton: {
            config: createAccountButtonConfig,
            inst: new Button({
               ...createAccountButtonConfig,
               eventHandlers: { onClick: eventHandlers.onClick },
            }),
            template: null,
         },
      },
   },
});
