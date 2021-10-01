import Heading from '../../components/base/Heading';
import Input from '../../components/base/Input';
import Button from '../../components/base/Button';
import classes from './profile.css';
import Avatar from '../../components/base/Avatar';
import Validator from '../../utils/Validator';
import { EventHandlersType, ClassesType } from '../types';

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
const nicknameInputConfig = {
   type: 'text',
   placholder: '',
   name: 'display_name',
   width: '200',
   height: '25',
   validFunc: Validator.validateName,
};

const mailInputConfig = {
   type: 'text',
   placeholder: '',
   name: 'email',
   width: '200',
   height: '25',
   validFunc: Validator.validateEmail,
};

const loginInputConfig = {
   type: 'text',
   placeholder: '',
   name: 'login',
   width: '200',
   height: '25',
   validFunc: Validator.validateLogin,
};
const phoneInputConfig = {
   type: 'text',
   placeholder: '',
   name: 'phone',
   width: '200',
   height: '25',
   validFunc: Validator.validatePhone,
};
const oldPasswordInputConfig = {
   type: 'password',
   placeholder: '',
   name: 'oldPassword',
   width: '200',
   height: '25',
   validFunc: Validator.validatePassword,
};

const newPasswordInputConfig = {
   type: 'password',
   placeholder: '',
   name: 'newPassword',
   width: '200',
   height: '25',
   validFunc: Validator.validatePassword,
};

const headingConfig = {
   title: 'Профиль',
};

const saveButtonConfig = {
   capture: 'Сохранить',
   background: 'primary',
};

const changePasswordButtonConfig = {
   capture: 'Изменить пароль',
   background: 'primary',
};
const avatarConfig = {
   size: 'm',
   link: 'https://usatiki.ru/files/images/4279051374_afdee3a409_b.jpg',
};
export const getConfig = (
   eventHandlers: EventHandlersType,
): {
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
} => ({
   classes,
   components: {
      buttons: {
         saveButton: {
            config: saveButtonConfig,
            inst: new Button({
               ...saveButtonConfig,
               eventHandlers: { onClick: eventHandlers.onClick },
            }),
            template: null,
         },
         changePassword: {
            config: changePasswordButtonConfig,
            inst: new Button({
               ...changePasswordButtonConfig,
               eventHandlers: { onClick: eventHandlers.changePassword },
            }),
            template: null,
         },
      },
      avatars: {
         avatar: {
            inst: new Avatar(avatarConfig),
            config: avatarConfig,
            template: null,
         },
      },
      headings: {
         heading: {
            config: headingConfig,
            inst: new Heading(headingConfig),
            template: null,
         },
      },
      inputs: {
         firstNameInput: {
            config: { ...firstNameInputConfig, capture: 'Имя' },
            inst: new Input(firstNameInputConfig),
            template: null,
         },
         secondNameInput: {
            config: { ...secondNameInputConfig, capture: 'Фамилия' },
            inst: new Input(secondNameInputConfig),
            template: null,
         },
         nicknameInput: {
            config: { ...nicknameInputConfig, capture: 'Отображаемое имя' },
            inst: new Input(nicknameInputConfig),
            template: null,
         },
         loginInput: {
            config: { ...loginInputConfig, capture: 'Логин' },
            inst: new Input(loginInputConfig),
            template: null,
         },
         mailInput: {
            config: { ...mailInputConfig, capture: 'Почта' },
            inst: new Input(mailInputConfig),
            template: null,
         },
         phoneInput: {
            config: { ...phoneInputConfig, capture: 'Телефон' },
            inst: new Input(phoneInputConfig),
            template: null,
         },
      },
      password: {
         oldPasswordInput: {
            config: { ...oldPasswordInputConfig, capture: 'Старый пароль' },
            inst: new Input(oldPasswordInputConfig),
            template: null,
         },
         newPasswordInput: {
            config: { ...newPasswordInputConfig, capture: 'Новый пароль' },
            inst: new Input(newPasswordInputConfig),
            template: null,
         },
      },
   },
});
