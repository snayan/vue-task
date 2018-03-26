import { ActionTree, ActionContext, MutationTree } from 'vuex';
import { getActions, getActionById, Filter } from '@/api/action';
import { getChannels } from '@/api/channel';
import { Action, List } from './list';
import { RootState } from '../../rootstate';

const namespaced = true;

const state = () => ({
  data: [],
  has_more: true,
});

const actions: ActionTree<List, RootState> = {
  getList({ commit, state }, payload: Filter) {
    return getActions(payload).then(
      ({ events, has_more }: { events: Array<Action>; has_more: boolean }) => {
        commit('updateList', events);
        commit('updateHasMore', has_more);
      },
    );
  },
  getMoreList({ commit, state }, payload: Filter) {
    if (state.has_more) {
      return getActions(payload).then(
        ({
          events,
          has_more,
        }: {
          events: Array<Action>;
          has_more: boolean;
        }) => {
          commit('appendList', events);
          commit('updateHasMore', has_more);
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
  actions,
  mutations,
  namespaced,
};
