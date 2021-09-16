import Block from '../../../components/mvc/Block';
import messageInput from './MessageInput/messageInput.hbs';
import compile from '../../../utils/helpers';
import { config } from './MessageInput/config';

/**
 * Компонент ввода сообщений.
 */
export default class MessageInput extends Block {
   constructor(props: { [props: string]: unknown }) {
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
