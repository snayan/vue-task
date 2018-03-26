import { internalFetch, deletx } from '@/util/fetch';
import { saveLogin, loginOut as logout } from '@/util/session';
import { stringifPath } from './index';

const PATH = '/auth/token';

/* 登陆 */
export function login(username: string, password: string) {
  return internalFetch('POST')(true)(stringifPath(PATH), {
    body: { username, password },
  }).then((res) => {
    saveLogin(res.token);
  });
}

/* 退出 */
export function loginOut() {
  return deletx(stringifPath(PATH)).then(logout);
}
