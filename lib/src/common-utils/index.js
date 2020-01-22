'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("../request");
class CommonUtils {
    constructor(options) {
        this.options = options;
    }
    static base64Encode(encodeData) {
        const buff = typeof encodeData === 'string' ? Buffer.from(encodeData) : encodeData;
        return buff.toString('base64');
    }
    setAccessToken(token) {
        this.options.access_token = token;
    }
    getAccessToken() {
        if (!this.options.clientID)
            throw new Error('Missing Client ID');
        if (!this.options.clientSecret)
            throw new Error('Missing Client Secret or Cert Id');
        if (!this.options.body)
            throw new Error('Missing Body, required Grant type');
        const encodedStr = CommonUtils.base64Encode(this.options.clientID + ':' + this.options.clientSecret);
        const self = this;
        const auth = 'Basic ' + encodedStr;
        this.options.contentType = 'application/x-www-form-urlencoded';
        return request_1.makeRequest({
            self: this.options,
            endpoint: '/identity/v1/oauth2/token',
            methodName: 'POST',
            token: auth
        }).then((result) => {
            const resultJSON = JSON.parse(result);
            self.setAccessToken(resultJSON.access_token);
            return resultJSON;
        });
    }
    static setHeaders(self, headerObj) {
        self.headers = Object.assign({}, self.headers, headerObj);
    }
    static upperCase(data) {
        if (typeof data !== 'string')
            return;
        return data.toUpperCase();
    }
    // Returns if a value is a string
    static isString(value) {
        return typeof value === 'string' || value instanceof String;
    }
    // Returns if object is empty or not
    static isEmptyObj(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
    static encodeURLQuery(url) {
        return encodeURIComponent(url)
            .replace(/'/g, '%27')
            .replace(/"/g, '%22');
    }
    // parses the object and converts it into query params.
    static parseObj(options, url = '') {
        if (options) {
            for (let key in options) {
                url = `${url}&${key}=${options[key]}`;
            }
        }
        return url;
    }
}
exports.default = CommonUtils;
