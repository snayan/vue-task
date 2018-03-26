import { get } from '@/util/fetch';
import { stringifPath } from './index';

const PATH = '/channels';

/* 获取标签 */
export function getChannels() {
  return get(stringifPath(PATH));
}
