import classes from './createChatTemplate.css';
import Input from '../../../../../components/base/Input';
import Button from '../../../../../components/base/Button';

const createChatButtonConfig={
    capture: 'Создать чат',
    background: 'primary',
    size: 'm',
}

 
const chatNameInputConfig={
    type: 'text',
    placeholder: '',
    name: 'chat-name',
    width: '200',
    height: '25',
}

export const getConfig = eventHandlers => ({
    classes,
    components: {
       buttons: {
          createChat: {
             config: createChatButtonConfig,
             inst: new Button({
                ...createChatButtonConfig,
                eventHandlers: { onClick: eventHandlers.createChatHandler },
             }),
             template: null,
          },
       },
       inputs: {
          chatName: {
             config: chatNameInputConfig,
             inst: new Input(chatNameInputConfig),
             template: null,
          },
       },