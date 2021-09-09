import Block from '../mvc/Block';
import compile from '../utils/helpers';
import classes from './Heading/heading.css';
import heading from './Heading/heading.hbs';

export default class Heading extends Block {
   constructor(props) {
      // Создаём враппер дом-элемент button
      super('div', props);
   }

   render(): DocumentFragment {
      const fragment = compile(heading, {
         classes,
         title: this.props.title,
      });
      return fragment.content;
   }
}
