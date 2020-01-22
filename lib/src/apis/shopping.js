"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("../request");
const build_url_1 = require("../build-url");
const makeString = require('make-string');
class ShoppingApi {
    constructor(options) {
        this.options = options;
    }
    getAllCategories(categoryID) {
        this.options.name = categoryID ? categoryID : -1;
        this.options.operationName = 'GetCategoryInfo';
        this.options.param = 'CategoryID';
        const url = build_url_1.default.buildShoppingUrl(this.options);
        return request_1.getRequest(url).then(JSON.parse, console.error);
    }
    getUserDetails(input) {
        if (!input || typeof input !== 'object')
            throw new Error('Invalid input');
        if (!input.userId)
            throw new Error('Invalid Input, UserId is required');
        this.options.operationName = 'GetUserProfile';
        this.options.param = 'UserID';
        this.options.name = input.userId;
        this.options.includeSelector = input.details ? 'Details' : null;
        const url = build_url_1.default.buildShoppingUrl(this.options);
        return request_1.getRequest(url).then(data => {
            return JSON.parse(data);
        }, console.error);
    }
    getItemStatus(itemIds) {
        if (!itemIds)
            throw new Error('User ID is null or invalid');
        this.options.operationName = 'GetItemStatus';
        this.options.param = 'ItemID';
        this.options.name = makeString(itemIds, { braces: 'false', quotes: 'no' });
        const url = build_url_1.default.buildShoppingUrl(this.options);
        return request_1.getRequest(url).then(JSON.parse, console.error);
    }
    getShippingCosts({ itemId, destCountryCode, destPostalCode }) {
        if (!itemId)
            throw new Error('Item ID is null or invalid');
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
        let url = build_url_1.default.buildShoppingUrl(this.options);
        url += params;
        return request_1.getRequest(url).then(JSON.parse, console.error);
    }
}
exports.default = ShoppingApi;
