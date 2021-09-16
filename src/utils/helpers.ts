import Block from '../components/mvc/Block';
import IComponentConfig from '../components/interfaces';

/**
 * Генерация компонента с вставкой в него дочерних.
 * @returns
 */
const genUuid = () => `id${Math.random().toString(16).slice(2)}`;

export default function compile(
   tmpl: (...args: [unknown]) => string,
   context: { [prop: string]: any },
): HTMLTemplateElement {
   const fragment = document.createElement('template');
   const components: { [id: string]: Block } = {};
   if (context?.components) {
      Object.entries(context.components).forEach(([folderKey, folder]) => {
         Object.entries(folder as { [prop: string]: unknown }).forEach(
            ([key, value]: [string, IComponentConfig]) => {
               const id = genUuid();
               components[id] = value.inst;
               context.components[folderKey][
                  key
               ].template = `<div id="${id}"></div>`;
            },
         );
      });
   }
   fragment.innerHTML = tmpl(context);
   Object.entries(components).forEach(([id, component]) => {
      const stub = fragment.content.querySelector(`#${id}`);
      if (stub) {
         stub.replaceWith(component.getContent() as Node); // render должен вернуть HTMLElement
      }
   });
   return fragment;
}
