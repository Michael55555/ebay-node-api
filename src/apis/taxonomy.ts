'use strict';
import { makeRequest } from '../request';
import CommonUtils from '../common-utils';
import type { EbayOptions } from '../typings/index';

export default class TaxonomyAPI {
  DEFAULT_CATEGORY_TREE = 'EBAY_US';

  constructor(public options: EbayOptions) {}

  /**
   * @method getDefaultCategoryTreeId {Function}
   * @param {String} marketPlaceId = default = EBAY_US
   */
  getDefaultCategoryTreeId(marketPlaceId: string = this.DEFAULT_CATEGORY_TREE) {
    marketPlaceId = <string>CommonUtils.upperCase(marketPlaceId);

    this.options.access_token || this.showAccessTokenError();

    return makeRequest({
      self: this.options,
      endpoint: `/commerce/taxonomy/v1_beta/get_default_category_tree_id?marketplace_id=${marketPlaceId}`,
      methodName: 'GET',
      token: 'Bearer ' + this.options.access_token
    }).then(JSON.parse);
  }

  /**
   * @method getCategoryTree {Function}
   * @param {Integer} categoryTreeId = default = 0
   */
  getCategoryTree(categoryTreeId: number = 0) {
    this.options.access_token || this.showAccessTokenError();

    return makeRequest({
      self: this.options,
      endpoint: `/commerce/taxonomy/v1_beta/category_tree/${categoryTreeId}`,
      methodName: 'GET',
      token: `Bearer ${this.options.access_token}`
    }).then(JSON.parse);
  }

  /**
   * @method getCategorySubtree {Function}
   * @param {String} categoryId = identifier of the category at the top of the subtree.
   * @param {String} categoryTreeId = The unique identifier of the eBay category tree from which a category subtree is being requested.
   */

  getCategorySubtree(categoryTreeId: number = 0, categoryId: number) {
    if (!categoryId) {
      throw new Error(
        'Missing Category id\n' +
          'Refer documentation here' +
          'https://developer.ebay.com/api-docs/commerce/taxonomy/resources/category_tree/methods/getCategorySubtree#h2-samples'
      );
    }
    this.options.access_token || this.showAccessTokenError();

    return makeRequest({
      self: this.options,
      endpoint: `/commerce/taxonomy/v1_beta/category_tree/${categoryTreeId}/get_category_subtree?category_id=${categoryId}`,
      methodName: 'GET',
      token: 'Bearer ' + this.options.access_token
    }).then(JSON.parse);
  }

  /**
   * @method getCategorySuggestions {Function}
   * @param {String} categoryTreeId = identifier of the category at the top of the subtree.
   * @param {String} keyword = input string to get CategorySuggestions.
   */

  getCategorySuggestions(categoryTreeId: number = 0, keyword: any) {
    if (!keyword) {
      throw new Error(
        'Missing keyword\n Refer documentation here https://developer.ebay.com/api-docs/commerce/taxonomy/resources/category_tree/methods/getCategorySuggestions'
      );
    }
    this.options.access_token || this.showAccessTokenError();

    return makeRequest({
      self: this.options,
      endpoint: `/commerce/taxonomy/v1_beta/category_tree/${categoryTreeId}/get_category_suggestions?q=${keyword}`,
      methodName: 'GET',
      token: 'Bearer ' + this.options.access_token
    }).then(JSON.parse);
  }

  /**
   * @method getItemAspectsForCategory {Function}
   * @param {String} categoryId = identifier of the category at the top of the subtree.
   * @param {String} keyword = input string to get CategorySuggestions.
   */
  getItemAspectsForCategory(categoryTreeId: number = 0, categoryId: number) {
    this.options.access_token || this.showAccessTokenError();
    return makeRequest({
      self: this.options,
      endpoint: `/commerce/taxonomy/v1_beta/category_tree/${categoryTreeId}/get_item_aspects_for_category?category_id=${categoryId}`,
      methodName: 'GET',
      token: 'Bearer ' + this.options.access_token
    }).then(JSON.parse);
  }

  private showAccessTokenError() {
    throw new Error('Missing Access token, generate access token');
  }
}
