/* eslint-disable global-require */
/* eslint-disable import/first */
import { store } from './store';
import { setUser } from './store/user';
import { registerComponent, registerHelpers } from './helpers';

// Регистрируем сразу хелперы, иначе падает ошибка при компиляции шаблонов.
registerHelpers();
import Auth from './pages/Auth';
import Registration from './pages/Registration';
import Profile from './pages/Profile';
import Router from './utils/Router';
import Chat from './pages/Chat';
import Controller from './api/Controller';
import Block from './components/base/Block';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const components = require('./components/base/*.ts') as {
   [key: string]: { default: typeof Block };
};

Object.values(components).forEach(component => {
   registerComponent(component.default);
});
window.onload = (): void => {
   const router = new Router('#root');
   new Controller().getCurrentUser().then(res => {
      store.dispatch(setUser(JSON.parse(res)));
   });
   router
      .use('/', Auth)
      .use('/sign-up', Registration)
      .use('/settings', Profile)
      .use('/messenger', Chat);
   router.start();
};
