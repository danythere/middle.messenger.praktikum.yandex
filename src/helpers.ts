import Handlebars from 'handlebars/dist/handlebars.runtime';

// Склеить класс и его постфикс.
export function registerHelpers(): void {
   Handlebars.registerHelper(
      'getClass',
      (
         someClass: string,
         postfix: string,
         classes: { [className: string]: string },
      ): string => {
         return classes[someClass + postfix];
      },
   );
}
