import Block from 'components/base/Block';
import ErrorPage from '../pages/ErrorPage';
import Route from './Route';

const errorRoute = new Route('/404', ErrorPage, { rootQuery: '#root' });

export default class Router<T extends Block> {
   static __instance: Router;

   routes: Route<T>[];

   history: History;

   private _currentRoute: Route<T> | null;

   private _rootQuery: string;

   constructor(rootQuery: string) {
      if (Router.__instance) {
         return Router.__instance;
      }

      this.routes = [];
      this.history = window.history;
      this._currentRoute = null;
      this._rootQuery = rootQuery;
      Router.__instance = this;
   }

   use(pathname: string, block: new (props: unknown) => T): Router<T> {
      const route = new Route(pathname, block, { rootQuery: this._rootQuery });

      this.routes.push(route);

      return this;
   }

   start(): void {
      window.onpopstate = (event: PopStateEvent) => {
         if (event) {
            const currentTarget = event.currentTarget as Window;
            this._onRoute(currentTarget.location.pathname);
         }
      };
      this._onRoute(window.location.pathname);
   }

   _onRoute(pathname: string): void {
      const route = this.getRoute(pathname) || errorRoute;
      this._currentRoute = route;
      route.render();
   }

   go(pathname: string): void {
      this.history.pushState({}, '', pathname);
      this._onRoute(pathname);
   }

   back(): void {
      this.history.back();
   }

   forward(): void {
      this.history.forward();
   }

   getRoute(pathname: string): Route<T> | undefined {
      return this.routes.find(route => route.match(pathname));
   }
}
