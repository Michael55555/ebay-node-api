'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("../request");
const index_1 = require("../common-utils/index");
const constants_1 = require("../constants");
//https://developer.ebay.com/devzone/merchandising/docs/CallRef/getMostWatchedItems.html#Samples
class MerchandisingAPI {
    constructor(options) {
        this.options = options;
    }
    /**
     * @method getMostWatchedItems {Function}
     * Add interest and excitement for buyers by showing them what other people are watching.
     * @param {String} categoryId (optional)
     */
    getMostWatchedItems(merchOptions) {
        if (!this.options.clientID)
            throw new Error('Missing App id or client id');
        const url = index_1.default.parseObj(merchOptions);
        return request_1.getRequest(`http://${this.options.baseSvcUrl}/${constants_1.MERCH_SRVC_NAME}?OPERATION-NAME=getMostWatchedItems&SERVICE-NAME=${constants_1.MERCH_SRVC_NAME}&SERVICE-VERSION=1.1.0&CONSUMER-ID=${this.options.clientID}&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD${url}`)
            .then(JSON.parse)
            .catch(console.log);
    }
    /**
     * @method getSimilarItems {Function}
     * Gets similar Items based on the Item id provided.
     * @param {String} categoryId (optional)
     */
    getSimilarItems(merchOptions) {
        if (!this.options.clientID)
            throw new Error('Missing App id or client id');
        const url = index_1.default.parseObj(merchOptions);
        console.log(`http://${this.options.baseSvcUrl}/${constants_1.MERCH_SRVC_NAME}?OPERATION-NAME=getSimilarItems&SERVICE-NAME=${constants_1.MERCH_SRVC_NAME}&SERVICE-VERSION=1.1.0&CONSUMER-ID=${this.options.clientID}&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD${url}`);
        return request_1.getRequest(`http://${this.options.baseSvcUrl}/${constants_1.MERCH_SRVC_NAME}?OPERATION-NAME=getSimilarItems&SERVICE-NAME=${constants_1.MERCH_SRVC_NAME}&SERVICE-VERSION=1.1.0&CONSUMER-ID=${this.options.clientID}&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD${url}`)
            .then(JSON.parse)
            .catch(console.log);
    }
    ;
}
exports.default = MerchandisingAPI;
