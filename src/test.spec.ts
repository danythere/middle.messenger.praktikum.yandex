/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable max-classes-per-file */
import { DOMWindow, JSDOM } from 'jsdom';
import { DefaultPropsType } from 'components/types';
import { assert } from 'chai';
import Block from './components/base/Block';
import Auth from './pages/Auth';
import Registration from './pages/Registration';
import Router from './utils/Router';
import Profile from './pages/Profile';
import ErrorPage from './pages/ErrorPage';
import EventBus from './utils/EventBus';

const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const dom = new JSDOM(`<html></html><body><div id="App"></div></body></html>`, {
   url: 'http://localhost:1234',
});
const globalAny: any = global;
globalAny.window = dom.window as DOMWindow;
globalAny.document = dom.window.document;

class Test extends Block {
   constructor(props: DefaultPropsType) {
      super('div', { ...props });
   }

   render(): string {
      return `<div>test</div>`;
   }
}

class TestSpan extends Block {
   constructor(props: DefaultPropsType) {
      super('div', { ...props });
   }

   render(): string {
      return `<span>test</span>`;
   }
}

class TestInside extends Block {
   constructor(props: DefaultPropsType) {
      super('div', { ...props });
   }

   render(): string {
      return `<span><h1>test</h1></span>`;
   }
}

class TestProps extends Block {
   constructor(props: DefaultPropsType) {
      super('div', { ...props });
   }

   render(): string {
      return `<div>{{test}}</div>`;
   }
}

class TestState extends Block {
   state: { test: number };

   constructor(props: DefaultPropsType) {
      super('div', { ...props });
   }

   getStateFromProps() {
      this.state = {
         test: 4,
      };
   }

   changeState(value: number): void {
      this.state.test = value;
   }

   render(): string {
      return `<div>{{test}}</div>`;
   }
}

const eventBus = new EventBus();

describe('Тестирование Eventbus.', () => {
   beforeEach(() => {
      eventBus.listeners = {};
   });

   it('Подписка на событие', () => {
      eventBus.on('check', () => null);
      expect(Object.keys(eventBus).length).to.equal(1);
      assert.property(eventBus.listeners, 'check');
   });

   it('Подписка на одно событие двумя обработчиками', () => {
      eventBus.on('check', () => null);
      eventBus.on('check', () => null);
      expect(Object.keys(eventBus).length).to.equal(1);
      assert.property(eventBus.listeners, 'check');
      assert.typeOf(eventBus.listeners.check, 'array');
      expect(eventBus.listeners.check.length).to.equal(2);
   });

   it('Отписка от события', () => {
      function callback() {
         return null;
      }
      eventBus.on('check', callback);
      eventBus.off('check', callback);
      expect(eventBus.listeners.check.length).to.equal(0);
   });

   /*
   it('Отправленное событие вызывает обработчик', () => {
      function callback() {
         return null;
      }
      const spy = sinon.spy(callback);
      eventBus.on('checkCallback', callback);
      eventBus.emit('checkCallback');
      sinon.assert.called(spy);
   }); */
});

describe('Тестируем базовый блок', () => {
   it('Корень в верстке в базовом соответствует переданному в него', () => {
      const testBlock = new Test({});
      expect(testBlock.getContent()?.nodeName).to.equal('DIV');
      const testBlockSpan = new TestSpan({});
      expect(testBlockSpan.getContent()?.nodeName).to.equal('SPAN');
   });
   it('Внутрянка корня в верстке в базовом компоненте строится согласно переданной в него', () => {
      const testBlock = new Test({});
      expect(testBlock.getContent()?.firstChild?.textContent).to.equal('test');
      const testBlockInside = new TestInside({});
      expect(testBlockInside.getContent()?.firstChild?.nodeName).to.equal('H1');
   });

   it('Переданные props отображаются в верстке', () => {
      const testBlock = new TestProps({ test: 3 });
      expect(testBlock.getContent()?.firstChild?.textContent).to.equal('3');
   });

   it('Заданный state отображается в верстке', () => {
      const testBlock = new TestState({});
      expect(testBlock.getContent()?.firstChild?.textContent).to.equal('4');
   });

   it('Компонент перерисовывается при изменении state.', () => {
      const testBlock = new TestState({});
      testBlock.changeState(27);
      expect(testBlock.getContent()?.firstChild?.textContent).to.equal('27');
   });

   it('Компонент перерисовывается при изменении props.', () => {
      const testBlock = new TestProps({});
      testBlock.setProps({ test: 38 });
      expect(testBlock.getContent()?.firstChild?.textContent).to.equal('38');
   });
});

describe('Тестирование роутера.', () => {
   it('При переходе на страницу устанавливается правильная ссылка.', () => {
      const router = new Router('#root');
      router
         .use('/', Auth as new (props: unknown) => Block)
         .use('/register', Registration as new (props: unknown) => Block);
      router.start();
      router.go('/register');
      expect(global.document.location.pathname).to.equal('/register');
   });
   it('При последовательном переходе по страницам устанавливается правильная итоговая ссылка.', () => {
      const router = new Router('#root');
      router
         .use('/', Auth as new (props: unknown) => Block)
         .use('/register', Registration as new (props: unknown) => Block)
         .use('/settings', Profile as new (props: unknown) => Block);
      router.start();
      router.go('/register');
      router.go('/');
      router.go('/settings');
      expect(document.location.pathname).to.equal('/settings');
   });
   it('Переход назад по истории.', () => {
      const spy = sinon.spy(global.window.history, 'back');
      const router = new Router('#root');
      router
         .use('/', Auth as new (props: unknown) => Block)
         .use('/register', Registration as new (props: unknown) => Block)
         .use('/settings', Profile as new (props: unknown) => Block);
      router.start();
      router.go('/register');
      router.go('/settings');
      router.back();
      sinon.assert.calledOnce(spy);
   });
   it('Если перешли по несуществующему роуту, то рендерится страница ошибки.', () => {
      const router = new Router('#root');
      router.use('/', Auth as new (props: unknown) => Block);
      router.go('/this-page-is-not-found');
      expect(router.currentRoute?.blockClass.name).to.equal('ErrorPage');
   });
   it('Переход вперед по истории.', () => {
      const router = new Router('#root');
      const spy = sinon.spy(global.window.history, 'forward');
      router
         .use('/', Auth as new (props: unknown) => Block)
         .use('/register', Registration as new (props: unknown) => Block)
         .use('/settings', Profile as new (props: unknown) => Block);
      router.start();
      router.go('/register');
      router.go('/settings');
      router.back();
      router.forward();
      sinon.assert.calledOnce(spy);
   });
});
