import registrationClasses from "../partials/pages/registration.css";
import authClasses from "../partials/pages/auth.css";
import buttonClasses from "../partials/base/button.css";
import profileClasses from "../partials/pages/profile.css";
import inputClasses from "../partials/base/input.css";
import registration from "../partials/pages/registration.hbs";
import auth from '../partials/pages/auth.hbs';
export const pagesConfig = {
  auth: {
    classes: authClasses,
    inputs: [
      {
        name: "login",
        id: "login",
        type: "text",
        capture: "Логин",
        classes: authClasses,
        inputClasses,
      },
      {
        name: "password",
        id: "password",
        type: "password",
        capture: "Пароль",
        classes: authClasses,
        inputClasses,
      },
    ],
    buttonClasses,
    eventListeners: [
      {
        selector: "#create-account-button",
        action: "click",
        function: function () {
          document.querySelector("#root").innerHTML = registration(
            this.registration
          );
          this.registration.eventListeners.forEach((eventListener) => {
            document
              .querySelector(eventListener.selector)
              .addEventListener(eventListener.action, eventListener.function.bind(pagesConfig));
          });
        },
      },
    ],
  },
  registration: {
    classes: registrationClasses,
    buttonClasses,
    inputs: [
      {
        name: "first_name",
        id: "first_name",
        type: "text",
        capture: "Имя",
        classes: registrationClasses,
        inputClasses,
      },
      {
        name: "second_name",
        id: "second_name",
        type: "text",
        capture: "Фамилия",
        classes: registrationClasses,
        inputClasses,
      },
      {
        name: "login",
        id: "login",
        type: "text",
        capture: "Логин",
        classes: registrationClasses,
        inputClasses,
      },
      {
        name: "email",
        id: "email",
        type: "text",
        capture: "Email",
        classes: registrationClasses,
        inputClasses,
      },
      {
        name: "password",
        id: "password",
        type: "password",
        capture: "Пароль",
        classes: registrationClasses,
        inputClasses,
      },
      {
        name: "phone",
        id: "phone",
        type: "text",
        capture: "Телефон",
        classes: registrationClasses,
        inputClasses,
      },
    ],
    eventListeners: [
      {
        selector: "#has-account-button",
        action: "click",
        function: function () {
          document.querySelector("#root").innerHTML = auth(
            this.auth
          );
          this.auth.eventListeners.forEach((eventListener) => {
            document
              .querySelector(eventListener.selector)
              .addEventListener(eventListener.action, eventListener.function.bind(pagesConfig));
          });
        },
      },
    ],
  },

  profile: {
    classes: profileClasses,
    buttonClasses,
    inputs: [
      {
        name: "first_name",
        id: "first_name",
        type: "text",
        capture: "Имя",
        classes: profileClasses,
        inputClasses,
      },
      {
        name: "second_name",
        id: "second_name",
        type: "text",
        capture: "Фамилия",
        classes: profileClasses,
        inputClasses,
      },
      {
        name: "display_name",
        id: "display_name",
        type: "text",
        capture: "Отображаемое имя",
        classes: profileClasses,
        inputClasses,
      },
      {
        name: "login",
        id: "login",
        type: "text",
        capture: "Логин",
        classes: profileClasses,
        inputClasses,
      },
      {
        name: "email",
        id: "email",
        type: "text",
        capture: "Email",
        classes: profileClasses,
        inputClasses,
      },
      {
        name: "phone",
        id: "phone",
        type: "text",
        capture: "Телефон",
        classes: profileClasses,
        inputClasses,
      },
      {
        name: "old_password",
        id: "old_password",
        type: "password",
        capture: "Старый пароль",
        classes: profileClasses,
        inputClasses,
      },
      {
        name: "new_password",
        id: "new_password",
        type: "password",
        capture: "Новый пароль",
        classes: profileClasses,
        inputClasses,
      },
    ],
  },
};
