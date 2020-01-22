"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function buildSearchUrl({ baseSvcUrl, clientID, operationName, param, name, additionalParam, sortOrder, limit, globalID, pageNumber }) {
    let baseUrl = `https://${baseSvcUrl}/services/search/FindingService/v1?`;
    baseUrl += "SECURITY-APPNAME=" + clientID;
    baseUrl += "&OPERATION-NAME=" + operationName;
    baseUrl += "&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON";
    baseUrl += param ? "&" + param + "=" + name : "";
    baseUrl += additionalParam ? "&" + additionalParam : "";
    baseUrl += sortOrder ? "&sortOrder=" + sortOrder : "";
    baseUrl += "&outputSelector(0)=SellerInfo";
    baseUrl += limit ? "&paginationInput.entriesPerPage=" + limit : "";
    baseUrl += globalID ? "&GLOBAL-ID=" + globalID : "";
    baseUrl += pageNumber ? "&paginationInput.pageNumber=" + pageNumber : "";
    return baseUrl;
}
exports.buildSearchUrl = buildSearchUrl;
/**
 * Builds the Shopping(open api)  URL.
 *
 * @param {Object} options
 * @return {String} url
 * @private
 */
function buildShoppingUrl({ baseUrl, clientID, operationName, param, name, includeSelector }) {
    let url = `https://${baseUrl}/Shopping?appid=${clientID}&callname=${operationName}&version=967&siteid=0&responseencoding=JSON&${param}=${name}`;
    url += includeSelector ? "&IncludeSelector=" + includeSelector : "";
    //base_url += '&GLOBAL-ID=' + oglobalID;
    return url;
}
exports.buildShoppingUrl = buildShoppingUrl;
exports.default = { buildSearchUrl, buildShoppingUrl };
