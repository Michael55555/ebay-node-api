'use strict';
import * as https from 'https';
import * as http from 'http';
import * as qs from 'querystring';

export const getRequest = (url: string): Promise<string> => {
  let protocol = url.includes('http://') ? http : https;

  return new Promise(function(resolve, reject) {
    protocol.get(url, res => {
      let body = '';

      res.setEncoding('utf8');
      res.on('data', data => (body += data));
      res.on('end', () => {
        if (JSON.parse(body).errorMessage) {
          reject(body);
        }
        resolve(body);
      });
      res.on('error', reject);
    });
  });
};

export const makeRequest = function postRequest({
  self,
  endpoint,
  methodName,
  token
}: {
  self: any;
  endpoint: string;
  methodName: string;
  token: string;
}): Promise<string> {
  let dataString = '';
  if (self.data) {
    dataString = self.data;
  } else if (methodName === 'POST') {
    dataString = qs.stringify(self.body);
  }

  const options = {
    hostname: self.baseUrl,
    path: endpoint,
    method: methodName || 'GET',
    headers: {
      'content-type': self.contentType ? self.contentType : 'application/json',
      authorization: token,
      'cache-control': 'no-cache',
      ...self.headers
    }
  };

  return new Promise(function(resolve, reject) {
    const req = https.request(options, res => {
      res.setEncoding('utf8');
      let body = '';
      res.on('data', data => (body += data));
      res.on('end', () => resolve(body));
      res.on('error', reject);
    });

    if (methodName === 'POST') req.write(dataString);
    req.end();
  });
};

const base64Encode = (encodeData: ArrayBuffer | SharedArrayBuffer) => {
  const buff = Buffer.from(encodeData);
  return buff.toString('base64');
};

module.exports = { getRequest, makeRequest, base64Encode };
