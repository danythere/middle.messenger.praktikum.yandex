"use strict";
exports.__esModule = true;
exports.pagesConfig = void 0;
var registration_css_1 = require("../partials/pages/registration.css");
var auth_css_1 = require("../partials/pages/auth.css");
var button_css_1 = require("../partials/base/button.css");
var profile_css_1 = require("../partials/pages/profile.css");
var input_css_1 = require("../partials/base/input.css");
var errorPage_css_1 = require("../partials/pages/errorPage.css");
var registration_hbs_1 = require("../partials/pages/registration.hbs");
var errorPage_hbs_1 = require("../partials/pages/errorPage.hbs");
var profile_hbs_1 = require("../partials/pages/profile.hbs");
var chat_hbs_1 = require("../partials/pages/chat.hbs");
var heading_css_1 = require("../partials/base/heading.css");
// Конфигурация всех страниц чата.
exports.pagesConfig = {
    auth: {
        classes: auth_css_1["default"],
        headingClasses: heading_css_1["default"],
        inputs: [
            {
                name: 'login',
                id: 'login',
                type: 'text',
                capture: 'Логин',
                classes: auth_css_1["default"],
                inputClasses: input_css_1["default"]
            },
            {
                name: 'password',
                id: 'password',
                type: 'password',
                capture: 'Пароль',
                classes: auth_css_1["default"],
                inputClasses: input_css_1["default"]
            },
        ],
        buttonClasses: button_css_1["default"],
        eventListeners: [
            {
                selector: '#create-account-button',
                action: 'click',
                "function": function () {
                    document.querySelector('#root').innerHTML = (0, registration_hbs_1["default"])(this.registration);
                    if (this.registration.eventListeners) {
                        this.registration.eventListeners.forEach(function (eventListener) {
                            document
                                .querySelector(eventListener.selector)
                                .addEventListener(eventListener.action, eventListener["function"].bind(exports.pagesConfig));
                        });
                    }
                }
            },
            {
                selector: '#enter-button',
                action: 'click',
                "function": function () {
                    document.querySelector('#root').innerHTML = (0, chat_hbs_1["default"])(this.chat);
                    if (this.chat.eventListeners) {
                        this.chat.eventListeners.forEach(function (eventListener) {
                            document
                                .querySelector(eventListener.selector)
                                .addEventListener(eventListener.action, eventListener["function"].bind(exports.pagesConfig));
                        });
                    }
                }
            },
        ]
    },
    registration: {
        classes: registration_css_1["default"],
        buttonClasses: button_css_1["default"],
        headingClasses: heading_css_1["default"],
        inputs: [
            {
                name: 'first_name',
                id: 'first_name',
                type: 'text',
                capture: 'Имя',
                classes: registration_css_1["default"],
                inputClasses: input_css_1["default"]
            },
            {
                name: 'second_name',
                id: 'second_name',
                type: 'text',
                capture: 'Фамилия',
                classes: registration_css_1["default"],
                inputClasses: input_css_1["default"]
            },
            {
                name: 'login',
                id: 'login',
                type: 'text',
                capture: 'Логин',
                classes: registration_css_1["default"],
                inputClasses: input_css_1["default"]
            },
            {
                name: 'email',
                id: 'email',
                type: 'text',
                capture: 'Email',
                classes: registration_css_1["default"],
                inputClasses: input_css_1["default"]
            },
            {
                name: 'password',
                id: 'password',
                type: 'password',
                capture: 'Пароль',
                classes: registration_css_1["default"],
                inputClasses: input_css_1["default"]
            },
            {
                name: 'phone',
                id: 'phone',
                type: 'text',
                capture: 'Телефон',
                classes: registration_css_1["default"],
                inputClasses: input_css_1["default"]
            },
        ],
        eventListeners: [
            {
                selector: '#create-account-button',
                action: 'click',
                "function": function () {
                    document.querySelector('#root').innerHTML = (0, chat_hbs_1["default"])(this.chat);
                    if (this.chat.eventListeners) {
                        this.chat.eventListeners.forEach(function (eventListener) {
                            document
                                .querySelector(eventListener.selector)
                                .addEventListener(eventListener.action, eventListener["function"].bind(exports.pagesConfig));
                        });
                    }
                }
            },
        ]
    },
    profile: {
        classes: profile_css_1["default"],
        buttonClasses: button_css_1["default"],
        headingClasses: heading_css_1["default"],
        eventListeners: [
            {
                selector: '#save',
                action: 'click',
                "function": function () {
                    document.querySelector('#root').innerHTML = (0, chat_hbs_1["default"])(this.chat);
                    if (this.chat.eventListeners) {
                        this.chat.eventListeners.forEach(function (eventListener) {
                            document
                                .querySelector(eventListener.selector)
                                .addEventListener(eventListener.action, eventListener["function"].bind(exports.pagesConfig));
                        });
                    }
                }
            },
            {
                selector: '#back',
                action: 'click',
                "function": function () {
                    document.querySelector('#root').innerHTML = (0, chat_hbs_1["default"])(this.chat);
                    if (this.chat.eventListeners) {
                        this.chat.eventListeners.forEach(function (eventListener) {
                            document
                                .querySelector(eventListener.selector)
                                .addEventListener(eventListener.action, eventListener["function"].bind(exports.pagesConfig));
                        });
                    }
                }
            },
        ],
        inputs: [
            {
                name: 'first_name',
                id: 'first_name',
                type: 'text',
                capture: 'Имя',
                classes: profile_css_1["default"],
                inputClasses: input_css_1["default"]
            },
            {
                name: 'second_name',
                id: 'second_name',
                type: 'text',
                capture: 'Фамилия',
                classes: profile_css_1["default"],
                inputClasses: input_css_1["default"]
            },
            {
                name: 'display_name',
                id: 'display_name',
                type: 'text',
                capture: 'Отображаемое имя',
                classes: profile_css_1["default"],
                inputClasses: input_css_1["default"]
            },
            {
                name: 'login',
                id: 'login',
                type: 'text',
                capture: 'Логин',
                classes: profile_css_1["default"],
                inputClasses: input_css_1["default"]
            },
            {
                name: 'email',
                id: 'email',
                type: 'text',
                capture: 'Email',
                classes: profile_css_1["default"],
                inputClasses: input_css_1["default"]
            },
            {
                name: 'phone',
                id: 'phone',
                type: 'text',
                capture: 'Телефон',
                classes: profile_css_1["default"],
                inputClasses: input_css_1["default"]
            },
            {
                name: 'old_password',
                id: 'old_password',
                type: 'password',
                capture: 'Старый пароль',
                classes: profile_css_1["default"],
                inputClasses: input_css_1["default"]
            },
            {
                name: 'new_password',
                id: 'new_password',
                type: 'password',
                capture: 'Новый пароль',
                classes: profile_css_1["default"],
                inputClasses: input_css_1["default"]
            },
        ]
    },
    errorPage: {
        notFound: {
            classes: errorPage_css_1["default"],
            headingClasses: heading_css_1["default"],
            text: '404',
            image: '404-error.svg'
        },
        commonError: {
            classes: errorPage_css_1["default"],
            headingClasses: heading_css_1["default"],
            text: 'Произошла ошибка',
            image: 'error.svg'
        }
    },
    chat: {
        eventListeners: [
            {
                selector: '#not-found-error',
                action: 'click',
                "function": function () {
                    document.querySelector('#root').innerHTML = (0, errorPage_hbs_1["default"])(this.errorPage.notFound);
                    if (this.errorPage.eventListeners) {
                        this.errorPage.eventListeners.forEach(function (eventListener) {
                            document
                                .querySelector(eventListener.selector)
                                .addEventListener(eventListener.action, eventListener["function"].bind(exports.pagesConfig));
                        });
                    }
                }
            },
            {
                selector: '#error',
                action: 'click',
                "function": function () {
                    document.querySelector('#root').innerHTML = (0, errorPage_hbs_1["default"])(this.errorPage.commonError);
                    if (this.errorPage.eventListeners) {
                        this.errorPage.eventListeners.forEach(function (eventListener) {
                            document
                                .querySelector(eventListener.selector)
                                .addEventListener(eventListener.action, eventListener["function"].bind(exports.pagesConfig));
                        });
                    }
                }
            },
            {
                selector: '#profile',
                action: 'click',
                "function": function () {
                    document.querySelector('#root').innerHTML = (0, profile_hbs_1["default"])(this.profile);
                    if (this.profile.eventListeners) {
                        this.profile.eventListeners.forEach(function (eventListener) {
                            document
                                .querySelector(eventListener.selector)
                                .addEventListener(eventListener.action, eventListener["function"].bind(exports.pagesConfig));
                        });
                    }
                }
            },
        ]
    }
};
//# sourceMappingURL=pagesConfig.js.map