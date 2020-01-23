import ShoppingApi from './apis/shopping';
import TaxonomyApi from './apis/taxonomy';
import FindingAPI  from './apis/finding';
import {
  PROD_BASE_URL,
  SANDBOX_BASE_URL,
  BASE_SANDBX_SVC_URL,
  BASE_SVC_URL
} from './constants';
import type { EbayOptions } from './typings';
const PROD_ENV = 'PROD';
const SANDBOX_ENV = 'SANDBOX';

function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        <PropertyDescriptor>Object.getOwnPropertyDescriptor(baseCtor.prototype, name)
      );
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
class Ebay implements ShoppingApi, TaxonomyApi {
  DEFAULT_CATEGORY_TREE = 'EBAY_US';
  constructor(public options: EbayOptions) {
    if(!options) {
      throw new Error('Options are missing. Please provide an object to the constructor.')
    }
    if (!(options.clientID && options.clientSecret)){
      throw new Error('The "clientID" or "clientSecret" property is missing on the provided options, make sure you specify those.');
    }
    
    options.env = options.env || PROD_ENV;
    options.baseUrl = PROD_BASE_URL;
    options.baseSvcUrl = BASE_SVC_URL;

    if (options.env === SANDBOX_ENV) {
      options.baseUrl = SANDBOX_BASE_URL;
      options.baseSvcUrl = BASE_SANDBX_SVC_URL;
    }
    this.options = options;
    //setHeaders(this, options.headers);
    this.options.globalID = options.countryCode || 'EBAY-US';
  }
}

interface Ebay extends ShoppingApi, TaxonomyApi, FindingAPI {}

applyMixins(Ebay, [ShoppingApi, TaxonomyApi, FindingAPI]);

export default Ebay