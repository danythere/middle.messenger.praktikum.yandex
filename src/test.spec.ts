import { JSDOM } from 'jsdom';
import Router from './utils/Router';

const chai = require('chai');
const expect = chai.expect;

declare global {
   namespace NodeJS {
      interface Global {
         document: Document;
         window: Window;
         navigator: Navigator;
      }
   }
}
const globalAny: any = global;
/*
describe('Тестируем базовый блок', () => {
   it('Функция getContent() отдает верстку блока', () => {
      const block = new Block('div', {});
      console.log(typeof block.getContent());
   });
   it('Контент пустого базового компонента с переданном опцией div представляет из себя пустой div', () => {
      const block = new Block('div', {});
      console.log(typeof block.getContent());
      console.log('block.getContent()');
   });
});
*/

describe('Тестируем базовый блок', () => {
   it('Функция getContent() отдает верстку блока', () => {
      globalAny.document = new JSDOM('');
      console.log(globalAny.document.window.location);
      new Router('#root');
   });
});
