/**
 * Система событий.
 */
export default class EventBus {
   listeners: { [prop: string]: CallableFunction[] };

   constructor() {
      this.listeners = {};
   }

   on(event: string, callback: CallableFunction): void {
      if (!this.listeners[event]) {
         this.listeners[event] = [];
      }

      this.listeners[event].push(callback);
   }

   off(event: string, callback: CallableFunction): void {
      if (!this.listeners[event]) {
         throw new Error(`Нет события: ${event}`);
      }

      this.listeners[event] = this.listeners[event].filter(
         listener => listener !== callback,
      );
   }

   emit(event: string, ...args: any[]): void {
      if (!this.listeners[event]) {
         throw new Error(`Нет события: ${event}`);
      }

      this.listeners[event].forEach(listener => {
         listener(...args);
      });
   }
}
