'use strict';

import { getRequest } from '../request';
import CommonUtils from '../common-utils/index';
import { MERCH_SRVC_NAME } from '../constants';
import type { EbayOptions } from '../typings';

//https://developer.ebay.com/devzone/merchandising/docs/CallRef/getMostWatchedItems.html#Samples
export default class MerchandisingAPI{
  constructor(public options: EbayOptions){}
/**
 * @method getMostWatchedItems {Function}
 * Add interest and excitement for buyers by showing them what other people are watching.
 * @param {String} categoryId (optional)
 */
getMostWatchedItems(merchOptions: any) {
  if (!this.options.clientID) throw new Error('Missing App id or client id');
  const url = CommonUtils.parseObj(merchOptions);
  return getRequest(
    `http://${this.options.baseSvcUrl}/${MERCH_SRVC_NAME}?OPERATION-NAME=getMostWatchedItems&SERVICE-NAME=${MERCH_SRVC_NAME}&SERVICE-VERSION=1.1.0&CONSUMER-ID=${this.options.clientID}&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD${url}`
  )
    .then(JSON.parse)
    .catch(console.log);
}

/**
 * @method getSimilarItems {Function}
 * Gets similar Items based on the Item id provided.
 * @param {String} categoryId (optional)
 */
getSimilarItems(merchOptions: any) {
  if (!this.options.clientID) throw new Error('Missing App id or client id');
  const url = CommonUtils.parseObj(merchOptions);
  console.log(
    `http://${this.options.baseSvcUrl}/${MERCH_SRVC_NAME}?OPERATION-NAME=getSimilarItems&SERVICE-NAME=${MERCH_SRVC_NAME}&SERVICE-VERSION=1.1.0&CONSUMER-ID=${this.options.clientID}&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD${url}`
  );
  return getRequest(
    `http://${this.options.baseSvcUrl}/${MERCH_SRVC_NAME}?OPERATION-NAME=getSimilarItems&SERVICE-NAME=${MERCH_SRVC_NAME}&SERVICE-VERSION=1.1.0&CONSUMER-ID=${this.options.clientID}&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD${url}`
  )
    .then(JSON.parse)
    .catch(console.log);
};
}
