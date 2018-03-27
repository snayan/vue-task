import { internalFetch, deletx } from '@/util/fetch';
import { saveLogin, loginOut as logout } from '@/util/session';
import { stringifPath } from './index';

const PATH = '/auth/token';

export interface LoginInfo {
  username: string;
  password: string;
}

/* 登陆 */
export function login({ username, password }: LoginInfo) {
  return internalFetch('POST')(true)(stringifPath(PATH), {
    body: { username, password },
  });
}

/* 退出 */
export function loginOut() {
  return deletx(stringifPath(PATH)).then(logout);
}
