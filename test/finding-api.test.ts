import * as nock from 'nock';
import Ebay from '../src/index';
import type { EbayOptions } from '../src/typings';
import FindingAPI from '../src/apis/finding';

const nockFindingApi = nock('https://svcs.ebay.com/');

describe('test ebay finding Api', () => {
    describe('test findingApi methods with required params', () => {
        it('test findItemsByCategory with required params', () => {
            let ebay = new Ebay(<EbayOptions>{
                clientID: '12345', clientSecret:'54321'
            });
            expect(() => {
                ebay.findItemsByCategory(undefined);
            }).toThrow('Category ID is null or invalid');
        });

        it('test findCompletedItemswith required params', () => {
            let ebay = new Ebay(<EbayOptions>{
                clientID: '12345', clientSecret:'54321'
            });
            expect(() => {
                ebay.findCompletedItems(undefined);
            }).toThrow('Keyword or category ID are required.');
        });
    });

    describe('test constructAdditionalParams', () => {
        it('test constructAdditionalParams with required params', () => {
            let expectedParam =
                'keywords=iphone&categoryId=111&sortOrder=PricePlusShippingLowest';
            const options = {
                keywords: 'iphone',
                categoryId: '111',
                sortOrder: 'PricePlusShippingLowest'
            };
            const emptyOptions = {};
            expect(FindingAPI.constructAdditionalParams(options)).toEqual(expectedParam);
            expect(FindingAPI.constructAdditionalParams(emptyOptions)).toEqual('');
        });

        it('test constructAdditionalParams with affiliate params', () => {
            let expectedParamWithAffiliate =
                'keywords=iphone&categoryId=111&sortOrder=PricePlusShippingLowest&affiliate.trackingId=1234567899&affiliate.networkId=123';
            let expectedParam =
                'keywords=iphone&categoryId=111&sortOrder=PricePlusShippingLowest';
            const options = {
                keywords: 'iphone',
                categoryId: '111',
                sortOrder: 'PricePlusShippingLowest',
                affiliate: {
                    trackingId: 1234567899,
                    networkId: 123
                }
            };

            const optionsWithNoAffiliate = {
                keywords: 'iphone',
                categoryId: '111',
                sortOrder: 'PricePlusShippingLowest'
            };
            const emptyOptions = {};
            expect(FindingAPI.constructAdditionalParams(options)).toEqual(
                expectedParamWithAffiliate
            );
            expect(FindingAPI.constructAdditionalParams(optionsWithNoAffiliate)).toEqual(
                expectedParam
            );
            expect(FindingAPI.constructAdditionalParams(emptyOptions)).toEqual('');
        });

        it('test constructAdditionalParams with additional params', () => {
            let expectedParam =
                'keywords=iphone&categoryId=111&sortOrder=PricePlusShippingLowest&itemFilter(0).name=Condition&itemFilter(0).value=3000&itemFilter(1).name=SoldItemsOnly&itemFilter(1).value=true';
            let expectedPagParam =
                'keywords=iphone&categoryId=111&sortOrder=PricePlusShippingLowest&itemFilter(0).name=Condition&itemFilter(0).value=3000&itemFilter(1).name=SoldItemsOnly&itemFilter(1).value=true&paginationInput.entriesPerPage=2';
            const options = {
                keywords: 'iphone',
                categoryId: '111',
                sortOrder: 'PricePlusShippingLowest',
                Condition: 3000,
                SoldItemsOnly: true
            };
            const optionsWithPagination = {
                keywords: 'iphone',
                categoryId: '111',
                sortOrder: 'PricePlusShippingLowest',
                Condition: 3000,
                SoldItemsOnly: true,
                entriesPerPage: 2
            };
            expect(FindingAPI.constructAdditionalParams(options)).toEqual(expectedParam);
            expect(FindingAPI.constructAdditionalParams(optionsWithPagination)).toEqual(
                expectedPagParam
            );
        });
    });

    describe('test all get apis', () => {
        it('test findItemsAdvanced', () => {
            let ebay = new Ebay(<EbayOptions>{
                clientID: 'ABCD', clientSecret:'54321'
            });
            nockFindingApi
                .get(
                    '/services/search/FindingService/v1?SECURITY-APPNAME=ABCD&OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&paginationInput.entriesPerPage=2&keywords=ipad&itemFilter(0).name=ExpeditedShippingType&itemFilter(0).value=OneDayShipping&outputSelector(0)=SellerInfo&GLOBAL-ID=EBAY-US'
                )
                .reply(200, { findItemsAdvancedResponse: [{ ack: ['Success'] }] });
            return ebay
                .findItemsAdvanced({
                    entriesPerPage: 2,
                    keywords: 'ipad',
                    ExpeditedShippingType: 'OneDayShipping'
                })
                .then(
                    (data:any) => {
                        expect(data.findItemsAdvancedResponse).not.toBeNull();
                    },
                    console.log
                );
        });
    });
});
