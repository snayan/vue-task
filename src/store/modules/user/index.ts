import { ActionTree, MutationTree, ActionContext } from 'vuex';
import { login, loginOut, LoginInfo } from '@/api/login';
// import {} from '@/api/user';
import { User } from './user';
import { RootState } from '../../rootstate';

const namespaced = true;

/* initial state */
const state = () => ({
  id: null,
  username: null,
  email: null,
  avatar: null,
  likes_count: null,
  goings_count: null,
  past_count: null,
});

/* user actions */
const actions: ActionTree<User, RootState> = {
  login({ commit, state }: ActionContext<User, RootState>, payload: LoginInfo) {
    commit('showLoading', null, { root: true });
    return login(payload).then(
      ({ token, user }: { token: string; user: User }) => {
        commit('saveToken', token, { root: true });
        commit('saveUser', user);
      },
    );
  },
};

/* user mutations */
const mutations: MutationTree<User> = {
  saveUser(state, user) {
    state.id = user.id;
    state.username = user.username;
    state.email = user.email;
    state.avatar = user.avatar;
    state.likes_count = user.likes_count;
    state.goings_count = user.goings_count;
    state.past_count = user.past_count;
  },
};

export default {
  state,
  actions,
  mutations,
  namespaced,
};
