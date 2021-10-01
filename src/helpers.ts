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
   Handlebars.registerHelper(
      'devide',
      (left: number, right: number): number => {
         return left / right;
      },
   );

   Handlebars.registerHelper(
      'getDataByColumns',
      (data: object[], columns: object[]): number => {
         const res = data.reduce((acc, cur, ind) => {
            const row = [];
            columns.forEach(column => {
               row.push(cur[column.displayProperty]);
            });
            acc.push(row);
            return acc;
         }, []);
         return res;
      },
   );
}
