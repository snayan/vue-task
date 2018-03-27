import { get } from '@/util/fetch';
import { stringifPath } from './index';
import { hasLogin } from '@/util/session';
const PATH = '/user';

export interface Filter {
  type: 'liked' | 'going' | 'past';
  offset?: number;
  limit?: number;
}

/* 获取用户信息 */
export function getUserInfo() {
  return hasLogin() ? get(stringifPath(PATH)) : Promise.resolve({});
}

/* 获取用户的喜欢和参与 */
export function getUserActions(options: Filter) {
  return get(stringifPath(`${PATH}/events`), {
    body: { offset: 0, limit: 25, ...options },
  });
}
