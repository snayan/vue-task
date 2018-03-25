import { get } from '@/util/fetch';

const PATH = '/user/$U';

interface Filter {
  type: 'liked' | 'going' | 'past';
  offset?: number;
  limit?: number;
}

/* 获取用户信息 */
export function getUserInfo(userId: string) {
  return get(PATH.replace('$U', userId));
}

/* 获取用户的喜欢和参与 */
export function getUserActions(userId: string, options: Filter) {
  return get(`${PATH.replace('$U', userId)}/events`, {
    body: { offset: 0, limit: 25, ...options },
  });
}
