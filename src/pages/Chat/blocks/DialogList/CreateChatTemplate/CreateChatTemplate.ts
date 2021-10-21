import Controller from '../../../../../api/Controller';
import Block from '../../../../../components/base/Block';
import classes from './createChatTemplate.css';
import popupClasses from '../../../../../components/base/popup.css';
import { DefaultPropsType, ClassesType } from '../../../../../components/types';
import Input from '../../../../../components/base/Input';
import { IPopupOptions } from '../../../../../components/interfaces';
import Validator from '../../../../../utils/Validator';

interface ICreateChatTemplateOptions extends IPopupOptions {
   onCreateHandler: () => unknown;
}
/**
 * Окно создания чата.
 */
export default class CreateChatTemplate extends Block {
   private _onCreate: () => unknown;

   constructor(props: DefaultPropsType) {
      super('div', { ...props });
   }

   state: {
      classes: ClassesType;
      mode: 'hide' | 'visible';
      validFunc: (title: string) => string | null;
      createChat: void;
      width?: number;
      title?: string;
      height?: number;
   };

   getStateFromProps(): void {
      this.state = {
         classes: { ...classes, ...popupClasses },
         mode: 'hide',
         validFunc: Validator.validateTitle,
         createChat: this._createChat.bind(this),
      };
   }

   protected _createChat(): void {
      const child = this.getChild('nameInput') as unknown as Input;
      const validRes = child.validate();
      if (validRes) {
         return;
      }
      new Controller()
         .createChat(
            JSON.stringify({
               title: child?.getValue(),
            }),
         )
         .then(() => {
            if (this._onCreate) {
               this._onCreate();
            }
         });
   }

   open(options: ICreateChatTemplateOptions): void {
      this._open(options);
   }

   close(): void {
      this._close();
   }

   private _open(options: ICreateChatTemplateOptions): void {
      this.state.mode = 'visible';
      this.state.width = options.width;
      this.state.title = options.title;
      this.state.height = options.height;
      if (options.onCreateHandler) {
         this._onCreate = options.onCreateHandler;
      }
   }

   private _close(): void {
      this.state.mode = 'hide';
   }

   componentAfterRender(): void {
      this.getContent()
         ?.querySelector('div[name="close-button"]')
         ?.addEventListener('click', () => {
            this.state.mode = 'hide';
         });
   }

   render(): string {
      return `<div class="{{classes.popup__overlay}} {{getClass 'popup_' mode classes}}">
      <div class="{{classes.popup}}"
          style="width:{{width}}px;height:{{height}}px;top:calc(50% - {{devide height  2}}px);left:calc(50% - {{devide width 2}}px)">
          <div class="{{classes.popup__header}}">
              <div>{{title}}</div>
              <div name="close-button" class="{{classes.popup__close-button}}">X</div>
          </div>
          <div>
              {{{Input onChange=searchHandler name='nameInput' validFunc=validFunc}}}
              <div class="{{classes.create-chat-template__button}}">
                  {{{Button capture='Создать' onClick=createChat}}}
              </div>
          </div>
      </div>
  </div>`;
   }
}
