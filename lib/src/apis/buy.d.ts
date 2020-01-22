import type { EbayOptions } from '../typings';
export default class BuyAPI {
    options: EbayOptions;
    constructor(options: EbayOptions);
    getItem(itemId: string | number | boolean): Promise<any>;
    getItemByLegacyId({ legacyItemId, legacyVariationSku }: {
        legacyItemId: string | number;
        legacyVariationSku: string;
    }): Promise<any>;
    getItemByItemGroup(itemGroupId: string | number): Promise<string>;
    searchItems({ categoryId, gtin, keyword, limit, offset, sort, fieldgroups, filter, aspect_filter }: {
        categoryId: string | number;
        gtin: string;
        keyword: string;
        limit: number;
        offset: string | number;
        sort: string;
        fieldgroups: string;
        filter: string;
        aspect_filter: string;
    }): Promise<string>;
    searchByImage(searchConfig: {
        imgPath: string;
        base64Image: string;
    }): Promise<string>;
}
