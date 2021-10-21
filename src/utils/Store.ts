import EventBus from './EventBus';

export interface Action {
   type: string;
   payload?: unknown;
}

type Reducer<S = unknown> = (state: S, action: Action) => S;

type Indexed = { [key: string]: unknown };

export class Store extends EventBus {
   private state: Indexed = {};

   private reducer: Reducer;

   constructor(reducers: Indexed) {
      super();

      this.reducer = this.combineReducers(reducers);

      this.dispatch({ type: '@@INIT' });
   }

   public dispatch(action: Action): void {
      this.state = this.reducer(this.state, action);

      this.emit('changed');
   }

   public getState(): unknown {
      return this.state;
   }

   private combineReducers(reducers: Indexed): Reducer {
      return (_state: unknown, action: Action) => {
         const newState: Indexed = {};

         Object.entries(reducers).forEach(([key, reducer]) => {
            newState[key] = reducer(this.state[key], action);
         });

         return newState;
      };
   }
}
