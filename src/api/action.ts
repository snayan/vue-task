import { get } from '@/util/fetch';

const PATH = '/events';

interface Filter {
  after?: number;
  before?: number;
  channels?: string;
  offset?: number;
  limit?: number;
}

/* 获取活动 */
export function getActions(options: Filter) {
  return get(PATH, {
    body: { offset: 0, limit: 25, ...options },
  });
}

/* 获取特定活动 */
export function getActionById(id: string) {
  return get(`${PATH}/${id}`);
}
