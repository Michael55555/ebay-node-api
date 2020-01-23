import type { EbayOptions } from "../src/typings";

import * as nock from 'nock';
import Ebay from '../src/index';

describe('Test find items by keyword method', () => {
  beforeEach(() => {
    nock('http://svcs.ebay.com')
      .get('/services/search/FindingService/v1')
      .query({
        'SECURITY-APPNAME': 'ClientId',
        'OPERATION-NAME': 'findItemsByKeywords',
        'SERVICE-VERSION': '1.0.0',
        'RESPONSE-DATA-FORMAT': 'JSON',
        keywords: 'iphone',
        'GLOBAL-ID': 'EBAY-US'
      })
      .reply(200, {
        access_token: 'abcd'
      });
  });

  it('test input parameter in findItemsByKeyword method', () => {
    let ebay = new Ebay(<EbayOptions>{
      clientID: '12345', clientSecret:'54321'
    });
    expect(() => {
      ebay.findItemsByKeywords(undefined);
    }).toThrow('Keyword is missing, Keyword is required');
  });
});
