import DialogList from './blocks/DialogList';
import DialogScreen from './blocks/DialogScreen';
import classes from './chat.css';

const dialogListConfig = {};
const dialogScreenConfig = {};
export const config = {
   classes,
   components: {
      blocks: {
         dialogList: {
            config: dialogListConfig,
            inst: new DialogList(dialogListConfig),
            template: null,
         },
         dialogScreen: {
            config: dialogScreenConfig,
            inst: new DialogScreen(dialogScreenConfig),
            template: null,
         },
      },
   },
};
