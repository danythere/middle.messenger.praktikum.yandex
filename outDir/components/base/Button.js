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
var Block_1 = require("../mvc/Block");
var button_css_1 = require("./Button/button.css");
var button_hbs_1 = require("./Button/button.hbs");
var helpers_1 = require("../utils/helpers");
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button(props) {
        // Создаём враппер дом-элемент button
        return _super.call(this, 'div', props) || this;
    }
    Button.prototype.render = function () {
        var _a, _b;
        var fragment = (0, helpers_1["default"])(button_hbs_1["default"], {
            classes: button_css_1["default"],
            background: this.props.background,
            capture: this.props.capture
        });
        if ((_a = this.props) === null || _a === void 0 ? void 0 : _a.eventHandlers.onClick) {
            (_b = fragment.content
                .querySelector('button')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', this.props.eventHandlers.onClick);
        }
        return fragment.content;
    };
    return Button;
}(Block_1["default"]));
exports["default"] = Button;
//# sourceMappingURL=Button.js.map