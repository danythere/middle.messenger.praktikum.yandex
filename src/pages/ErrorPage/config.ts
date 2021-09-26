import Heading from '../../components/base/Heading';
import classes from './errorPage.css';

const commonErrorConfig = {
   title: 'Произошла ошибка',
};
const notFoundErrorConfig = {
   title: '404',
};
export const commonConfig = {
   classes,
   image: 'error.svg',
   components: {
      headings: {
         heading: {
            config: commonErrorConfig,
            inst: new Heading(commonErrorConfig),
            template: null,
         },
      },
   },
};

export const notFoundConfig = {
   classes,
   image: '404-error.svg',
   components: {
      headings: {
         heading: {
            config: notFoundErrorConfig,
            inst: new Heading(notFoundErrorConfig),
            template: null,
         },
      },
   },
};
