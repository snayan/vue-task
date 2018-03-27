import Vue from 'vue';
import MobileScroll, { WinInfo } from './mscroll';

declare module 'vue/types/vue' {
  interface Vue {
    $msroll: MobileScroll;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    scrolling?: (w: WinInfo) => void;
    scrollend?: (w: WinInfo) => void;
  }
}
