"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const build_url_1 = require("../build-url");
const request_1 = require("../request");
const FIND_ITEMS_BY_KEYWORD = 'findItemsByKeywords';
const FIND_ITEMS_BY_CATEGORY = 'findItemsByCategory';
const FIND_COMPLETED_ITEMS = 'findCompletedItems';
const FIND_ITEMS_ADV = 'findItemsAdvanced';
class FindingAPI {
    constructor(options) {
        this.options = options;
    }
    findItemsByKeywords(options) {
        if (!options) {
            throw new Error('INVALID_REQUEST_PARMS --> Keyword is missing, Keyword is required');
        }
        this.options.operationName = FIND_ITEMS_BY_KEYWORD;
        this.options.param = 'keywords';
        // support only keyword string.
        if (!options.keywords) {
            this.options.name = options;
        }
        this.options.additionalParam = FindingAPI.constructAdditionalParams(options);
        const url = build_url_1.default.buildSearchUrl(this.options);
        return request_1.getRequest(url).then(data => {
            return JSON.parse(data).findItemsByKeywordsResponse;
        }, console.error);
    }
    ;
    findItemsByCategory(categoryID) {
        if (!categoryID)
            throw new Error('INVALID_REQUEST_PARMS --> Category ID is null or invalid');
        this.options.name = categoryID;
        this.options.operationName = FIND_ITEMS_BY_CATEGORY;
        this.options.param = 'categoryId';
        const url = build_url_1.default.buildSearchUrl(this.options);
        return request_1.getRequest(url).then(data => {
            return JSON.parse(data).findItemsByCategoryResponse;
        }, console.error);
    }
    ;
    /**
     * searches for items whose listings are completed and are no longer available for
     * sale by category (using categoryId), by keywords (using keywords), or a combination of the two.
     * @param {Object} options
     */
    findCompletedItems(options) {
        if (!options)
            throw new Error('INVALID_REQUEST_PARMS --> Keyword or category ID are required.');
        if (!options.keywords && !options.categoryId)
            throw new Error('Keyword or category ID are required.');
        if (options.keywords) {
            options.keywords = encodeURIComponent(options.keywords);
        }
        this.options.operationName = FIND_COMPLETED_ITEMS;
        this.options.additionalParam = FindingAPI.constructAdditionalParams(options);
        const url = build_url_1.default.buildSearchUrl(this.options);
        return request_1.getRequest(url).then(data => {
            return JSON.parse(data).findCompletedItemsResponse;
        }, console.error);
    }
    ;
    /**
     * searches for items whose listings are completed and are no longer available for
     * sale by category (using categoryId), by keywords (using keywords), or a combination of the two.
     * @param {Object} options
     */
    findItemsAdvanced(options) {
        if (!options)
            throw new Error('INVALID_REQUEST_PARMS --> check here for input fields https://developer.ebay.com/DevZone/finding/CallRef/findItemsAdvanced.html#Input');
        if (options.keywords) {
            options.keywords = encodeURIComponent(options.keywords);
        }
        this.options.operationName = FIND_ITEMS_ADV;
        this.options.additionalParam = FindingAPI.constructAdditionalParams(options);
        const url = build_url_1.default.buildSearchUrl(this.options);
        return request_1.getRequest(url).then(data => {
            return JSON.parse(data).findItemsAdvancedResponse;
        }, console.error);
    }
    ;
    getVersion() {
        this.options.operationName = 'getVersion';
        const url = build_url_1.default.buildSearchUrl(this.options);
        return request_1.getRequest(url).then(data => {
            return JSON.parse(data).getVersionResponse[0];
        }, console.error);
    }
    ;
    /**
     * Searches for items on eBay using specific eBay product values.
     * @param {Object} options
     */
    findItemsByProduct(options) {
        let type = options.type || 'ReferenceID';
        this.options.operationName = 'findItemsByProduct';
        this.options.additionalParam = FindingAPI.constructAdditionalParams(options);
        let url = build_url_1.default.buildSearchUrl(this.options);
        url = `${url}&productId.@type=${type}`;
        return request_1.getRequest(url).then(data => {
            return JSON.parse(data).findItemsByProductResponse;
        }, console.error);
    }
    /**
     * Constructs query param based on some logic to support filter and aspect_filter params.
     *
     * ```output will be keywords=iphone&itemFilter(0).name=Condition&itemFilter(0).value=3000&itemFilter(1).name=FreeShippingOnly&itemFilter(1).value=true```
     * @param {Object} options
     */
    static constructAdditionalParams(options) {
        let params = '';
        let count = 0;
        for (let key in options) {
            if (options.hasOwnProperty(key))
                continue;
            if (key === 'entriesPerPage' || key === 'pageNumber') {
                params = `${params}paginationInput.${key}=${options[key]}&`;
            }
            else if (['keywords', 'categoryId', 'productId', 'sortOrder'].includes(key)) {
                params = `${params}${key}=${options[key]}&`;
            }
            else if (key === 'affiliate') {
                const innerParams = options[key];
                for (let innerKey in innerParams) {
                    params = `${params}${key}.${innerKey}=${innerParams[innerKey]}&`;
                }
            }
            else {
                params = `${params}itemFilter(${count}).name=${key}&itemFilter(${count}).value=${options[key]}&`;
                count += 1;
            }
        }
        // replace extra space
        params = params.replace(/\s/g, '');
        return params.substring(0, params.length - 1);
    }
    ;
}
exports.default = FindingAPI;
