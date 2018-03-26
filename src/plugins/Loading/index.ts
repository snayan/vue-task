import Vue, { VueConstructor, PluginObject } from 'vue';
import Loading from './Loading.vue';

interface ShowFunc {
  (): () => void;
}

const plugin: PluginObject<{}> = {
  install(Vue: VueConstructor, options = {}) {
    const CONSTRUCTOR = Vue.extend(Loading);
    let cache: Vue & { show: ShowFunc } | null = null;

    function loading(): () => void {
      let loading = cache || (cache = new CONSTRUCTOR());
      if (!loading.$el) {
        let vm = loading.$mount();
        (document.querySelector('body') as HTMLElement).appendChild(vm.$el);
      }
      return loading.show();
    }
    Vue.prototype.$loading = loading;
  },
};

export default plugin;
