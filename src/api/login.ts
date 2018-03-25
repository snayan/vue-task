import { internalFetch, deletx } from '@/util/fetch';

const PATH = '/auth/token';

/* 登陆 */
export function login(username: string, password: string) {
  return internalFetch('POST')(true)(PATH, {
    body: { username, password },
  });
}

/* 退出 */
export function loginOut() {
  return deletx(PATH);
}
