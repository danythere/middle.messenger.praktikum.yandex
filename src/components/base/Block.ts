import Handlebars from 'handlebars';
import { nanoid } from 'nanoid';
import EventBus from '../../utils/EventBus';
import classes from './Block/block.css';

/**
 * Базовый компонент.
 */
export default class Block {
   static EVENTS = {
      INIT: 'init',
      FLOW_CDU: 'flow:component-did-update',
      FLOW_CUR: 'flow:component-after-render',
      FLOW_RENDER: 'flow:render',
      FLOW_CBM: 'flow:component-before-mount',
   };

   public id = nanoid(6);

   protected children: { [id: string]: Block } = {};

   _element: HTMLElement | null = null;

   _meta: { tagName: string; props: { [prop: string]: unknown } } | null = null;

   protected state: unknown = {};

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
      this.getStateFromProps(props);
      this._meta = {
         tagName,
         props,
      };

      this.getStateFromProps(props);

      this.state = this._makePropsProxy(this.state);

      this.props = this._makePropsProxy(props);

      this.state = this._makePropsProxy(this.state);

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
      eventBus.on(Block.EVENTS.FLOW_CBM, this._componentBeforeMount.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
      eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CUR, this._componentAfterRender.bind(this));
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
      this.eventBus().emit(Block.EVENTS.FLOW_CBM);
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
   }

   protected _componentBeforeMount(): void {
      this.componentBeforeMount();
   }

   componentBeforeMount(): void {}

   protected _componentAfterRender(): void {
      this.componentAfterRender();
   }

   componentAfterRender(): void {}

   protected getStateFromProps(_props: unknown): void {
      this.state = {};
   }

   /**
    * Цикл: компонент обновлен.
    * @returns
    */
   _componentDidUpdate(oldProps: unknown, newProps: unknown): void {
      const response = this.componentDidUpdate(oldProps, newProps);
      if (!response) {
         return;
      }
      this._render();
   }

   componentDidUpdate(_oldProps: unknown, _newProps: unknown): boolean {
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
      this.children = {};
      const fragment = this._compile();
      if (fragment) {
         const newElement = fragment.firstElementChild!;
         this._element!.replaceWith(newElement);
         this._element = newElement as HTMLElement;
      }
      this.eventBus().emit(Block.EVENTS.FLOW_CUR);
   }

   render(): string | void {}

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
      if (typeof props === 'object') {
         return new Proxy(props, {
            get(target, prop) {
               const value = target[prop];
               return typeof value === 'function' ? value.bind(target) : value;
            },
            set: (target, prop, value) => {
               const oldTarget = { ...target };
               const newTarget = target;
               newTarget[prop] = value;
               this.eventBus().emit(
                  Block.EVENTS.FLOW_CDU,
                  oldTarget,
                  newTarget,
               );
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
      if (this._element) {
         this._element.classList.remove(classes.block_hide);
      }
   }

   _compile(): DocumentFragment {
      const fragment = document.createElement('template');

      /**
       * Рендерим шаблон
       */

      const template = Handlebars.compile(this.render());
      fragment.innerHTML = template({
         ...(this.state as { [props: string]: unknown }),
         ...(this.props as { [props: string]: unknown }),
         children: this.children,
      });

      /**
       * Заменяем заглушки на компоненты
       */
      Object.entries(this.children).forEach(([id, component]) => {
         /**
          * Ищем заглушку по id
          */
         const stub = fragment.content.querySelector(`[data-id="${id}"]`);

         if (!stub) {
            return;
         }

         /**
          * Заменяем заглушку на component._element
          */
         stub.replaceWith(component.getContent() as HTMLElement);
      });

      /**
       * Возвращаем фрагмент
       */
      return fragment.content;
   }

   getChild(name: string): Block | null {
      const childrens = Object.entries(this.children).filter(
         ([, child]: [string, Block]) => {
            const childProps = child.props as { name?: string };
            return childProps.name === name;
         },
      );
      if (childrens.length) {
         const [, child] = childrens[0];
         return child;
      }
      return null;
   }

   /**
    * Скрыть компонент.
    */
   hide(): void {
      if (this._element) {
         this._element.classList.add(classes.block_hide);
      }
   }
}
