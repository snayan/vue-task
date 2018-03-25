/* fetch api  */

import { getCookie } from '@/util/cookie';
const { devServer, proServer, token } = require('../../.config.js');
const fetchServer =
  process.env.NODE_ENV === 'production' ? proServer : devServer;

/*  检查返回状态 */
function checkStatus(res: Response) {
  const { status } = res;
  if (status >= 200 && status < 300) {
    return res.json();
  } else if (status === 403) {
    // invalid token then go login
    return (window.location.href = '/sign');
  } else {
    throw new Error(`[${status}]:${res.statusText}`);
  }
}

function internalFetch(type: 'GET' | 'POST', isGetToken: boolean = false) {
  return (path: string, options: RequestInit) => {
    let { headers } = options;
    headers = headers instanceof Headers ? headers : new Headers();
    headers.set('Content-Type', 'application/json');
    if (!isGetToken) {
      headers.set(token, getCookie(token));
    }
    return fetch(`${fetchServer}/${path}`, options).then(checkStatus);
  };
}

const get = internalFetch('GET');
const post = internalFetch('POST');
const login = internalFetch('POST', true);

export { get, post, login };
