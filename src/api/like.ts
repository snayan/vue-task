import { get, post, deletx } from '@/util/fetch';

const PATH = '/event/$A/likes';

interface Filter {
  offset?: number;
  limit?: number;
}

/* 获取特定活动的喜欢信息 */
export function getLikesByAId(actionId: string, options: Filter) {
  return get(PATH.replace('$A', actionId), {
    body: { offset: 0, limit: 25, ...options },
  });
}

/* 提交特定活动的喜欢 */
export function postLikesByAId(actionId: string) {
  return post(PATH.replace('$A', actionId));
}

/* 删除特定活动的喜欢 */
export function deleteLikesByAIdAndUId(actionId: string, userId: string) {
  return deletx(`${PATH.replace('$A', actionId)}/${userId}`);
}
