/* fetch api  */

import { getCookie, removeCookie } from '@/util/cookie';
import { TOKEN } from '@/util/session';

interface FetchParams {
  body?: { [key: string]: any };
  headers?: Headers;
}

/*  检查返回状态 */
function checkStatus(type: 'GET' | 'POST' | 'DELETE') {
  return (res: Response) => {
    const { status } = res;
    if (status >= 200 && status < 300) {
      return res.text().then((v) => v && JSON.parse(v));
    } else if (status === 403) {
      // invalid token then go login
      removeCookie(TOKEN);
      return (window.location.href = '/');
    } else {
      throw new Error(`[${status}]:${res.statusText}`);
    }
  };
}

export function internalFetch(type: 'GET' | 'POST' | 'DELETE') {
  return (isGetToken: boolean = false) => {
    return (path: string, options: FetchParams = {}) => {
      let { headers, body } = options;
      headers = headers instanceof Headers ? headers : new Headers();
      if (!isGetToken) {
        headers.set(TOKEN, getCookie(TOKEN));
      }
      let stringifyBody;
      if (body) {
        headers.set('Content-Type', 'application/json');
        let keys = Object.keys(body);
        if (type === 'GET') {
          stringifyBody = keys
            .map((v) => `${v}=${(body as { [key: string]: string })[v]}`)
            .join('&');
          path = path + '?' + stringifyBody;
          stringifyBody = null;
        } else {
          stringifyBody = JSON.stringify(body);
        }
      }
      return fetch(path, {
        headers,
        method: type,
        body: stringifyBody,
        mode: 'same-origin',
      }).then(checkStatus(type));
    };
  };
}

const get = internalFetch('GET')();
const post = internalFetch('POST')();
const deletx = internalFetch('DELETE')();

export { get, post, deletx };
