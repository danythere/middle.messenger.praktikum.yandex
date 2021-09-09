import Input from '../../components/base/Input';
import Heading from '../../components/base/Heading';
import Button from '../../components/base/Button';
import classes from './registration.css';
import { getInputConfig } from './../../helpers';
const headingConfig = {
   title: 'Регистрация',
};

const firstNameInputConfig = getInputConfig(
   'text',
   'Имя',
   'first-name',
   'first-name',
   '200',
   '30',
);
const secondNameInputConfig = getInputConfig(
   'text',
   'Фамилия',
   'second-name',
   'second-name',
   '200',
   '30',
);
const loginInputConfig = getInputConfig(
   'text',
   'Логин',
   'login',
   'login',
   '200',
   '30',
);
const mailInputConfig = getInputConfig(
   'text',
   'Почта',
   'mail',
   'mail',
   '200',
   '30',
);
const passwordInputConfig = getInputConfig(
   'text',
   'Пароль',
   'password',
   'password',
   '200',
   '30',
);
const phoneInputConfig = getInputConfig(
   'text',
   'Телефон',
   'phone',
   'password',
   '200',
   '30',
);

const createAccountButtonConfig = {
   capture: 'Создать аккаунт',
   background: 'primary',
};
export const config = {
   classes,
   components: {
      heading: {
         config: headingConfig,
         inst: new Heading(headingConfig),
         template: null,
      },
      firstNameInput: {
         config: firstNameInputConfig,
         inst: new Input(firstNameInputConfig),
         template: null,
      },
      secondNameInput: {
         config: secondNameInputConfig,
         inst: new Input(secondNameInputConfig),
         template: null,
      },
      loginInput: {
         config: loginInputConfig,
         inst: new Input(loginInputConfig),
         template: null,
      },
      mailInput: {
         config: mailInputConfig,
         inst: new Input(mailInputConfig),
         template: null,
      },
      passwordInput: {
         config: passwordInputConfig,
         inst: new Input(passwordInputConfig),
         template: null,
      },
      phoneInput: {
         config: phoneInputConfig,
         inst: new Input(phoneInputConfig),
         template: null,
      },
      createAccountButton: {
         config: createAccountButtonConfig,
         inst: new Button(createAccountButtonConfig),
         template: null,
      },
   },
};
