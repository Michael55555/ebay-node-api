import { buildSearchUrl, buildShoppingUrl } from '../src/build-url';
import type { EbayOptions } from '../src/typings';
import { expect } from 'chai';
import 'mocha';

describe('test building url methods', () => {
  it('test search url', () => {
    const expectedSearchUrl =
      'https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=testID&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&keywords=iphone&outputSelector(0)=SellerInfo&paginationInput.entriesPerPage=6&GLOBAL-ID=EBAY-US';
    const options = {
      name: 'iphone',
      operationName: 'findItemsByKeywords',
      param: 'keywords',
      clientID: 'testID',
      limit: 6,
      globalID: 'EBAY-US',
      baseSvcUrl: 'svcs.ebay.com'
    };
    expect(buildSearchUrl(<EbayOptions>options)).to.be.equal(expectedSearchUrl);
  });

  it('test Shopping url without selector', () => {
    let expectedSearchUrl =
      'https://open.api.ebay.com/Shopping?appid=testID&callname=demoShoppingName&version=967&siteid=0&responseencoding=JSON&keywords=iphone';
    let options = {
      name: 'iphone',
      operationName: 'demoShoppingName',
      param: 'keywords',
      clientID: 'testID',
      baseUrl: 'open.api.ebay.com'
    };
    expect(buildShoppingUrl(<EbayOptions>options)).to.be.equal(
      expectedSearchUrl
    );
  });

  it('test Shopping url including selector', () => {
    let expectedSearchUrl =
      'https://open.api.ebay.com/Shopping?appid=testID&callname=demoShoppingName&version=967&siteid=0&responseencoding=JSON&keywords=iphone&IncludeSelector=true';
    let options = {
      name: 'iphone',
      operationName: 'demoShoppingName',
      param: 'keywords',
      clientID: 'testID',
      includeSelector: true,
      baseUrl: 'open.api.ebay.com'
    };
    expect(buildShoppingUrl(<EbayOptions>options)).to.be.equal(
      expectedSearchUrl
    );
  });
});
