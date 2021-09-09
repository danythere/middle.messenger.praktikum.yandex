import Handlebars from 'handlebars/dist/handlebars.runtime';

// Склеить класс и его постфикс.
export function registerHelpers() {
   Handlebars.registerHelper(
      'getClass',
      function (someClass, postfix, classes) {
         return classes[someClass + postfix];
      },
   );

   // Склейка нескольких классов.
   /* Handlebars.registerHelper("glueClasses", function (...array) {
     const result = array.reduce(function (accumulator, elem) {
       return typeof elem === "string" ? accumulator + ` ${elem}` : accumulator;
     }, "");
     return result;
   }) */
}

export function getInputConfig(type, capture, name, id, width, height): object {
   return {
      type,
      capture,
      name,
      id,
      width,
      height,
   };
}
