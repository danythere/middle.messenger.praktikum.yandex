"use strict";
exports.__esModule = true;
function compile(tmpl, context) {
    var fragment = document.createElement('template');
    var components = {};
    if (context.components) {
        Object.entries(context.components).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            var id = genUuid();
            components[id] = value.inst;
            context.components[key].template = "<div id=\"" + id + "\"></div>";
        });
    }
    fragment.innerHTML = tmpl(context);
    Object.entries(components).forEach(function (_a) {
        var id = _a[0], component = _a[1];
        var stub = fragment.content.querySelector("#" + id);
        stub.replaceWith(component.getContent()); // render должен вернуть HTMLElement
    });
    return fragment;
}
exports["default"] = compile;
var genUuid = function () { return "id" + Math.random().toString(16).slice(2); };
//# sourceMappingURL=helpers.js.map