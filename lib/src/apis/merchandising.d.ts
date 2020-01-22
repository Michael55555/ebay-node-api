import type { EbayOptions } from '../typings';
export default class MerchandisingAPI {
    options: EbayOptions;
    constructor(options: EbayOptions);
    /**
     * @method getMostWatchedItems {Function}
     * Add interest and excitement for buyers by showing them what other people are watching.
     * @param {String} categoryId (optional)
     */
    getMostWatchedItems(merchOptions: any): Promise<any>;
    /**
     * @method getSimilarItems {Function}
     * Gets similar Items based on the Item id provided.
     * @param {String} categoryId (optional)
     */
    getSimilarItems(merchOptions: any): Promise<any>;
}
