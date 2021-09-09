import registrationClasses from '../partials/pages/registration.css';
import authClasses from '../partials/pages/auth.css';
import buttonClasses from '../partials/base/button.css';
import profileClasses from '../partials/pages/profile.css';
import inputClasses from '../partials/base/input.css';
import errorPageClasses from '../partials/pages/errorPage.css';
import registration from '../partials/pages/registration.hbs';
import errorPage from '../partials/pages/errorPage.hbs';
import profile from '../partials/pages/profile.hbs';
import chat from '../partials/pages/chat.hbs';
import headingClasses from '../partials/base/heading.css';

// Конфигурация всех страниц чата.
export const pagesConfig = {
   auth: {
      classes: authClasses,
      headingClasses,
      inputs: [
         {
            name: 'login',
            id: 'login',
            type: 'text',
            capture: 'Логин',
            classes: authClasses,
            inputClasses,
         },
         {
            name: 'password',
            id: 'password',
            type: 'password',
            capture: 'Пароль',
            classes: authClasses,
            inputClasses,
         },
      ],
      buttonClasses,
      eventListeners: [
         {
            selector: '#create-account-button',
            action: 'click',
            function(): void {
               document.querySelector('#root').innerHTML = registration(
                  this.registration,
               );
               if (this.registration.eventListeners) {
                  this.registration.eventListeners.forEach(eventListener => {
                     document
                        .querySelector(eventListener.selector)
                        .addEventListener(
                           eventListener.action,
                           eventListener.function.bind(pagesConfig),
                        );
                  });
               }
            },
         },
         {
            selector: '#enter-button',
            action: 'click',
            function(): void {
               document.querySelector('#root').innerHTML = chat(this.chat);
               if (this.chat.eventListeners) {
                  this.chat.eventListeners.forEach(eventListener => {
                     document
                        .querySelector(eventListener.selector)
                        .addEventListener(
                           eventListener.action,
                           eventListener.function.bind(pagesConfig),
                        );
                  });
               }
            },
         },
      ],
   },
   registration: {
      classes: registrationClasses,
      buttonClasses,
      headingClasses,
      inputs: [
         {
            name: 'first_name',
            id: 'first_name',
            type: 'text',
            capture: 'Имя',
            classes: registrationClasses,
            inputClasses,
         },
         {
            name: 'second_name',
            id: 'second_name',
            type: 'text',
            capture: 'Фамилия',
            classes: registrationClasses,
            inputClasses,
         },
         {
            name: 'login',
            id: 'login',
            type: 'text',
            capture: 'Логин',
            classes: registrationClasses,
            inputClasses,
         },
         {
            name: 'email',
            id: 'email',
            type: 'text',
            capture: 'Email',
            classes: registrationClasses,
            inputClasses,
         },
         {
            name: 'password',
            id: 'password',
            type: 'password',
            capture: 'Пароль',
            classes: registrationClasses,
            inputClasses,
         },
         {
            name: 'phone',
            id: 'phone',
            type: 'text',
            capture: 'Телефон',
            classes: registrationClasses,
            inputClasses,
         },
      ],
      eventListeners: [
         {
            selector: '#create-account-button',
            action: 'click',
            function(): void {
               document.querySelector('#root').innerHTML = chat(this.chat);
               if (this.chat.eventListeners) {
                  this.chat.eventListeners.forEach(eventListener => {
                     document
                        .querySelector(eventListener.selector)
                        .addEventListener(
                           eventListener.action,
                           eventListener.function.bind(pagesConfig),
                        );
                  });
               }
            },
         },
      ],
   },

   profile: {
      classes: profileClasses,
      buttonClasses,
      headingClasses,
      eventListeners: [
         {
            selector: '#save',
            action: 'click',
            function(): void {
               document.querySelector('#root').innerHTML = chat(this.chat);
               if (this.chat.eventListeners) {
                  this.chat.eventListeners.forEach(eventListener => {
                     document
                        .querySelector(eventListener.selector)
                        .addEventListener(
                           eventListener.action,
                           eventListener.function.bind(pagesConfig),
                        );
                  });
               }
            },
         },
         {
            selector: '#back',
            action: 'click',
            function(): void {
               document.querySelector('#root').innerHTML = chat(this.chat);
               if (this.chat.eventListeners) {
                  this.chat.eventListeners.forEach(eventListener => {
                     document
                        .querySelector(eventListener.selector)
                        .addEventListener(
                           eventListener.action,
                           eventListener.function.bind(pagesConfig),
                        );
                  });
               }
            },
         },
      ],
      inputs: [
         {
            name: 'first_name',
            id: 'first_name',
            type: 'text',
            capture: 'Имя',
            classes: profileClasses,
            inputClasses,
         },
         {
            name: 'second_name',
            id: 'second_name',
            type: 'text',
            capture: 'Фамилия',
            classes: profileClasses,
            inputClasses,
         },
         {
            name: 'display_name',
            id: 'display_name',
            type: 'text',
            capture: 'Отображаемое имя',
            classes: profileClasses,
            inputClasses,
         },
         {
            name: 'login',
            id: 'login',
            type: 'text',
            capture: 'Логин',
            classes: profileClasses,
            inputClasses,
         },
         {
            name: 'email',
            id: 'email',
            type: 'text',
            capture: 'Email',
            classes: profileClasses,
            inputClasses,
         },
         {
            name: 'phone',
            id: 'phone',
            type: 'text',
            capture: 'Телефон',
            classes: profileClasses,
            inputClasses,
         },
         {
            name: 'old_password',
            id: 'old_password',
            type: 'password',
            capture: 'Старый пароль',
            classes: profileClasses,
            inputClasses,
         },
         {
            name: 'new_password',
            id: 'new_password',
            type: 'password',
            capture: 'Новый пароль',
            classes: profileClasses,
            inputClasses,
         },
      ],
   },

   errorPage: {
      notFound: {
         classes: errorPageClasses,
         headingClasses,
         text: '404',
         image: '404-error.svg',
      },
      commonError: {
         classes: errorPageClasses,
         headingClasses,
         text: 'Произошла ошибка',
         image: 'error.svg',
      },
   },
   chat: {
      eventListeners: [
         {
            selector: '#not-found-error',
            action: 'click',
            function(): void {
               document.querySelector('#root').innerHTML = errorPage(
                  this.errorPage.notFound,
               );
               if (this.errorPage.eventListeners) {
                  this.errorPage.eventListeners.forEach(eventListener => {
                     document
                        .querySelector(eventListener.selector)
                        .addEventListener(
                           eventListener.action,
                           eventListener.function.bind(pagesConfig),
                        );
                  });
               }
            },
         },
         {
            selector: '#error',
            action: 'click',
            function(): void {
               document.querySelector('#root').innerHTML = errorPage(
                  this.errorPage.commonError,
               );
               if (this.errorPage.eventListeners) {
                  this.errorPage.eventListeners.forEach(eventListener => {
                     document
                        .querySelector(eventListener.selector)
                        .addEventListener(
                           eventListener.action,
                           eventListener.function.bind(pagesConfig),
                        );
                  });
               }
            },
         },
         {
            selector: '#profile',
            action: 'click',
            function(): void {
               document.querySelector('#root').innerHTML = profile(
                  this.profile,
               );
               if (this.profile.eventListeners) {
                  this.profile.eventListeners.forEach(eventListener => {
                     document
                        .querySelector(eventListener.selector)
                        .addEventListener(
                           eventListener.action,
                           eventListener.function.bind(pagesConfig),
                        );
                  });
               }
            },
         },
      ],
   },
};
