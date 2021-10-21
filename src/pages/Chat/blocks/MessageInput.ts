import Block from '../../../components/base/Block';
import classes from './MessageInput/messageInput.css';
import { DefaultPropsType } from '../../../components/types';
import Controller from '../../../api/Controller';
import Validator from '../../../utils/Validator';
import Input from '../../../components/base/Input';
import sendIcon from '../../../assets/send.svg';
import paperClipIcon from '../../../assets/paper-clip.svg';
import smileIcon from '../../../assets/smile.svg';

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
         sendIcon,
         paperClipIcon,
         smileIcon,
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
      <img src={{paperClipIcon}} class="{{classes.message-input__operation}}" height="30px" width="30px" />
      <img src={{smileIcon}} class="{{classes.message-input__operation}}" height="30px" width="30px" />
      {{{Input
      type= 'text'
      name= 'message'
      width='600'
      height='30'
      style='rounded'
      validFunc=validFunc
      background='gray'}}}
      <div class="{{classes.message-input__send-button}}">
          {{{Button background= 'send'
          style= 'rounded'
          onClick=sendHandler
          size= 'xs'
          icon=sendIcon}}}
      </div>
  </div>`;
   }

   static regName = 'MessageInput';
}
