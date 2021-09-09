import Block from '../mvc/Block';
import compile from '../utils/helpers';
import classes from './Input/input.css';
import input from './input/input.hbs';

export default class Input extends Block {
   constructor(props) {
      // Создаём враппер дом-элемент button
      super('div', props);
   }

   render(): DocumentFragment {
      const fragment = compile(input, {
         classes,
         type: this.props.type,
         name: this.props.name,
         id: this.props.id,
         width: this.props.width,
         height: this.props.height,
      });
      return fragment.content;
   }
}
