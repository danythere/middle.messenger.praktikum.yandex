/* eslint-disable max-classes-per-file */
import { DefaultPropsType } from 'components/types';

import Block from './Block';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const chai = require('chai');

const { expect } = chai;

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
