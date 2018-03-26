import { ActionTree, ActionContext, MutationTree } from 'vuex';
import { getChannels } from '@/api/channel';
import { initDateFilter } from '@/util/date';
import { Channel, Date, Filter } from './filter';
import { RootState } from '../../rootstate';

const namespaced = true;

const state = () => ({
  channels: [],
  dates: [
    { start: '0', end: '0', value: 'all', name: 'All' },
    ...initDateFilter(),
  ],
});

const actions: ActionTree<Filter, RootState> = {
  getChannels({ commit, state }) {
    return getChannels().then(({ channels }: { channels: Array<Channel> }) => {
      commit('updateChannels', channels);
    });
  },
};

const mutations: MutationTree<Filter> = {
  updateChannels(state, channels: Array<Channel>) {
    state.channels = [ ...channels];
  },
};

export default {
  state,
  actions,
  mutations,
  namespaced,
};
