import Block from '../components/base/Block';
import EventBus from './EventBus';

/**
 * Роутер для переключения страниц.
 */
export default class Router {
   protected static _instance: Router = new Router();

   protected static _eventBus: EventBus = new EventBus();

   constructor() {
      if (Router._instance) {
         throw new Error(
            'Instantiation failed: ' +
               'use Router.getInstance() instead of new.',
         );
      }
   }

   public static getInstance(): Router {
      return Router._instance;
   }

   public subscribeOnChangePage(callback: CallableFunction): void {
      Router._eventBus.on('changePage', callback);
   }

   public changePage(newPage: Block): void {
      Router._eventBus.emit('changePage', newPage);
   }
}
