import Vue, { VueConstructor, PluginObject } from 'vue';
import Toast from './Toast.vue';

interface ShowFunc {
  (msg: string): void;
}

const plugin: PluginObject<{}> = {
  install(Vue: VueConstructor, options = {}) {
    const CONSTRUCTOR = Vue.extend(Toast);
    let cache: Vue & { show: ShowFunc } | null = null;

    function toast(msg: string, options = {}) {
      let toast = cache || (cache = new CONSTRUCTOR());
      if (!toast.$el) {
        let vm = toast.$mount();
        (document.querySelector('body') as HTMLElement).appendChild(vm.$el);
      }
      toast.show(msg);
    }
    Vue.prototype.$toast = toast;
  },
};

export default plugin;
