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
var heading_css_1 = require("./Heading/heading.css");
var heading_hbs_1 = require("./Heading/heading.hbs");
var Heading = /** @class */ (function (_super) {
    __extends(Heading, _super);
    function Heading(props) {
        // Создаём враппер дом-элемент button
        return _super.call(this, 'div', props) || this;
    }
    Heading.prototype.render = function () {
        var fragment = (0, helpers_1["default"])(heading_hbs_1["default"], {
            classes: heading_css_1["default"],
            title: this.props.title
        });
        return fragment.content;
    };
    return Heading;
}(Block_1["default"]));
exports["default"] = Heading;
//# sourceMappingURL=Heading.js.map