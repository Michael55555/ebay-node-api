'use strict';
import { expect } from 'chai';
import CommonUtils from '../src/common-utils/index';

describe('test common util methods', () => {
  it('test parse object to query params', () => {
    const expectedParam =
      '&keywords=iphone&categoryId=111&sortOrder=PricePlusShippingLowest';
    const options = {
      keywords: 'iphone',
      categoryId: '111',
      sortOrder: 'PricePlusShippingLowest'
    };
    const emptyOptions = {};
    expect(CommonUtils.parseObj(options)).to.be.equal(expectedParam);
    expect(CommonUtils.parseObj(emptyOptions)).to.be.equal('');
    expect(CommonUtils.parseObj(options, 'userName=ebay')).to.be.equal(
      `userName=ebay${expectedParam}`
    );
  });
});
