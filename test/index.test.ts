import Ebay from '../src/index';
import type { EbayOptions } from '../src/typings';

describe('check all the options provided is valid or not - Ebay Constructor ', () => {
  it('check input is provided or not', () => {
    expect(() => {
      new Ebay(<EbayOptions>{});
    }).to.throw('Options is missing, please provide the input');
  });

  it('should have client ID', () => {
    let ebayApi = new Ebay({ clientID: '12345' });
    ebayApi.options.should.have.property('clientID');
  });

  it('should not have client ID', () => {
    expect(() => {
      new Ebay({});
    }).to.throw(
      'Client ID is Missing\ncheck documentation to get Client ID http://developer.ebay.com/DevZone/account/'
    );
  });

  it('check instance of Ebay', () => {
    let ebayApi = new Ebay({ clientID: '12345' });
    expect(ebayApi).to.be.a.instanceOf(Ebay);
  });
});
