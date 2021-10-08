import Block from '../components/base/Block';
import Input, { IInputProps } from '../components/base/Input';
import classes from './Profile/profile.css';
import Controller from '../api/Controller';
import Validator from '../utils/Validator';
import Router from '../utils/Router';
import { connect, store } from '../store';
import { setUser } from '../store/user';
import { IUser } from '../interfaces/user';

const RES_LINK = 'https://ya-praktikum.tech/api/v2/resources';
/**
 * Страница авторизации.
 */
class Profile extends Block {
   getStateFromProps(): void {
      const state = store.getState() as {
         user: {
            profile: IUser;
         };
      };
      const avatar = state?.user?.profile?.avatar;
      this.state = {
         classes,
         passwordValidFunc: Validator.validatePassword,
         changePasswordClickHandler: this._changePassword.bind(this),
         changeProfileClickHandler: this._changeProfile.bind(this),
         avatar: avatar ? `${RES_LINK}${avatar}` : null,
         inputsConfig: [
            {
               type: 'text',
               placeholder: '',
               name: 'first_name',
               width: '200',
               height: '25',
               capture: 'Имя',
               value: state?.user?.profile?.first_name,
               validFunc: Validator.validateName,
            },
            {
               type: 'text',
               placeholder: '',
               capture: 'Фамилия',
               value: state.user?.profile?.second_name,
               name: 'second_name',
               width: '200',
               height: '25',
               validFunc: Validator.validateName,
            },
            {
               type: 'text',
               placholder: '',
               capture: 'Отображаемое имя',
               value: state.user?.profile?.display_name,
               name: 'display_name',
               width: '200',
               height: '25',
               validFunc: Validator.validateName,
            },
            {
               type: 'text',
               placeholder: '',
               capture: 'Email',
               name: 'email',
               value: state.user?.profile?.email,
               width: '200',
               height: '25',
               validFunc: Validator.validateEmail,
            },
            {
               type: 'text',
               placeholder: '',
               name: 'login',
               width: '200',
               value: state.user?.profile?.login,
               capture: 'Логин',
               height: '25',
               validFunc: Validator.validateLogin,
            },
            {
               type: 'text',
               placeholder: '',
               capture: 'Телефон',
               name: 'phone',
               width: '200',
               value: state.user?.profile?.phone,
               height: '25',
               validFunc: Validator.validatePhone,
            },
         ],
      };
   }

   constructor(props: { [props: string]: unknown }) {
      super('div', { ...props });
   }

   componentDidUpdate(oldProps: any, newProps: any): boolean {
      if (newProps && newProps.profile) {
         const { profile } = newProps;
         let hasChanged = false;
         const inputsConfig = [...this.state.inputsConfig];
         Object.entries(profile).forEach(([key, value]) => {
            const inputConfig = inputsConfig.find(item => {
               return item.name === key;
            });
            if (inputConfig && inputConfig.value !== value) {
               inputConfig.value = value;
               hasChanged = true;
            }
         });
         if (hasChanged) {
            this.state.inputsConfig = inputsConfig;
         }
         if (
            profile.avatar &&
            `${RES_LINK}${profile.avatar}` !== this.state.avatar
         ) {
            this.state.avatar = `${RES_LINK}${profile.avatar}`;
            hasChanged = true;
         }
         if (hasChanged) {
            return true;
         }
      }
      return true;
   }

   componentAfterRender(): void {
      const content = this.getContent();
      if (content) {
         const backButton = content.querySelector('#back');
         backButton?.addEventListener('click', () => {
            new Router('#root').go('/messenger');
         });

         content
            .querySelector('input[name="avatar"]')
            ?.addEventListener('change', () => {
               const form = content.querySelector(
                  'form[name="avatarForm"]',
               ) as HTMLFormElement;
               const formData = new FormData(form);
               new Controller().changeAvatar(formData).then(user => {
                  store.dispatch(setUser(JSON.parse(user)));
               });
            });
      }
   }

   private _changeProfile(): void {
      let isValid = true;
      Object.entries(this.state.inputsConfig).forEach(
         ([, value]: [string, IInputProps]) => {
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
            const form = content.querySelector(
               'form[name="mainDataForm"]',
            ) as HTMLFormElement;
            const formData = new FormData(form);
            new Controller()
               .changeProfile(
                  JSON.stringify(
                     Object.fromEntries(
                        formData as unknown as Iterable<[string, unknown]>,
                     ),
                  ),
               )
               .then(newProfile => {
                  store.dispatch(setUser(JSON.parse(newProfile)));
               });
         }
      }
   }

   protected _changePassword(): void {
      const oldPasswordInput = this.getChild('oldPassword') as unknown as Input;
      const newPasswordInput = this.getChild('newPassword') as unknown as Input;
      if (oldPasswordInput && newPasswordInput) {
         const hasErrorOldPass = oldPasswordInput.validate();
         const hasErrorNewpass = newPasswordInput.validate();
         if (!hasErrorOldPass && !hasErrorNewpass) {
            const content = this.getContent();
            if (content) {
               const form = content.querySelector(
                  'form[name="passwordForm"]',
               ) as HTMLFormElement;
               const formData = new FormData(form);
               new Controller().changePassword(
                  JSON.stringify(
                     Object.fromEntries(
                        formData as unknown as Iterable<[string, unknown]>,
                     ),
                  ),
               );
            }
         }
      }
   }

   render(): string {
      return `<div class="{{classes.profile}}">
  <div class="{{classes.profile-back}}" id="back"><img class="{{classes.profile-back__title}}" src="arrow.svg" /></div>
  <div class="{{classes.profile-ground}}">
    {{{Heading title='Профиль'}}}
    <form name="avatarForm">
    <label class="{{classes.profile-avatar_cursor}}">
      {{{Avatar size='m' link=avatar}}}
      <input  name='avatar'  accept="image/png, image/gif, image/jpeg" type="file" hidden>
   </label>
   </form>
    <form name='mainDataForm'>
      {{#each inputsConfig}}
      <div class="{{../classes.profile-ground__input-form}} {{../classes.profile-ground__input-form_margin}}">
        <label class="{{../classes.profile-ground__label}}" for="{{this.name}}">{{this.capture}}</label>
        {{{Input value=this.value type=this.type name=this.name height=this.height validFunc=validFunc width=this.width}}}
      </div>
      {{/each}}
    </form>
    {{{Button capture='Сохранить' background='primary' onClick=changeProfileClickHandler}}}
    <form name='passwordForm' class="{{classes.profile-ground__password-form}}">
      <div class="{{classes.profile-ground__input-form}} {{classes.profile-ground__input-form_margin}}">
        <label class="{{classes.profile-ground__label}}"
          for="{{components.password.oldPasswordInput.config.name}}">Старый пароль</label>
        {{{Input type='password' width=200 height=25 name='oldPassword' validFunc=passwordValidFunc}}}
      </div>
      <div class="{{classes.profile-ground__input-form}} {{classes.profile-ground__input-form_margin}}">
        <label class="{{classes.profile-ground__label}}"
          for="{{components.password.newPasswordInput.config.name}}">Новый пароль</label>
        {{{Input type='password' width=200 height=25 name='newPassword' validFunc=passwordValidFunc}}}
      </div>
    </form>
    {{{Button capture='Изменить пароль'  background='primary' onClick=changePasswordClickHandler}}}
  </div>
</div>`;
   }
}

const ProfileWithStore = connect(
   (state: any) => ({ profile: state.user.profile || null }),
   Profile,
);
export default ProfileWithStore;
