import { resolveModuleName } from 'typescript';
import { parse } from 'handlebars';
import Block from './Block';
import compile from '../../utils/helpers';
import classes from './List/list.css';
import list from './List/list.hbs';
import Fetch from '../../utils/Fetch';
import { DefaultPropsType } from '../types';

/**
 * Базовый компонент поля ввода.
 */
export default class List extends Block {
   private _value: string;

   protected _fetch: Fetch = new Fetch();

   constructor(props: DefaultPropsType) {
      super('div', props);
   }

   setSearchString(searchString) {
      this.setProps({ searchString });
   }

   render(): DocumentFragment {
      return new Promise((resolve, reject) => {
         this.props
            .source(
               JSON.stringify({
                  [this.props.searchStringKey]: this.props.searchString,
               }),
            )
            .then(data => {
               const parseData = JSON.parse(data);
               const fragment = compile(list, {
                  classes,
                  data: JSON.parse(data),
                  columns: this.props.columns,
               });
               if (this.props.onItemClick) {
                  const rowsList = [].slice.call(
                     fragment.content.querySelectorAll(`.${classes.list__row}`),
                     0,
                  ) as Array;
                  rowsList.forEach((row, index) => {
                     row.addEventListener(
                        'click',
                        this.props.onItemClick.bind(null, parseData[index]),
                     );
                  });
               }
               resolve(fragment.content);
            });
      });
   }
}
