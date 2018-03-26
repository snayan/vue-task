export const API_PRE = '/api/v1';

/* 处理接口地址前缀 */
export function stringifPath(path: string) {
  return API_PRE + path;
}
