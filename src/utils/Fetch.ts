const METHODS = {
   GET: 'GET',
   POST: 'POST',
   PUT: 'PUT',
   DELETE: 'DELETE',
};

function queryStringify(data: XMLHttpRequestBodyInit) {
   if (typeof data !== 'object') {
      throw new Error('Data must be object');
   }
   const keys = Object.keys(data);
   return keys.reduce((result, key, index) => {
      return `${result}${key}=${data[key]}${
         index < keys.length - 1 ? '&' : ''
      }`;
   }, '?');
}

/**
 * Класс для запросов на сервер.
 */
export default class Fetch {
   get = (
      url: string,
      options: { [prop: string]: unknown } = {},
   ): Promise<XMLHttpRequest> => {
      return this.request(
         url,
         { ...options, method: METHODS.GET },
         options.timeout as number,
      );
   };

   post = (
      url: string,
      options: { [prop: string]: unknown } = {},
   ): Promise<XMLHttpRequest> => {
      return this.request(
         url,
         { ...options, method: METHODS.POST },
         options.timeout as number,
      );
   };

   put = (
      url: string,
      options: { [prop: string]: unknown } = {},
   ): Promise<XMLHttpRequest> => {
      return this.request(
         url,
         { ...options, method: METHODS.PUT },
         options.timeout as number,
      );
   };

   delete = (
      url: string,
      options: { [prop: string]: unknown } = {},
   ): Promise<XMLHttpRequest> => {
      return this.request(
         url,
         { ...options, method: METHODS.DELETE },
         options.timeout as number,
      );
   };

   request = (
      url: string,
      options: { [prop: string]: unknown } = {},
      timeout = 5000,
   ): Promise<XMLHttpRequest> => {
      const { headers = {}, method, data } = options;

      return new Promise((resolve, reject) => {
         if (!method) {
            reject(new Error('No method'));
            return;
         }

         const xhr = new XMLHttpRequest();
         const isGet = method === METHODS.GET;

         xhr.open(
            method as string,
            isGet && !!data ? `${url}${queryStringify(data)}` : url,
         );
         Object.keys(headers as Headers).forEach(key => {
            xhr.setRequestHeader(key, headers[key]);
         });

         xhr.onload = () => {
            resolve(xhr);
         };

         xhr.onabort = reject;
         xhr.onerror = reject;

         xhr.timeout = timeout;
         xhr.ontimeout = reject;
         xhr.withCredentials = true;
         if (isGet || !data) {
            xhr.send();
         } else {
            xhr.send(data);
         }
      });
   };
}
