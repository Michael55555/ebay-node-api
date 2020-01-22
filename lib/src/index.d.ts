import ShoppingApi from './apis/shopping';
import TaxonomyApi from './apis/taxonomy';
import type { EbayOptions } from './typings';
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
declare class Ebay implements ShoppingApi, TaxonomyApi {
    options: EbayOptions;
    DEFAULT_CATEGORY_TREE: string;
    constructor(options: EbayOptions);
}
interface Ebay extends ShoppingApi, TaxonomyApi {
}
export default Ebay;
