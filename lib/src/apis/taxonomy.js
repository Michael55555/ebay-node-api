'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("../request");
const common_utils_1 = require("../common-utils");
class TaxonomyAPI {
    constructor(options) {
        this.options = options;
        this.DEFAULT_CATEGORY_TREE = 'EBAY_US';
    }
    /**
     * @method getDefaultCategoryTreeId {Function}
     * @param {String} marketPlaceId = default = EBAY_US
     */
    getDefaultCategoryTreeId(marketPlaceId = this.DEFAULT_CATEGORY_TREE) {
        marketPlaceId = common_utils_1.default.upperCase(marketPlaceId);
        this.options.access_token || this.showAccessTokenError();
        return request_1.makeRequest({
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
    getCategoryTree(categoryTreeId = 0) {
        this.options.access_token || this.showAccessTokenError();
        return request_1.makeRequest({
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
    getCategorySubtree(categoryTreeId = 0, categoryId) {
        if (!categoryId) {
            throw new Error('Missing Category id\n' +
                'Refer documentation here' +
                'https://developer.ebay.com/api-docs/commerce/taxonomy/resources/category_tree/methods/getCategorySubtree#h2-samples');
        }
        this.options.access_token || this.showAccessTokenError();
        return request_1.makeRequest({
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
    getCategorySuggestions(categoryTreeId = 0, keyword) {
        if (!keyword) {
            throw new Error('Missing keyword\n Refer documentation here https://developer.ebay.com/api-docs/commerce/taxonomy/resources/category_tree/methods/getCategorySuggestions');
        }
        this.options.access_token || this.showAccessTokenError();
        return request_1.makeRequest({
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
    getItemAspectsForCategory(categoryTreeId = 0, categoryId) {
        this.options.access_token || this.showAccessTokenError();
        return request_1.makeRequest({
            self: this.options,
            endpoint: `/commerce/taxonomy/v1_beta/category_tree/${categoryTreeId}/get_item_aspects_for_category?category_id=${categoryId}`,
            methodName: 'GET',
            token: 'Bearer ' + this.options.access_token
        }).then(JSON.parse);
    }
    showAccessTokenError() {
        throw new Error('Missing Access token, generate access token');
    }
}
exports.default = TaxonomyAPI;
