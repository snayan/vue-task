import Vue, { VueConstructor } from 'vue';
/* 移动端滑动优化 */

export interface WinInfo {
  scrollY: number;
  direction: number;
  gap: number;
}

const noopFunction = () => null;

type CbType = (p: WinInfo) => void;

let passiveSupported: boolean = false;
try {
  const options = Object.defineProperty({}, 'passive', {
    get() {
      passiveSupported = true;
    },
  });

  window.addEventListener('test', noopFunction, options);
} catch (err) {
  console.log(err);
}

class MobileScroll {
  private nowY: number;
  private lastY: number;
  private direction: number;
  private rafMark: number;
  private rafingMark: boolean;
  private gap: number;
  private scrollList: CbType[];
  private scrollEndList: CbType[];
  private vm: Vue;
  private listener: () => void;
  constructor(vm: Vue) {
    const sy = window.scrollY;
    this.scrollList = [];
    this.scrollEndList = [];
    this.nowY = sy;
    this.lastY = sy;
    this.direction = 0;
    this.rafMark = -1;
    this.rafingMark = false;
    this.gap = 0;
    this.vm = vm;
    this.listener = () => {
      if (!this.rafingMark) {
        this.startRaf();
      }
    };
  }
  /* 添加滚动监听事件 */
  public onScroll(cb: CbType) {
    if (typeof cb === 'function') {
      this.scrollList.push(cb.bind(this.vm));
    }
  }
  /* 添加滚动结束事件 */
  public onScrollEnd(cb: CbType) {
    if (typeof cb === 'function') {
      this.scrollEndList.push(cb.bind(this.vm));
    }
  }
  /* 监听window滚动事件 */
  public bindEvent() {
    const options = passiveSupported ? { passive: true } : false;
    const el = this.vm.$el;
    if (el) {
      el.addEventListener('scroll', this.listener, options);
    }
  }
  public unbindEvent() {
    const el = this.vm.$el;
    if (el) {
      el.removeEventListener('scroll', this.listener);
    }
  }
  /* 滚动结束时会调用 */
  private scrollEnd() {
    const winInfo: WinInfo = {
      scrollY: this.nowY,
      direction: this.direction,
      gap: Math.abs(this.gap),
    };
    for (let i = 0, j = this.scrollEndList.length; i < j; i++) {
      try {
        this.scrollEndList[i](winInfo);
      } catch (e) {
        console.log(e);
      }
    }
    this.endRaf();
  }
  /* 正在滚动时会调用 */
  private scrolling() {
    this.nowY = this.vm.$el.scrollTop;
    this.gap = this.nowY - this.lastY;
    if (this.gap) {
      // 正在滑动，1为向上滑动，-1为向下滑动
      this.direction = ((+(this.gap > 0) | 0) - 0.5) * 2;
      this.lastY = this.nowY;
      const winInfo: WinInfo = {
        scrollY: this.nowY,
        direction: this.direction,
        gap: this.gap,
      };
      for (let i = 0, j = this.scrollList.length; i < j; i++) {
        try {
          this.scrollList[i](winInfo);
        } catch (e) {
          console.warn(e);
        }
      }
      this.startRaf();
    } else {
      this.scrollEnd();
    }
  }
  /* 开启raf */
  private startRaf() {
    this.rafMark = window.requestAnimationFrame(this.scrolling.bind(this));
    this.rafingMark = true;
  }
  /* 结束raf */
  private endRaf() {
    window.cancelAnimationFrame(this.rafMark);
    this.rafingMark = false;
  }
}

export default MobileScroll;
