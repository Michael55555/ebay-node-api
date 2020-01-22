import { getRequest } from '../request';
import urlObject from '../build-url';
const makeString = require('make-string');

import type { EbayOptions } from '../typings';

export default class ShoppingApi {
  constructor(public options: EbayOptions) {}

  getAllCategories(categoryID: any) {
    this.options.name = categoryID ? categoryID : -1;
    this.options.operationName = 'GetCategoryInfo';
    this.options.param = 'CategoryID';

    const url = urlObject.buildShoppingUrl(this.options);

    return getRequest(url).then(JSON.parse, console.error);
  }

  getUserDetails(input: { userId: any; details: any }) {
    if (!input || typeof input !== 'object') throw new Error('Invalid input');
    if (!input.userId) throw new Error('Invalid Input, UserId is required');

    this.options.operationName = 'GetUserProfile';
    this.options.param = 'UserID';
    this.options.name = input.userId;
    this.options.includeSelector = input.details ? 'Details' : null;

    const url = urlObject.buildShoppingUrl(this.options);

    return getRequest(url).then(data => {
      return JSON.parse(data);
    }, console.error);
  }

  getItemStatus(itemIds: any) {
    if (!itemIds) throw new Error('User ID is null or invalid');

    this.options.operationName = 'GetItemStatus';
    this.options.param = 'ItemID';
    this.options.name = makeString(itemIds, { braces: 'false', quotes: 'no' });

    const url = urlObject.buildShoppingUrl(this.options);

    return getRequest(url).then(JSON.parse, console.error);
  }

  getShippingCosts({
    itemId,
    destCountryCode,
    destPostalCode
  }: {
    itemId: any;
    destCountryCode: string;
    destPostalCode: string;
  }) {
    if (!itemId) throw new Error('Item ID is null or invalid');

    this.options.operationName = 'GetShippingCosts';
    this.options.param = 'ItemID';
    this.options.name = itemId;

    const countryCodeParam = destCountryCode
      ? '&DestinationCountryCode=' + destCountryCode
      : '';
    const postalCodeParam = destPostalCode
      ? '&DestinationPostalCode=' + destPostalCode
      : '';
    const params = countryCodeParam + postalCodeParam;
    let url = urlObject.buildShoppingUrl(this.options);
    url += params;

    return getRequest(url).then(JSON.parse, console.error);
  }
}
