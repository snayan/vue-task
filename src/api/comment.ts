import { get, post } from '@/util/fetch';
import { stringifPath } from './index';

const PATH = '/events/$A/comments';

interface Filter {
  offset?: number;
  limit?: number;
}

/* 获取特定互动的评论 */
export function getComnentsByAId(
  actionId: string,
  options: Filter = { offset: 0, limit: 25 },
) {
  return get(stringifPath(PATH.replace('$A', actionId)), {
    body: options,
  });
}

/* 回复特定活动的评论 */
export function postCommentsByAId(actionId: string, comment: string) {
  return post(stringifPath(PATH.replace('$A', actionId)), {
    body: { comment },
  });
}
