/**
 * Контроллер.
 */
export default class Controller {
   protected static _instance: Controller = new Controller();

   constructor() {
      if (Controller._instance) {
         throw new Error(
            'Instantiation failed: ' +
               'use Router.getInstance() instead of new.',
         );
      }
   }

   public auth(): void {
      // do smth
   }

   public registrate(): void {
      // do smth
   }

   public sendMessage(): void {
      // do smth
   }

   public loadMessages(): void {
      // do smth
   }

   public loadDialog(): void {
      // do smth
   }

   public loadProfile(): void {
      // do smth
   }

   public saveProfile(): void {
      // do smth
   }
}
