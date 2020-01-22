"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shopping_1 = require("./apis/shopping");
const taxonomy_1 = require("./apis/taxonomy");
const constants_1 = require("./constants");
const PROD_ENV = 'PROD';
const SANDBOX_ENV = 'SANDBOX';
function applyMixins(derivedCtor, baseCtors) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
        });
    });
}
/**
 * Creates a eBay instance.
 *
 * @param {Object} options configuration options
 * @param {String} options.clientID Client Id/App id
 * @param {String} options.env Environment, defaults to PROD
 * @param {String} options.headers HTTP request headers
 * @constructor
 * @public
 */
class Ebay {
    constructor(options) {
        this.options = options;
        this.DEFAULT_CATEGORY_TREE = 'EBAY_US';
        if (!options.clientID)
            throw Error('Client ID is Missing\ncheck documentation to get Client ID http://developer.ebay.com/DevZone/account/');
        options.env = options.env || PROD_ENV;
        options.baseUrl = constants_1.PROD_BASE_URL;
        options.baseSvcUrl = constants_1.BASE_SVC_URL;
        if (options.env === SANDBOX_ENV) {
            options.baseUrl = constants_1.SANDBOX_BASE_URL;
            options.baseSvcUrl = constants_1.BASE_SANDBX_SVC_URL;
        }
        this.options = options;
        //setHeaders(this, options.headers);
        this.options.globalID = options.countryCode || 'EBAY-US';
    }
}
applyMixins(Ebay, [shopping_1.default, taxonomy_1.default]);
exports.default = Ebay;
