import EventBus from '../utils/EventBus';

export default class Block {
   static EVENTS = {
      INIT: 'init',
      FLOW_CDM: 'flow:component-did-mount',
      FLOW_CDU: 'flow:component-did-update',
      FLOW_RENDER: 'flow:render',
   };

   _element = null;

   _meta = null;

   props: any;

   eventBus: () => any;

   /** JSDoc
    * @param {string} tagName
    * @param {Object} props
    *
    * @returns {void}
    */
   constructor(tagName = 'div', props = {}) {
      const eventBus = new EventBus();

      this._meta = {
         tagName,
         props,
      };

      this.props = this._makePropsProxy(props);

      this.eventBus = () => eventBus;

      this._registerEvents(eventBus);

      eventBus.emit(Block.EVENTS.INIT);
   }

   _registerEvents(eventBus): void {
      eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
      eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
   }

   _createResources() {
      const { tagName } = this._meta;
      this._element = this._createDocumentElement(tagName);
   }

   init(): void {
      this._createResources();
      this.eventBus().emit(Block.EVENTS.FLOW_CDM);
   }

   _componentDidMount(): void {
      this.componentDidMount();
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
   }

   componentDidMount(oldProps) {}

   _componentDidUpdate(oldProps, newProps) {
      const response = this.componentDidUpdate(oldProps, newProps);
      if (!response) {
         return;
      }
      this._render();
   }

   componentDidUpdate(oldProps, newProps) {
      return true;
   }

   setProps = nextProps => {
      if (!nextProps) {
         return;
      }

      Object.assign(this.props, nextProps);
   };

   get element() {
      return this._element;
   }

   _render() {
      const block = this.render();
      while (this._element.firstChild) {
         this._element.removeChild(this._element.firstChild);
      }
      if (this.props.rootStyle) {
         this._element.setAttribute('style', this.props.rootStyle);
      }
      this._element.appendChild(block);
   }

   render(): DocumentFragment {}

   getContent() {
      return this.element;
   }

   _makePropsProxy(props) {
      // Можно и так передать this
      // Такой способ больше не применяется с приходом ES6+
      const self = this;

      return new Proxy(props, {
         get(target, prop) {
            const value = target[prop];
            return typeof value === 'function' ? value.bind(target) : value;
         },
         set(target, prop, value) {
            target[prop] = value;

            // Запускаем обновление компоненты
            // Плохой cloneDeep, в след итерации нужно заставлять добавлять cloneDeep им самим
            self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
            return true;
         },
         deleteProperty() {
            throw new Error('Нет доступа');
         },
      });
   }

   _createDocumentElement(tagName) {
      // Можно сделать метод, который через фрагменты в цикле создает сразу несколько блоков
      return document.createElement(tagName);
   }

   show() {
      this.getContent().style.display = 'block';
   }

   hide() {
      this.getContent().style.display = 'none';
   }
}
