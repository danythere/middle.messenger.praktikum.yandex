import Block from './Block';
import classes from './List/list.css';
import { DefaultPropsType } from '../types';

/**
 * Базовый список( к сожалению не хватило сил сделать его универсальным, поэтому
 * он используется в одном месте, думаю вынесу его в следующей итерации из базовых).
 */
export default class List extends Block {
   constructor(props: DefaultPropsType) {
      super('div', props);
   }

   getStateFromProps(): void {
      this.state = {
         classes,
         data: [],
      };
   }

   setSearchString(searchString: string): void {
      this.props
         .source(JSON.stringify({ [this.props.searchStringKey]: searchString }))
         .then((users: string) => {
            this.state.data = JSON.parse(users);
         });
   }

   componentAfterRender(): void {
      if (this.props.onItemClick) {
         const rowsList = [].slice.call(
            this.getContent()?.querySelectorAll(`.${classes.list__row}`),
            0,
         ) as Array<HTMLElement>;
         rowsList.forEach((row, index) => {
            row.addEventListener(
               'click',
               this.props.onItemClick.bind(null, this.state.data[index]),
            );
         });
      }
   }

   render(): string {
      return `<div>
               {{#each (getDataByColumns data columns)}}
               <div class="{{../classes.list__row}} {{../classes.list__row_clickable}}" >
                   {{#each this}}
                     <div class="{{../classes.list__cell}}">{{this}}</div>
                   {{/each}}
               </div>
               {{/each}}
           </div>`;
   }

   static regName = 'List';
}
