import { ActionTree, MutationTree, StoreOptions } from 'vuex';
import axios from '@/axios/api';

class State {
  RecordsTotal = {}; // 学习记录总条数
}

class Header implements StoreOptions<State> {
  namespaced = true;

  state = new State();

  mutations: MutationTree<State> = {
    // 更新学习记录总条数
    updateRecordsTotal(state, RecordsTotal) {
      state.RecordsTotal = RecordsTotal;
    },
  };

  actions: ActionTree<State, unknown> = {
    // 获取学习管理中学习记录的总条数
    getLearnRecordsTotal({ commit }) {
      return new Promise((resolve) => {
        axios.getLearnRecordsTotal().then((res: any) => {
          commit('updateRecordsTotal', res.data.data);
          resolve(res.data.data);
        });
      });
    },
  };
}

export default new Header();
