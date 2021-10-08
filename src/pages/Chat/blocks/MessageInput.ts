import Block from '../../../components/base/Block';
import classes from './MessageInput/messageInput.css';
import { DefaultPropsType } from '../../../components/types';
import Controller from '../../../api/Controller';
import Validator from '../../../utils/Validator';
import Input from '../../../components/base/Input';

/**
 * Компонент ввода сообщений.
 */
export default class MessageInput extends Block {
   constructor(props: DefaultPropsType) {
      super('div', { ...props });
      this._sendHandler = this._sendHandler.bind(this);
   }

   getStateFromProps(): void {
      this.state = {
         classes,
         sendHandler: this._sendHandler.bind(this),
         validFunc: Validator.validateMessage,
      };
   }

   protected _sendHandler(): void {
      const messageChild = this.getChild('message') as Input;
      if (messageChild) {
         const validRes = messageChild.validate();
         if (!validRes) {
            new Controller().sendMessage(messageChild.getValue());
            messageChild.setValue('');
         }
      }
   }

   render(): string {
      return `<div class="{{classes.message-input}}">
      <img src="paper-clip.svg" class="{{classes.message-input__operation}}" height="30px" width="30px" />
      <img src="smile.svg" class="{{classes.message-input__operation}}" height="30px" width="30px" />
      {{{Input    
      type= 'text'
      name= 'message'
      width='600'
      height='30'
      style='rounded'
      validFunc=validFunc
      background='gray'}}}
      <div class="{{classes.message-input__send-button}}">
         {{{Button    background= 'send'
         style= 'rounded'
         onClick=sendHandler
         size= 'xs'
         icon='send.svg'}}}
      </div>
   </div>`;
   }
}
