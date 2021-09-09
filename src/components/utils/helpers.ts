export default function compile(tmpl, context) {
   const fragment = document.createElement('template');
   const components = {};
   if (context.components) {
      Object.entries(context.components).forEach(([key, value]) => {
         const id = genUuid();
         components[id] = value.inst;
         context.components[key].template = `<div id="${id}"></div>`;
      });
   }
   fragment.innerHTML = tmpl(context);
   Object.entries(components).forEach(([id, component]) => {
      const stub = fragment.content.querySelector(`#${id}`);
      stub.replaceWith(component.getContent()); // render должен вернуть HTMLElement
   });
   return fragment;
}

const genUuid = () => `id${Math.random().toString(16).slice(2)}`;
