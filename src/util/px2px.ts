// 获取当前设备的DPR
export const DPR = window.devicePixelRatio || 1;

// 适配字体大小
export default function px2px(val: string | number): string {
  if (typeof val === 'string') {
    val = Number(val.replace(/\s*px\s*/g, ''));
  }
  return val / 2 * DPR + 'px';
}
