import Block from '../components/base/Block';
import classes from './Registration/registration.css';
import { DefaultPropsType } from '../components/types';
import Validator from '../utils/Validator';
import Controller from '../api/Controller';
import Router from '../utils/Router';
import { connect } from '../store';
import Input from '../components/base/Input';
import { IUser } from '../interfaces/user';

interface IInputConfig {
   type: string;
   placeholder: string;
   name: string;
   width: number;
   height: number;
   capture: string;
   validFunc: void;
}
/**
 * Страница регистрации.
 */
class Registration extends Block {
   getStateFromProps(): void {
      this.state = {
         classes,
         onCreateAccountClickHandler: this._createAccount.bind(this),
         inputsConfig: [
            {
               type: 'text',
               placeholder: '',
               name: 'first_name',
               width: '200',
               height: '25',
               capture: 'Имя',
               validFunc: Validator.validateName,
            },
            {
               type: 'text',
               placeholder: '',
               name: 'second_name',
               capture: 'Фамилия',
               width: '200',
               height: '25',
               validFunc: Validator.validateName,
            },
            {
               type: 'text',
               placeholder: '',
               capture: 'Логин',
               name: 'login',
               width: '200',
               height: '25',
               validFunc: Validator.validateLogin,
            },
            {
               type: 'text',
               placeholder: '',
               name: 'email',
               capture: 'Email',
               width: '200',
               height: '25',
               validFunc: Validator.validateEmail,
            },
            {
               type: 'password',
               placeholder: '',
               name: 'password',
               capture: 'Пароль',
               width: '200',
               height: '25',
               validFunc: Validator.validatePassword,
            },
            {
               type: 'text',
               placeholder: '',
               name: 'phone',
               width: '200',
               capture: 'Телефон',
               height: '25',
               validFunc: Validator.validatePhone,
            },
         ],
      };
   }

   constructor(props: DefaultPropsType) {
      super('div', { ...props });
   }

   componentDidUpdate(oldProps: any, newProps: any): boolean {
      if (newProps.user && newProps.user.profile.id) {
         new Router('#root').go('/messenger');
      }
      return true;
   }

   private _createAccount(): void {
      let isValid = true;
      Object.entries(this.state.inputsConfig).forEach(
         ([, value]: [string, IInputConfig]) => {
            const child = this.getChild(value.name) as unknown as Input;
            if (child) {
               const validRes = child.validate();
               if (validRes) {
                  isValid = false;
               }
            }
         },
      );
      if (isValid) {
         const content = this.getContent();
         if (content) {
            const form = content.querySelector('form') as HTMLFormElement;
            if (form) {
               const formData = new FormData(form);
               new Controller()
                  .registrate(
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
   }

   render(): string {
      return `<div class="{{classes.registration}}">
      <div class="{{classes.registration-ground}}">
      <div class="{{classes.registration-ground__name}}">
      {{{Heading title='Регистрация'}}}
   </div>
         <form>
            {{#each inputsConfig}}
            <div class="{{../classes.registration-ground__input-form_margin}}">
               <label class="{{../classes.registration-ground__label}}"
                  for="{{this.name}}">{{this.capture}}</label>
               {{{Input width=this.width height=this.height type=this.type validFunc=this.validFunc name=this.name}}}
            </div>
         {{/each}}
         </form>
         {{{Button background='primary' capture="Создать аккаунт" onClick=onCreateAccountClickHandler}}}
      </div>
   </div>`;
   }
}

const RegistrationWithStore = connect(
   (state: { user: { profile: IUser } }) => ({ user: state.user || null }),
   Registration,
);
export default RegistrationWithStore;
