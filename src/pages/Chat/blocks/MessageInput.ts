import Block from '../../../components/base/Block';
import messageInput from './MessageInput/messageInput.hbs';
import compile from '../../../utils/helpers';
import { config } from './MessageInput/config';
import { DefaultPropsType } from '../../../components/types';

/**
 * Компонент ввода сообщений.
 */
export default class MessageInput extends Block {
   constructor(props: DefaultPropsType) {
      super('div', { ...props });
   }

   validate(): string | null {
      const validRes = config.components.inputs.message.inst.validate();
      return validRes;
   }

   render(): DocumentFragment {
      const fragment = compile(messageInput, config);
      if (this.props.eventHandlers.onSendClick) {
         fragment.content
            .querySelector('button')
            ?.addEventListener('click', this.props.eventHandlers.onSendClick);
      }
      return fragment.content;
   }
}
