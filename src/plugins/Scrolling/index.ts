import Vue, { VueConstructor, PluginObject } from 'vue';
import MScroll from './mscroll';

let installed = false;

const plugin: PluginObject<{}> = {
  install(Vue: VueConstructor) {
    if (installed) {
      return;
    }
    installed = true;
    Vue.mixin({
      created() {
        let { methods } = this.$options;
        if (methods) {
          let hasBindScrolling =
            methods.scrolling && typeof methods.scrolling === 'function';
          let hasBindScrollend =
            methods.scrollend && typeof methods.scrollend === 'function';
          if (hasBindScrolling || hasBindScrollend) {
            this.$msroll = new MScroll(this);
          }
          if (hasBindScrolling) {
            this.$msroll.onScroll(methods.scrolling);
          }
          if (hasBindScrollend) {
            this.$msroll.onScrollEnd(methods.scrollend);
          }
        }
      },
      mounted() {
        if (this.$msroll && this.$msroll instanceof MScroll) {
          this.$msroll.bindEvent();
        }
      },
      destroyed() {
        if (this.$msroll && this.$msroll instanceof MScroll) {
          this.$msroll.unbindEvent();
        }
      },
    });
  },
};

export default plugin;
