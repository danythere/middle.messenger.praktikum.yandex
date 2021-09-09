"use strict";
exports.__esModule = true;
exports.registerHelpers = void 0;
var handlebars_runtime_1 = require("handlebars/dist/handlebars.runtime");
// Склеить класс и его постфикс.
function registerHelpers() {
    handlebars_runtime_1["default"].registerHelper('getClass', function (someClass, postfix, classes) {
        return classes[someClass + postfix];
    });
    // Склейка нескольких классов.
    handlebars_runtime_1["default"].registerHelper('glueClasses', function () {
        var array = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            array[_i] = arguments[_i];
        }
        var result = array.reduce(function (accumulator, elem) {
            return typeof elem === 'string'
                ? accumulator + " " + elem
                : accumulator;
        }, '');
        return result;
    });
}
exports.registerHelpers = registerHelpers;
//# sourceMappingURL=helpers.js.map