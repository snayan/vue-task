import Vue from 'vue';

interface LoadingFunc {
  (): () => void;
}

declare module 'vue/types/vue' {
  interface Vue {
    $loading: LoadingFunc;
  }
}
