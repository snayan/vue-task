import { getCookie, setCookie, removeCookie } from './cookie';
export const TOKEN = 'X-BLACKCAT-TOKEN';

/* 检查是否登陆 */
export function hasLogin() {
  return !!getCookie(TOKEN);
}

/* 保持灯露台 */
export function saveLogin(token: string) {
  return setCookie(TOKEN, token);
}

/* 撤销 */
export function loginOut() {
  return removeCookie(TOKEN);
}
