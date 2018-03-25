import { get, post, deletx } from '@/util/fetch';

const PATH = '/event/$A/participants';

/* 获取指定活动的参与人情况 */
export function getParticipantsByAId(actionId: string) {
  return get(PATH.replace('$A', actionId));
}

/* 更新指定活动的参与人情况 */
export function postParticipantsByAId(actionId: string) {
  return post(PATH.replace('$A', actionId));
}

/* 删除指定活动指定用户的参与 */
export function deleteParticipantsByAIdAndUId(
  actionId: string,
  userId: string,
) {
  return deletx(`${PATH.replace('$A', actionId)}/${userId}`);
}
