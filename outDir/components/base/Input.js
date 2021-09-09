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
var helpers_1 = require("../utils/helpers");
var input_css_1 = require("./Input/input.css");
var input_hbs_1 = require("./input/input.hbs");
var Input = /** @class */ (function (_super) {
    __extends(Input, _super);
    function Input(props) {
        // Создаём враппер дом-элемент button
        return _super.call(this, 'div', props) || this;
    }
    Input.prototype.render = function () {
        var fragment = (0, helpers_1["default"])(input_hbs_1["default"], {
            classes: input_css_1["default"],
            type: this.props.type,
            name: this.props.name,
            id: this.props.id,
            width: this.props.width,
            height: this.props.height
        });
        return fragment.content;
    };
    return Input;
}(Block_1["default"]));
exports["default"] = Input;
//# sourceMappingURL=Input.js.map