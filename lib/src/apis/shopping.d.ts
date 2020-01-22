import type { EbayOptions } from '../typings';
export default class ShoppingApi {
    options: EbayOptions;
    constructor(options: EbayOptions);
    getAllCategories(categoryID: any): Promise<any>;
    getUserDetails(input: {
        userId: any;
        details: any;
    }): Promise<any>;
    getItemStatus(itemIds: any): Promise<any>;
    getShippingCosts({ itemId, destCountryCode, destPostalCode }: {
        itemId: any;
        destCountryCode: string;
        destPostalCode: string;
    }): Promise<any>;
}
