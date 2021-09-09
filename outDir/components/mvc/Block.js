"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var EventBus_1 = require("../utils/EventBus");
var Block = /** @class */ (function () {
    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    function Block(tagName, props) {
        var _this = this;
        if (tagName === void 0) { tagName = 'div'; }
        if (props === void 0) { props = {}; }
        this._element = null;
        this._meta = null;
        this.setProps = function (nextProps) {
            if (!nextProps) {
                return;
            }
            Object.assign(_this.props, nextProps);
        };
        var eventBus = new EventBus_1["default"]();
        this._meta = {
            tagName: tagName,
            props: props
        };
        this.props = this._makePropsProxy(props);
        this.eventBus = function () { return eventBus; };
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }
    Block.prototype._registerEvents = function (eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    };
    Block.prototype._createResources = function () {
        var tagName = this._meta.tagName;
        this._element = this._createDocumentElement(tagName);
    };
    Block.prototype.init = function () {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    };
    Block.prototype._componentDidMount = function () {
        this.componentDidMount();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    };
    Block.prototype.componentDidMount = function (oldProps) { };
    Block.prototype._componentDidUpdate = function (oldProps, newProps) {
        var response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    };
    Block.prototype.componentDidUpdate = function (oldProps, newProps) {
        return true;
    };
    Object.defineProperty(Block.prototype, "element", {
        get: function () {
            return this._element;
        },
        enumerable: false,
        configurable: true
    });
    Block.prototype._render = function () {
        var block = this.render();
        while (this._element.firstChild) {
            this._element.removeChild(this._element.firstChild);
        }
        this._element.appendChild(block);
    };
    Block.prototype.render = function () { };
    Block.prototype.getContent = function () {
        return this.element;
    };
    Block.prototype._makePropsProxy = function (props) {
        // Можно и так передать this
        // Такой способ больше не применяется с приходом ES6+
        var self = this;
        return new Proxy(props, {
            get: function (target, prop) {
                var value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set: function (target, prop, value) {
                target[prop] = value;
                // Запускаем обновление компоненты
                // Плохой cloneDeep, в след итерации нужно заставлять добавлять cloneDeep им самим
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, __assign({}, target), target);
                return true;
            },
            deleteProperty: function () {
                throw new Error('Нет доступа');
            }
        });
    };
    Block.prototype._createDocumentElement = function (tagName) {
        // Можно сделать метод, который через фрагменты в цикле создает сразу несколько блоков
        return document.createElement(tagName);
    };
    Block.prototype.show = function () {
        this.getContent().style.display = 'block';
    };
    Block.prototype.hide = function () {
        this.getContent().style.display = 'none';
    };
    Block.EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render'
    };
    return Block;
}());
exports["default"] = Block;
//# sourceMappingURL=Block.js.map