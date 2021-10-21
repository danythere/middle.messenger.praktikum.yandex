import Button from '../../../../components/base/Button';
import Input from '../../../../components/base/Input';
import Validator from '../../../../utils/Validator';
import classes from './messageInput.css';

const messageInputConfig = {
   type: 'text',
   placeholder: '',
   name: 'message',
   width: '600',
   height: '30',
   style: 'rounded',
   background: 'gray',
   validFunc: Validator.validateMessage,
};

const sendButtonConfig = {
   background: 'send',
   style: 'rounded',
   size: 'xs',
   icon: 'send.svg',
};
export const config = {
   classes,
   components: {
      inputs: {
         message: {
            config: messageInputConfig,
            inst: new Input(messageInputConfig),
            template: null,
         },
      },
      buttons: {
         send: {
            config: sendButtonConfig,
            inst: new Button(sendButtonConfig),
            template: null,
         },
      },
   },
};
