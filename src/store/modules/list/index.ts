import { ActionTree, ActionContext, GetterTree, MutationTree } from 'vuex';
import { getActions, getActionById, Filter } from '@/api/action';
import { getChannels } from '@/api/channel';
import { Action, List } from './list';
import { RootState } from '../../rootstate';

const namespaced = true;

const state = () => ({
  data: [],
  has_more: true,
});

const getters: GetterTree<List, RootState> = {
  getDetail(state) {
    return (id: number) => {
      let finds = state.data.filter((v) => v.id === id);
      if (finds.length) {
        return finds[0];
      }
      return null;
    };
  },
};

const actions: ActionTree<List, RootState> = {
  getList({ commit, state }, payload: Filter) {
    return getActions(payload).then(
      ({ events, hasMore }: { events: Action[]; hasMore: boolean }) => {
        commit('updateList', events);
        commit('updateHasMore', hasMore);
      },
    );
  },
  getMoreList({ commit, state }, payload: Filter) {
    if (state.has_more) {
      return getActions(payload).then(
        ({ events, hasMore }: { events: Action[]; hasMore: boolean }) => {
          commit('appendList', events);
          commit('updateHasMore', hasMore);
        },
      );
    }
  },
};

const mutations: MutationTree<List> = {
  updateList(state, list) {
    state.data = [...list];
  },
  appendList(state, list) {
    state.data = [...state.data, ...list];
  },
  updateHasMore(state, hasMore) {
    state.has_more = hasMore;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced,
};
