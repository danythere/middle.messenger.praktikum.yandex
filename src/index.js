import registration from "../src/partials/pages/registration.hbs";
import profile from "../src/partials/pages/profile.hbs";
import auth from "../src/partials/pages/auth.hbs";
import errorPage from '../src/partials/pages/errorPage.hbs';
import { pagesConfig } from "./data/pagesConfig";
import classes from "./index.css";
import { registerHelpers } from "./helpers";
import { registerPartials } from "./partials";
window.onload = function () {
  // Регистрирауем шаблоны и хелперы.
  registerHelpers();
  registerPartials();

  // Страница по умолчанию-авторизация.
  var filled = auth(pagesConfig.auth);
  const root = document.querySelector("#root");
  root.classList.add(classes.root);
  document.querySelector("#root").innerHTML = filled;

  // Навешиванием события для переключения между страницами.
  pagesConfig.auth.eventListeners.forEach((eventListener) => {
    document
      .querySelector(eventListener.selector)
      .addEventListener(
        eventListener.action,
        eventListener.function.bind(pagesConfig)
      );
  });
};
