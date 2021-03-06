import Handlebars from 'handlebars';
import { ClassesType } from './components/types';
import Block from './components/base/Block';

// Склеить класс и его постфикс.
export function registerHelpers(): void {
   Handlebars.registerHelper(
      'getClass',
      (someClass: string, postfix: string, classes: ClassesType): string => {
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
      (
         data: { [props: string]: unknown }[],
         columns: { displayProperty: string }[],
      ): unknown[] => {
         const res = data.reduce((acc: unknown[], cur) => {
            const row: unknown[] = [];
            columns.forEach(column => {
               row.push(cur[column.displayProperty]);
            });
            acc.push(row);
            return acc;
         }, []);
         return res;
      },
   );

   Handlebars.registerHelper(
      'getValueFromObject',
      (object: { [key: string]: unknown }, key: string): unknown => {
         return object[key];
      },
   );

   Handlebars.registerHelper('reverse', (array: unknown[]) => {
      if (Array.isArray(array)) {
         const newArray = [...array];
         newArray.reverse();
         return newArray;
      }
      return array;
   });

   Handlebars.registerHelper(
      'equalPrimitive',
      (first: unknown, second: unknown): boolean => {
         return first === second;
      },
   );
}

export function registerComponent(
   Component: typeof Block,
   name?: string,
): void {
   Handlebars.registerHelper(
      name || (Component.regName as string),
      function buildBlock({
         hash,
         data,
      }: {
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         hash: any;
         data: { root: { children: { [prop: string]: Block } } };
      }) {
         if (!data.root.children) {
            // eslint-disable-next-line no-param-reassign
            data.root.children = {};
         }
         const { children } = data.root;

         const component = new Component(hash);

         children[component.id] = component;

         return `<div data-id="${component.id}"></div>`;
      },
   );
}
