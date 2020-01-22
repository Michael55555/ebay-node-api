import type { EbayOptions } from "./typings";
/**
 * This method is used to build the url based on
 * the type of request.
 */
/**
 * Builds the findings(search)  URL.
 *
 * @param {Object} options
 * @param {String} data
 * @return {String} build url
 * @private
 */
export declare function buildSearchUrl({ baseSvcUrl, clientID, operationName, param, name, additionalParam, sortOrder, limit, globalID, pageNumber }: EbayOptions): string;
/**
 * Builds the Shopping(open api)  URL.
 *
 * @param {Object} options
 * @return {String} url
 * @private
 */
export declare function buildShoppingUrl({ baseUrl, clientID, operationName, param, name, includeSelector }: EbayOptions): string;
declare const _default: {
    buildSearchUrl: typeof buildSearchUrl;
    buildShoppingUrl: typeof buildShoppingUrl;
};
export default _default;
