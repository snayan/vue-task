import { get, post } from '@/util/fetch';

const PATH = '/event/$A/comments';

interface Filter {
  offset?: number;
  limit?: number;
}

/* 获取特定互动的评论 */
export function getComnentsByAId(actionId: string, options: Filter) {
  return get(PATH.replace('$A', actionId), {
    body: { offset: 0, limit: 25, ...options },
  });
}

/* 回复特定活动的评论 */
export function postCommentsByAId(actionId: string, comment: string) {
  return post(PATH.replace('$A', actionId), {
    body: { comment },
  });
}
