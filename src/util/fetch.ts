/* fetch api  */

import { getCookie } from '@/util/cookie';
const { token } = require('../../.config.js');

interface FetchParams {
  body?: { [key: string]: any };
  headers?: Headers;
}

/*  检查返回状态 */
function checkStatus(res: Response) {
  const { status } = res;
  if (status >= 200 && status < 300) {
    return res.json();
  } else if (status === 403) {
    // invalid token then go login
    return (window.location.href = '/');
  } else {
    throw new Error(`[${status}]:${res.statusText}`);
  }
}

export function internalFetch(type: 'GET' | 'POST' | 'DELETE') {
  return (isGetToken: boolean = false) => {
    return (path: string, options: FetchParams = {}) => {
      let { headers, body } = options;
      headers = headers instanceof Headers ? headers : new Headers();
      headers.set('Content-Type', 'application/json');
      if (!isGetToken) {
        headers.set(token, getCookie(token));
      }
      let stringifyBody;
      if (body) {
        let keys = Object.keys(body);
        if (type === 'GET') {
          stringifyBody = keys
            .map((v) => `${v}=${(body as { [key: string]: string })[v]}`)
            .join('&');
        } else {
          stringifyBody = JSON.stringify(body);
        }
      }
      return fetch(path, {
        method: type,
        body: stringifyBody,
        headers: headers,
        mode: 'same-origin',
      }).then(checkStatus);
    };
  };
}

const get = internalFetch('GET')();
const post = internalFetch('POST')();
const deletx = internalFetch('DELETE')();

export { get, post, deletx };
