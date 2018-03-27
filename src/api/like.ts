import { get, post, deletx } from '@/util/fetch';
import { stringifPath } from './index';

const PATH = '/events/$A/likes';

interface Filter {
  offset?: number;
  limit?: number;
}

/* 获取特定活动的喜欢信息 */
export function getLikesByAId(actionId: string) {
  return get(stringifPath(PATH.replace('$A', actionId)));
}

/* 提交特定活动的喜欢 */
export function postLikesByAId(actionId: string) {
  return post(stringifPath(PATH.replace('$A', actionId)));
}

/* 删除特定活动的喜欢 */
export function deleteLikesByAId(actionId: string) {
  return deletx(stringifPath(`${PATH.replace('$A', actionId)}`));
}
