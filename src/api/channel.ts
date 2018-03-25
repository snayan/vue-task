import { get } from '@/util/fetch';

const PATH = '/channels';

/* 获取标签 */
export function getChannels() {
  return get(PATH);
}
