import registration from "../src/partials/pages/registration.hbs";
import profile from "../src/partials/pages/profile.hbs";
import auth from "../src/partials/pages/auth.hbs";
import { pagesConfig } from "./data/pagesConfig";
import classes from "./index.css";
import { registerHelpers } from "./helpers";
import { registerPartials } from "./partials";
window.onload = function () {
  registerHelpers();
  registerPartials();
  var filled = auth(pagesConfig.auth);
  const root = document.querySelector("#root");
  root.classList.add(classes.root);
  document.querySelector("#root").innerHTML = filled;
  pagesConfig.auth.eventListeners.forEach((eventListener) => {
    document
      .querySelector(eventListener.selector)
      .addEventListener(
        eventListener.action,
        eventListener.function.bind(pagesConfig)
      );
  });
};
