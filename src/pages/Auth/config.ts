import Input from '../../components/base/Input';
import Heading from '../../components/base/Heading';
import Button from '../../components/base/Button';
import classes from './auth.css';
const headingConfig = { title: 'Войти' };
const loginInputConfig = {
   type: 'text',
   capture: 'Логин',
   name: 'login',
   id: 'login',
   width: '200',
   height: '30',
};
const enterButtonConfig = { capture: 'Войти', background: 'primary' };
const passwordInputConfig = {
   type: 'password',
   name: 'password',
   id: 'password',
   capture: 'Пароль',
   width: '200',
   height: '30',
};
const createAccountButtonConfig = {
   capture: 'Создать аккаунт',
   background: 'secondary',
};
export const config = {
   classes,
   components: {
      heading: {
         config: headingConfig,
         inst: new Heading(headingConfig),
         template: null,
      },
      loginInput: {
         config: loginInputConfig,
         inst: new Input(loginInputConfig),
         template: null,
      },
      passwordInput: {
         config: passwordInputConfig,
         inst: new Input(passwordInputConfig),
         template: null,
      },
      enterButton: {
         config: enterButtonConfig,
         inst: new Button(enterButtonConfig),
         template: null,
      },
      createAccountButton: {
         config: createAccountButtonConfig,
         inst: new Button(createAccountButtonConfig),
         template: null,
      },
   },
};
