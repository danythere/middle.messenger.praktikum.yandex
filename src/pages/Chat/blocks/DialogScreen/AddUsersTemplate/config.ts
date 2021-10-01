import List from '../../../../../components/base/List';
import Input from '../../../../../components/base/Input';
import Controller from '../../../../../api/Controller';

export const getConfig = eventHandlers => ({
   users: [],
   components: {
      inputs: {
         search: {
            config: {
               type: 'text',
               placeholder: 'Поиск...',
               name: 'search',
               background: 'gray',
               width: 300,
               height: 30,
               style: 'rounded',
               eventHandlers: {
                  onChange: eventHandlers.searchHandler,
               },
            },
            inst: new Input({
               type: 'text',
               placeholder: 'Поиск...',
               name: 'search',
               background: 'gray',
               width: 300,
               height: 30,
               style: 'rounded',
               eventHandlers: {
                  onChange: eventHandlers.searchHandler,
               },
            }),
            template: null,
         },
      },
      list: {
         users: {
            config: {},
            inst: new List({
               source: new Controller().searchUsers,
               searchStringKey: 'login',
               searchString: '',
               keyProperty: 'login',
               onItemClick: eventHandlers.onListItemClick,
               columns: [
                  {
                     displayProperty: 'first_name',
                  },
                  {
                     displayProperty: 'second_name',
                  },
               ],
            }),
            template: null,
         },
      },
   },
});
