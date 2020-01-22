import type { EbayOptions } from '../typings/index';
export default class TaxonomyAPI {
    options: EbayOptions;
    DEFAULT_CATEGORY_TREE: string;
    constructor(options: EbayOptions);
    /**
     * @method getDefaultCategoryTreeId {Function}
     * @param {String} marketPlaceId = default = EBAY_US
     */
    getDefaultCategoryTreeId(marketPlaceId?: string): Promise<any>;
    /**
     * @method getCategoryTree {Function}
     * @param {Integer} categoryTreeId = default = 0
     */
    getCategoryTree(categoryTreeId?: number): Promise<any>;
    /**
     * @method getCategorySubtree {Function}
     * @param {String} categoryId = identifier of the category at the top of the subtree.
     * @param {String} categoryTreeId = The unique identifier of the eBay category tree from which a category subtree is being requested.
     */
    getCategorySubtree(categoryTreeId: number | undefined, categoryId: number): Promise<any>;
    /**
     * @method getCategorySuggestions {Function}
     * @param {String} categoryTreeId = identifier of the category at the top of the subtree.
     * @param {String} keyword = input string to get CategorySuggestions.
     */
    getCategorySuggestions(categoryTreeId: number | undefined, keyword: any): Promise<any>;
    /**
     * @method getItemAspectsForCategory {Function}
     * @param {String} categoryId = identifier of the category at the top of the subtree.
     * @param {String} keyword = input string to get CategorySuggestions.
     */
    getItemAspectsForCategory(categoryTreeId: number | undefined, categoryId: number): Promise<any>;
    private showAccessTokenError;
}
