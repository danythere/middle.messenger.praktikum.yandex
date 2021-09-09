"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Block_1 = require("../components/mvc/Block");
var auth_hbs_1 = require("./Auth/auth.hbs");
var auth_css_1 = require("./Auth/auth.css");
var helpers_1 = require("../components/utils/helpers");
var Input_1 = require("../components/base/Input");
var Heading_1 = require("../components/base/Heading");
var Button_1 = require("../components/base/Button");
var Auth = /** @class */ (function (_super) {
    __extends(Auth, _super);
    function Auth(props) {
        // Создаём враппер дом-элемент button
        return _super.call(this, 'div', props) || this;
    }
    Auth.prototype.render = function () {
        var fragment = (0, helpers_1["default"])(auth_hbs_1["default"], {
            classes: auth_css_1["default"],
            components: {
                heading: {
                    config: {
                        title: 'Войти'
                    },
                    inst: new Heading_1["default"]({
                        title: 'Войти'
                    }),
                    template: null
                },
                loginInput: {
                    config: {
                        type: 'text',
                        capture: 'Логин',
                        name: 'login',
                        id: 'login',
                        width: '200',
                        height: '30'
                    },
                    inst: new Input_1["default"]({
                        type: 'text',
                        name: 'login',
                        id: 'login',
                        capture: 'Логин',
                        width: '200',
                        height: '30'
                    }),
                    template: null
                },
                passwordInput: {
                    config: {
                        type: 'password',
                        name: 'password',
                        id: 'password',
                        capture: 'Пароль',
                        width: '200',
                        height: '30'
                    },
                    inst: new Input_1["default"]({
                        type: 'password',
                        name: 'password',
                        id: 'password',
                        width: '200',
                        height: '30',
                        capture: 'Пароль'
                    }),
                    template: null
                },
                enterButton: {
                    config: {
                        capture: 'Войти',
                        background: 'primary'
                    },
                    inst: new Button_1["default"]({
                        capture: 'Войти',
                        background: 'primary'
                    }),
                    template: null
                },
                createAccountButton: {
                    config: {
                        capture: 'Создать аккаунт',
                        background: 'secondary'
                    },
                    inst: new Button_1["default"]({
                        capture: 'Создать аккаунт',
                        background: 'secondary',
                        eventHandlers: {
                            onClick: function () {
                                console.log(2);
                            }
                        }
                    }),
                    template: null
                }
            }
        });
        return fragment.content;
    };
    return Auth;
}(Block_1["default"]));
exports["default"] = Auth;
//# sourceMappingURL=Auth.js.map