/* eslint-disable import/first */
import { registerHelpers } from './helpers';

// Регистрируем сразу хелперы, иначе падает ошибка при компиляции шаблонов.
registerHelpers();
import Auth from './pages/Auth';
import Router from './utils/Router';
import Block from './components/base/Block';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import Registration from './pages/Registration';

window.onload = (): void => {
   const router = new Router('#root');
   router
      .use('/sign-up', Registration)
      .use('/settings', Profile)
      .use('/messenger', Chat)
      .use('/', Auth);
   router.start();
};
