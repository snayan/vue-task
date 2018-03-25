import Vue from 'vue';

interface ToastFunc {
  (msg: string, options?: {}): void;
}

declare module 'vue/types/vue' {
  interface Vue {
    $toast: ToastFunc;
  }
}
