import Block from 'components/base/Block';

function isEqual(lhs: string, rhs: string): boolean {
   return lhs === rhs;
}

function render<T extends Block>(
   query: string,
   block: T | null,
): Element | null {
   const root = document.querySelector(query);
   if (block) {
      while (root?.firstChild) {
         root?.removeChild(root.firstChild);
      }
      const content = block.getContent();
      if (content) {
         root?.appendChild(content);
      }
   }
   return root;
}

export default class Route<T extends Block> {
   private _pathname: string;

   private _block: T | null;

   private _blockClass: new (props: any) => T;

   private _props: { rootQuery: string };

   constructor(
      pathname: string,
      view: new (props: any) => T,
      props: { rootQuery: string },
   ) {
      this._pathname = pathname;
      this._blockClass = view;
      this._block = null;
      this._props = props;
   }

   navigate(pathname: string): void {
      if (this.match(pathname)) {
         this._pathname = pathname;
         this.render();
      }
   }

   match(pathname: string): boolean {
      return isEqual(pathname, this._pathname);
   }

   render(): void {
      this._block = new this._blockClass({});
      render(this._props.rootQuery, this._block);
   }
}
