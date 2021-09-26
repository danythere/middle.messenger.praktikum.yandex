import classes from './dialogPreview.css';
import Avatar from '../../../../components/base/Avatar';

export const getConfig = ({
   avatarConfig,
   authorName,
   number,
   message,
   time,
}: {
   avatarConfig: { [props: string]: unknown };
   authorName: string;
   number: number;
   message: string;
   time: string;
}): { [props: string]: unknown } => ({
   classes,
   authorName,
   number,
   time,
   message,
   components: {
      avatars: {
         user: {
            inst: new Avatar(avatarConfig),
            config: avatarConfig,
            template: null,
         },
      },
   },
});
