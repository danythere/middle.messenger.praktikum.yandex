/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable max-classes-per-file */
import { DOMWindow, JSDOM } from 'jsdom';
import Block from '../components/base/Block';
import Auth from '../pages/Auth';
import Registration from '../pages/Registration';
import Router from './Router';
import Profile from '../pages/Profile';

const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const dom = new JSDOM(`<html></html><body><div id="App"></div></body></html>`, {
   url: 'http://localhost:1234',
});
const globalAny: any = global;
globalAny.window = dom.window as DOMWindow;
globalAny.document = dom.window.document;

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
