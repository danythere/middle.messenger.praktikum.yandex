import { expect, use } from 'chai';
import sinon, { SinonFakeXMLHttpRequest } from 'sinon';
import chaiAsPromised = require('chai-as-promised');
import Fetch from './Fetch';

const globalAny: any = global;
const fetch = new Fetch();
describe('Тестирование роутера.', () => {
   const requests: SinonFakeXMLHttpRequest[] = [];
   beforeEach(() => {
      globalAny.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
      const xhr = globalAny.XMLHttpRequest;
      use(chaiAsPromised);
      xhr.onCreate = (request: sinon.SinonFakeXMLHttpRequest) => {
         requests.push(request);
      };
   });

   afterEach(() => {
      globalAny.XMLHttpRequest.restore();
      requests.length = 0;
   });

   it('Метод POST.', () => {
      const data = { test: 1 };
      fetch.post('/test', { data: JSON.stringify(data) });
      expect(requests.length).to.eq(1);
      expect(requests[0].method).to.eq('POST');
      expect(requests[0].requestBody).to.eq(JSON.stringify(data));
   });

   it('Метод PUT.', () => {
      const data = { test: 1 };
      fetch.put('/test', { data: JSON.stringify(data) });
      expect(requests.length).to.eq(1);
      expect(requests[0].method).to.eq('PUT');
      expect(requests[0].requestBody).to.eq(JSON.stringify(data));
   });

   it('Метод DELETE.', () => {
      const data = { test: 1 };
      fetch.delete('/test', { data: JSON.stringify(data) });
      expect(requests.length).to.eq(1);
      expect(requests[0].method).to.eq('DELETE');
      expect(requests[0].requestBody).to.eq(JSON.stringify(data));
   });

   it('Метод GET.', () => {
      fetch.get('/test');
      expect(requests.length).to.eq(1);
      expect(requests[0].method).to.eq('GET');
   });

   it('Метод GET с данными.', () => {
      const data = { test: 1 };
      fetch.get('/test', { data });
      expect(requests.length).to.eq(1);
      expect(requests[0].method).to.eq('GET');
      expect(requests[0].url).to.eq('/test?test=1');
   });

   it('Метод GET с данными не в виде обьекта.', () => {
      const data = 3;
      /*
      assert.throw(() => fetch.get('/test', { data }), Error);
      */
      return expect(fetch.get('/test', { data })).to.be.rejectedWith(
         Error,
         'Data must be object',
      );
   });
});
