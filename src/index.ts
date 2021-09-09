import Registration from './pages/Registration';
import { registerHelpers } from './helpers';

import Auth from './pages/Auth';

window.onload = function (): void {
   registerHelpers();
   const registration = new Registration();
   document.querySelector('#root')?.appendChild(registration.getContent());

   /* setTimeout(() => {
      butt.setProps({ name: 'dedede' });
   }, 5000); */
};
