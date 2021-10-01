import Avatar from '../../../../components/base/Avatar';
import Input from '../../../../components/base/Input';
import Popup from '../../../../components/base/Popup';
import classes from './dialogList.css';
import DialogPreview from '../DialogPreview';
import Button from '../../../../components/base/Button';
import Router from '../../../../utils/Router';
import Controller from '../../../../api/Controller';
import CreateChatTemplate from './CreateChatTemplate/CreateChatTemplate';

const myProfileAvatarConfig = {
   size: 'xs',
   link: 'https://usatiki.ru/files/images/4279051374_afdee3a409_b.jpg',
};

const searchConfig = {
   type: 'text',
   placeholder: 'Поиск...',
   name: 'search',
   background: 'gray',
   width: 300,
   height: 30,
   style: 'rounded',
};

const profileButtonConfig = {
   capture: 'Мой профиль',
   background: 'primary',
   size: 'm',
   eventHandlers: {
      onClick: (): void => {
         new Router('#root').go('/settings');
      },
   },
};

const logoutButtonConfig = {
   capture: 'Выход',
   background: 'secondary',
   size: 'm',
   eventHandlers: {
      onClick: (): void => {
         new Controller().logout().then(() => {
            new Router('#root').go('/');
         });
      },
   },
};

const createChatButtonConfig = {
   capture: 'Создать чат',
   background: 'secondary',
   size: 'm',
};

const createChatPopupConfig = {
   title: 'Создать чат',
   width: 200,
   height: 200,
   components: {
      main: {
         content: {
            config: {},
            inst: new CreateChatTemplate({}),
            template: null,
         },
      },
   },
};

export const getConfig = eventHandlers => ({
   classes,
   components: {
      buttons: {
         myProfile: {
            config: profileButtonConfig,
            inst: new Button(profileButtonConfig),
            template: null,
         },
         logout: {
            config: logoutButtonConfig,
            inst: new Button(logoutButtonConfig),
            template: null,
         },
         createChat: {
            config: createChatButtonConfig,
            inst: new Button({
               ...createChatButtonConfig,
               eventHandlers: { onClick: eventHandlers.createChatHandler },
            }),
            template: null,
         },
      },
      avatars: {
         myProfile: {
            config: myProfileAvatarConfig,
            inst: new Avatar(myProfileAvatarConfig),
            template: null,
         },
      },
      inputs: {
         search: {
            config: searchConfig,
            inst: new Input(searchConfig),
            template: null,
         },
      },
      popups: {
         createChat: {
            config: createChatPopupConfig,
            inst: new Popup(createChatPopupConfig),
            template: null,
         },
      },
      dialogPreviews: [
         {
            inst: new DialogPreview({
               avatarConfig: {
                  size: 'xs',
                  link: 'https://usatiki.ru/files/images/4279051374_afdee3a409_b.jpg',
               },
               authorName: 'Валерия',
               time: '12:10',
               number: 20,
               message: 'Работа не волк — в лес не убежит.',
            }),
            config: {},
            template: null,
         },
         {
            inst: new DialogPreview({
               avatarConfig: {
                  size: 'xs',
                  link: 'https://klopik.com/uploads/posts/2015-06/1434887101_fun_anim-24.jpg',
               },
               authorName: 'Антон',
               time: '12:45',
               number: 1,
               message:
                  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
            }),
            config: {},
            template: null,
         },
         {
            inst: new DialogPreview({
               avatarConfig: {
                  size: 'xs',
                  link: 'https://sobkor.net/uploads/posts/2016-04/1461838526_12.jpg',
               },
               authorName: 'Гена',
               time: '13:10',
               number: 4,
               message: 'Поспешишь — людей насмешишь',
            }),
            config: {},
            template: null,
         },
      ],
   },
});
