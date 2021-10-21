import Block from '../../../components/base/Block';
import dialogPreview from './DialogPreview/dialogPreview.hbs';
import compile from '../../../utils/helpers';
import { getConfig } from './DialogPreview/config';
import { DefaultPropsType } from '../../../components/types';

/**
 * Блок диалога, отображаемый в ленте диалогов.
 */
export default class DialogPreview extends Block {
   constructor(props: DefaultPropsType) {
      super('div', { ...props });
   }

   render(): DocumentFragment {
      const { avatarConfig, authorName, time, message, number } = this.props;
      const fragment = compile(
         dialogPreview,
         getConfig({ avatarConfig, authorName, time, message, number }),
      );
      return fragment.content;
   }
}
