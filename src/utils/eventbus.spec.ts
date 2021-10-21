import { assert, expect } from 'chai';
import EventBus from './EventBus';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const sinon = require('sinon');

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

   it('Отправленное событие вызывает обработчик', () => {
      const callback = sinon.spy();
      eventBus.on('checkCallback', callback);
      eventBus.emit('checkCallback');
      expect(callback.called).to.equal(true);
   });
});
