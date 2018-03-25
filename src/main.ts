// polyfill
import 'promise-polyfill/src/polyfill';
import 'whatwg-fetch';

// start app
import Vue from 'vue';
import App from './views/App.vue';
import router from './router';
import store from './store';
import './plugins';
import './assets/fonticon/iconfont.js';
import './registerServiceWorker';
import './scss/_reset.scss';
import './scss/global.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
