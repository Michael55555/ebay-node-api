/// <reference types="node" />
import type { EbayOptions } from '../typings';
export default class CommonUtils {
    options: EbayOptions;
    constructor(options: EbayOptions);
    static base64Encode(encodeData: string | Buffer): string;
    setAccessToken(token: any): void;
    getAccessToken(): Promise<any>;
    static setHeaders(self: {
        headers: any;
    }, headerObj: any): void;
    static upperCase(data: string): string | undefined;
    static isString(value: any): boolean;
    static isEmptyObj(obj: {
        hasOwnProperty: (arg0: string) => any;
    }): boolean;
    static encodeURLQuery(url: string | number | boolean): string;
    static parseObj(options: {
        [x: string]: any;
    }, url?: string): string;
}
