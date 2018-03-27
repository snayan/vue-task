import { get, post, deletx } from '@/util/fetch';
import { stringifPath } from './index';

const PATH = '/events/$A/participants';

/* 获取指定活动的参与人情况 */
export function getParticipantsByAId(actionId: string) {
  return get(stringifPath(PATH.replace('$A', actionId)));
}

/* 更新指定活动的参与人情况 */
export function postParticipantsByAId(actionId: string) {
  return post(stringifPath(PATH.replace('$A', actionId)));
}

/* 删除指定活动指定用户的参与 */
export function deleteParticipantsByAId(actionId: string) {
  return deletx(stringifPath(`${PATH.replace('$A', actionId)}`));
}
