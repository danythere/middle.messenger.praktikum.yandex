import Block from 'components/base/Block';

function isEqual(lhs: string, rhs: string): boolean {
   return lhs === rhs;
}

function render(query: string, block: Block | null): Element | null {
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

export default class Route {
   private _pathname: string;

   private _block: Block | null;

   private _blockClass: new (props: any) => Block;

   private _props: { rootQuery: string };

   constructor(
      pathname: string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      view: new (props: any) => Block,
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

   public get blockClass(): new (props: any) => Block {
      return this._blockClass;
   }
}
