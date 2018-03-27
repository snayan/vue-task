import { ActionTree, ActionContext, MutationTree, GetterTree } from 'vuex';
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
  getChannels({ commit }) {
    return getChannels().then(({ channels }: { channels: Channel[] }) => {
      commit('updateChannels', channels);
    });
  },
};

const mutations: MutationTree<Filter> = {
  updateChannels(state , channels: Channel[]) {
    state.channels = [ ...channels];
  },
};

export default {
  state,
  actions,
  mutations,
  namespaced,
};
