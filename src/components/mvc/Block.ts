import EventBus from '../../utils/EventBus';

/**
 * Базовый компонент.
 */
export default class Block {
   static EVENTS = {
      INIT: 'init',
      FLOW_CDM: 'flow:component-did-mount',
      FLOW_CDU: 'flow:component-did-update',
      FLOW_RENDER: 'flow:render',
   };

   _element: HTMLElement | null = null;

   _meta: { tagName: string; props: { [prop: string]: unknown } } | null = null;

   props: any;

   eventBus: () => EventBus;

   /**
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

   /**
    * Регистрируем события жизненного цикла.
    * @param eventBus
    */
   _registerEvents(eventBus: EventBus): void {
      eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
      eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
   }

   /**
    * Создаем компонент по meta.
    */
   _createResources(): void {
      if (this._meta) {
         const { tagName } = this._meta;
         this._element = this._createDocumentElement(tagName);
      }
   }

   /**
    * Инициализация компонента.
    */
   init(): void {
      this._createResources();
      this.eventBus().emit(Block.EVENTS.FLOW_CDM);
   }

   /**
    * Цикл: элемент вставлен.
    */
   _componentDidMount(): void {
      this.componentDidMount();
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
   }

   componentDidMount(): void {}

   /**
    * Цикл: компонент обновлен.
    * @returns
    */
   _componentDidUpdate(): void {
      const response = this.componentDidUpdate();
      if (!response) {
         return;
      }
      this._render();
   }

   componentDidUpdate(): boolean {
      return true;
   }

   /**
    * Обновление состояния компонента.
    * @param nextProps
    * @returns
    */
   setProps = (nextProps: { [prop: string]: unknown }): void => {
      if (!nextProps) {
         return;
      }

      Object.assign(this.props, nextProps);
   };

   /**
    * Рендер функция.
    */
   _render(): void {
      const block = this.render();
      if (this._element) {
         while (this._element.firstChild) {
            this._element.removeChild(this._element.firstChild);
         }
         if (this.props.rootStyle) {
            this._element.setAttribute('style', this.props.rootStyle);
         }
         this._element.appendChild(block as Node);
      }
   }

   render(): DocumentFragment | void {}

   /**
    * Получение элемента.
    * @returns
    */
   getContent(): HTMLElement | null {
      return this._element;
   }

   /**
    * Проксируем пропсы.
    * @param props
    * @returns
    */
   _makePropsProxy(props: any): ProxyConstructor | null {
      const self = this;
      if (typeof props === 'object') {
         return new Proxy(props, {
            get(target, prop) {
               const value = target[prop];
               return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target, prop, value) {
               target[prop] = value;

               // Запускаем обновление компоненты
               // Плохой cloneDeep, в след итерации нужно заставлять добавлять cloneDeep им самим
               self
                  .eventBus()
                  .emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
               return true;
            },
            deleteProperty() {
               throw new Error('Нет доступа');
            },
         });
      }
      return null;
   }

   /**
    * Создание root.
    * @param tagName
    * @returns
    */
   _createDocumentElement(tagName: string): HTMLElement {
      return document.createElement(tagName);
   }

   /**
    * Отобразить компонент.
    */
   show(): void {
      const content = this.getContent();
      if (content) {
         content.style.display = 'block';
      }
   }

   /**
    * Скрыть компонент.
    */
   hide(): void {
      const content = this.getContent();
      if (content) {
         content.style.display = 'none';
      }
   }
}
