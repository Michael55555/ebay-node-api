import Ebay from '../src/index';
import { EbayOptions } from '../src/typings';

describe('check all the options provided is valid or not - Ebay Constructor ', () => {
  it('should check if the options are provided or not', () => {
    expect(() => {
      new Ebay(<EbayOptions>undefined);
    }).toThrow(
      'Options are missing. Please provide an object to the constructor.'
    );
  });

  it('should apply the options', () => {
    let ebayApi = new Ebay(<EbayOptions>{
      clientID: '12345',
      clientSecret: '54321'
    });
    expect(ebayApi.options).toHaveProperty('clientID');
    expect(ebayApi.options).toHaveProperty('clientSecret');
  });

  it('should require the clientID and Secret', () => {
    const expectedErrorMsg =
      'The "clientID" or "clientSecret" property is missing on the provided options, make sure you specify those.';
    expect(() => new Ebay(<EbayOptions>{})).toThrow(expectedErrorMsg);
    expect(() => new Ebay(<EbayOptions>{ clientID: '1234' })).toThrow(
      expectedErrorMsg
    );
  });

  it('check instance of Ebay', () => {
    let ebayApi = new Ebay(<EbayOptions>{
      clientID: '12345',
      clientSecret: '54321'
    });
    expect(ebayApi).toBeInstanceOf(Ebay);
  });
});
