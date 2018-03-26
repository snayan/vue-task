import { get } from '@/util/fetch';
import { stringifPath } from './index';

const PATH = '/events';

export interface Filter {
  after?: number;
  before?: number;
  channels?: string;
  offset?: number;
  limit?: number;
}

/* 获取活动 */
export function getActions(options: Filter) {
  return get(stringifPath(PATH), {
    body: { offset: 0, limit: 25, ...options },
  });
}

/* 获取特定活动 */
export function getActionById(id: string) {
  return get(stringifPath(`${PATH}/${id}`));
}
