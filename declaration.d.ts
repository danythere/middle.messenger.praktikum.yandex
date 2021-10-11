declare module '*.hbs' {
   const content: () => string;
   export default content;
}

declare module '*.css' {
   const styles: { [className: string]: string };
   export default styles;
}

declare module 'handlebars/dist/handlebars.runtime';
