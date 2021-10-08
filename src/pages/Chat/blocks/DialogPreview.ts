import Block from '../../../components/base/Block';
import classes from './DialogPreview/dialogPreview.css';
import { DefaultPropsType } from '../../../components/types';

/**
 * Блок диалога, отображаемый в ленте диалогов.
 */
export default class DialogPreview extends Block {
   constructor(props: DefaultPropsType) {
      super('div', { ...props });
   }

   getStateFromProps(): void {
      this.state = {
         classes,
      };
   }

   componentAfterRender(): void {
      this.getContent()?.addEventListener(
         'click',
         this.props.onChoose.bind(null, this.props.data),
      );
   }

   render(): string {
      return `<div class="{{classes.dialog-preview}} {{getClass 'dialog-preview_' style classes}}">
    <div class="{{classes.dialog-preview__left}}">
    <div class="{{classes.dialog-preview__avatar}}">
       {{{Avatar}}}
       </div>
       <div>
          <div class="{{classes.dialog-preview__author-name}}">
             {{data.title}}
          </div>
          <div class="{{classes.dialog-preview__message}}">
          {{#if data.last_message}}
            <small><span class="{{classes.dialog-preview__author}}">{{data.last_message.user.login}}</span>:{{data.last_message.content}}</small>
         {{/if}}
          </div>
       </div>
    </div>
    <div class="{{classes.dialog-preview__right}}">
       <div class="{{classes.dialog-preview__time}}">{{time}}</div>
       <div>{{data.unread_count}}</div>
    </div>
 </div>`;
   }
}
