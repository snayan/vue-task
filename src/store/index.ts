import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import { saveLogin, loginOut } from '@/util/session';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  strict: debug,
  state: {
    requesting: false,
    token: null,
  },
  mutations: {
    showLoading(state) {
      state.requesting = true;
    },
    hideLoading(state) {
      state.requesting = false;
    },
    saveToken(state, token) {
      state.token = token;
      saveLogin(token);
    },
  },
  modules: {
    user,
  },
});
