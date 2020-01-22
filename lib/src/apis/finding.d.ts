import type { EbayOptions } from '../typings';
export declare class FindingAPI {
    options: EbayOptions;
    constructor(options: EbayOptions);
    findItemsByKeywords(options: any): Promise<any>;
    findItemsByCategory(categoryID: string | number): Promise<any>;
    /**
     * searches for items whose listings are completed and are no longer available for
     * sale by category (using categoryId), by keywords (using keywords), or a combination of the two.
     * @param {Object} options
     */
    findCompletedItems(options: {
        keywords: string;
        categoryId: string | number;
    }): Promise<any>;
    /**
     * searches for items whose listings are completed and are no longer available for
     * sale by category (using categoryId), by keywords (using keywords), or a combination of the two.
     * @param {Object} options
     */
    findItemsAdvanced(options: {
        keywords: string | number | boolean;
    }): Promise<any>;
    getVersion(): Promise<any>;
    /**
     * Searches for items on eBay using specific eBay product values.
     * @param {Object} options
     */
    findItemsByProduct(options: {
        type: string;
    }): Promise<any>;
    /**
     * Constructs query param based on some logic to support filter and aspect_filter params.
     *
     * ```output will be keywords=iphone&itemFilter(0).name=Condition&itemFilter(0).value=3000&itemFilter(1).name=FreeShippingOnly&itemFilter(1).value=true```
     * @param {Object} options
     */
    constructAdditionalParams(options: {
        [x: string]: any;
    }): string;
}
