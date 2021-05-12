import { ActionTree, MutationTree, StoreOptions } from 'vuex';
import axios from '@/axios/api';
import moment from 'moment';

class State {
  LogList = [];

  UserList = [];
}

class LogManages implements StoreOptions<State> {
  namespaced = true;

  state = new State();

  mutations: MutationTree<State> = {
    updateLogList(store, data) {
      store.LogList = data;
    },
    updateUserList(store, data) {
      store.UserList = data;
    },
  };

  actions: ActionTree<State, unknown> = {
    // 获取日志列表
    getLogList({ commit }, data) {
      return new Promise((resolve, reject) => {
        const Search = {
          ...data,
          startTime: data.startTime ? moment(data.startTime).valueOf() : 0,
          endTime: data.endTime ? moment(data.endTime).valueOf() : 0,
        };
        axios
          .getLogList(data)
          .then((res) => {
            commit('updateLogList', res.data.data);
            resolve(res.data.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    // 获取用户列表
    getUserLists({ commit }, data) {
      return new Promise((resolve, reject) => {
        const Search = {
          pageNo: 1,
          pageSize: 10,
          queryParam: {
            name: data.name,
          },
        };
        axios
          .getUserLists(data)
          .then((res) => {
            commit('updateUserList', res.data.data);
            resolve(res.data.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  };
}

export default new LogManages();
