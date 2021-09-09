"use strict";
exports.__esModule = true;
var helpers_1 = require("./helpers");
var Auth_1 = require("./pages/Auth");
window.onload = function () {
    var _a;
    /*
    // Регистрирауем шаблоны и хелперы.
    registerHelpers();
    registerPartials();
 
    // Страница по умолчанию-авторизация.
    const filled = auth(pagesConfig.auth);
    const root = document.querySelector('#root');
    root.classList.add(classes.root);
    document.querySelector('#root').innerHTML = filled;
 
    // Навешиванием события для переключения между страницами.
    pagesConfig.auth.eventListeners.forEach(eventListener => {
       document
          .querySelector(eventListener.selector)
          .addEventListener(
             eventListener.action,
             eventListener.function.bind(pagesConfig),
          );
    });
    */
    (0, helpers_1.registerHelpers)();
    var auth = new Auth_1["default"]();
    (_a = document.querySelector('#root')) === null || _a === void 0 ? void 0 : _a.appendChild(auth.getContent());
    /* setTimeout(() => {
       butt.setProps({ name: 'dedede' });
    }, 5000); */
};
//# sourceMappingURL=index.js.map