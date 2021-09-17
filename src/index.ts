/* eslint-disable import/first */
import { registerHelpers } from './helpers';

// Регистрируем сразу хелперы, иначе падает ошибка при компиляции шаблонов.
registerHelpers();
import Auth from './pages/Auth';
import Router from './utils/Router';
import Block from './components/base/Block';

window.onload = (): void => {
   Router.getInstance().subscribeOnChangePage(async (newPage: Block) => {
      const root = document.querySelector('#root');
      while (root?.firstChild) {
         root?.removeChild(root.firstChild);
      }
      const content = newPage.getContent();
      if (content) {
         root?.appendChild(content);
      }
   });
   const auth = new Auth({});
   const content = auth.getContent();
   if (content) {
      document.querySelector('#root')?.appendChild(content);
   }
};
