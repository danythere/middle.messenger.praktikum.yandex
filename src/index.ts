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
const components = require.context('./components/base/', false, /\.ts$/);

components.keys().forEach(item => {
   const component = components(item);
   if (component.default.name !== 'WithStore') {
      registerComponent(component.default);
   }
});
window.onload = (): void => {
   const router = new Router('#root');
   new Controller().getCurrentUser().then(res => {
      store.dispatch(setUser(JSON.parse(res)));
   });
   router
      .use('/', Auth as new (props: unknown) => Block)
      .use('/sign-up', Registration as new (props: unknown) => Block)
      .use('/settings', Profile as new (props: unknown) => Block)
      .use('/messenger', Chat);
   router.start();
};
