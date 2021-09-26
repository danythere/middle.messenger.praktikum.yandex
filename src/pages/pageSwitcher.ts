import Router from '../utils/Router';

export enum Names {
   'Auth',
   'Registration',
   'Chat',
   'ErrorPage',
   'Profile',
}

export const switchPage = (name: Names): void => {
   switch (name) {
      case Names.Auth:
         import('./Auth').then(Page => {
            const Chat = Page.default;
            Router.getInstance().changePage(new Chat({}));
         });
         break;

      case Names.Chat:
         import('./Chat').then(Page => {
            const Chat = Page.default;
            Router.getInstance().changePage(new Chat({}));
         });
         break;

      case Names.ErrorPage:
         import('./ErrorPage').then(Page => {
            const Chat = Page.default;
            Router.getInstance().changePage(new Chat({}));
         });
         break;
      case Names.Profile:
         import('./Profile').then(Page => {
            const Chat = Page.default;
            Router.getInstance().changePage(new Chat({}));
         });
         break;
      case Names.Registration:
         import('./Registration').then(Page => {
            const Chat = Page.default;
            Router.getInstance().changePage(new Chat({}));
         });
         break;

      default:
         break;
   }
};
