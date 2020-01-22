"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const request_1 = require("../request");
const common_utils_1 = require("../common-utils");
const makeString = require('make-string');
class BuyAPI {
    constructor(options) {
        this.options = options;
    }
    async getItem(itemId) {
        if (!itemId)
            throw new Error('Item Id is required');
        if (!this.options.access_token)
            throw new Error('Missing Access token, Generate access token');
        this.options.contentType = 'application/json';
        const result = await request_1.makeRequest({
            self: this.options,
            endpoint: `/buy/browse/v1/item/${encodeURIComponent(itemId)}`,
            methodName: 'GET',
            token: 'Bearer ' + this.options.access_token
        });
        return JSON.parse(result);
    }
    ;
    async getItemByLegacyId({ legacyItemId, legacyVariationSku }) {
        if (!this.options.access_token)
            throw new Error('Missing Access token, Generate access token');
        if (!legacyItemId)
            throw new Error('Legacy Item Id is required');
        let params = `legacy_item_id=${legacyItemId}${legacyVariationSku ? '&legacy_variation_sku=' + legacyVariationSku : ''}`;
        this.options.contentType = 'application/json';
        const res = await request_1.makeRequest({
            self: this.options,
            endpoint: `/buy/browse/v1/item/get_item_by_legacy_id?${params}`,
            methodName: 'GET',
            token: `Bearer ${this.options.access_token}`
        });
        return JSON.parse(res);
    }
    ;
    getItemByItemGroup(itemGroupId) {
        if (typeof itemGroupId === 'object')
            throw new Error('Expecting String or number (Item group id)');
        if (!itemGroupId)
            throw new Error('Error Item Group ID is required');
        if (!this.options.access_token)
            throw new Error('Missing Access token, Generate access token');
        this.options.contentType = 'application/json';
        return request_1.makeRequest({
            self: this.options,
            endpoint: `/buy/browse/v1/item/get_items_by_item_group?item_group_id=${itemGroupId}`,
            methodName: 'GET',
            token: 'Bearer ' + this.options.access_token
        });
    }
    ;
    searchItems({ categoryId, gtin, keyword, limit, offset, sort, fieldgroups, filter, aspect_filter }) {
        //   if (!searchConfig)
        //     throw new Error("Missing or invalid input parameter to search");
        if (!keyword && !categoryId && !gtin)
            throw new Error('Keyword or category id is required in query param');
        if (!this.options.access_token)
            throw new Error('Missing Access token, Generate access token');
        const auth = 'Bearer ' + this.options.access_token;
        let queryParam = keyword ? 'q=' + encodeURIComponent(keyword) : '';
        queryParam += gtin ? '&gtin=' + gtin : '';
        queryParam += categoryId ? '&category_ids=' + categoryId : '';
        queryParam += limit ? '&limit=' + limit : '';
        queryParam += offset ? '&offset=' + offset : '';
        queryParam += sort ? '&sort=' + sort : '';
        queryParam += fieldgroups !== undefined ? '&fieldgroups=' + fieldgroups : '';
        if (filter !== undefined)
            queryParam +=
                '&filter=' +
                    common_utils_1.default.encodeURLQuery(makeString(filter, { quotes: 'no', braces: 'false' }));
        queryParam += aspect_filter
            ? '&aspect_filter=' +
                common_utils_1.default.encodeURLQuery(makeString(aspect_filter, {
                    quotes: 'no',
                    braces: 'false'
                }))
            : '';
        this.options.contentType = 'application/json';
        return request_1.makeRequest({
            self: this.options,
            endpoint: `/buy/browse/v1/item_summary/search?${queryParam}`,
            methodName: 'GET',
            token: auth
        });
    }
    ;
    searchByImage(searchConfig) {
        if (!searchConfig)
            throw new Error('INVALID_REQUEST_PARMS --> Missing or invalid input parameter to search by image');
        if (!this.options.access_token)
            throw new Error('INVALID_AUTH_TOKEN --> Missing Access token, Generate access token');
        if (!searchConfig.imgPath && !searchConfig.base64Image)
            throw new Error('REQUIRED_PARAMS --> imgPath or base64Image is required');
        const auth = 'Bearer ' + this.options.access_token;
        const encodeImage = searchConfig.imgPath
            ? common_utils_1.default.base64Encode(fs.readFileSync(searchConfig.imgPath))
            : searchConfig.base64Image;
        this.options.data = JSON.stringify({ image: encodeImage });
        this.options.contentType = 'application/json';
        const queryString = makeString(searchConfig, {
            quotes: 'no',
            braces: 'false',
            seperator: '&',
            assignment: '='
        });
        return request_1.makeRequest({
            self: this.options,
            endpoint: `/buy/browse/v1/item_summary/search_by_image?${queryString}`,
            methodName: 'POST',
            token: auth
        });
    }
    ;
}
exports.default = BuyAPI;
