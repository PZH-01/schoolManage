import { createStore } from 'vuex';
import system from './modules/system';
import user from './modules/user';
import classe from './modules/classe';
import userInfo from './modules/userInfo';
import breadcrumb from './modules/breadcrumb';
import exhibition from './modules/exhibition';
import Header from './modules/stydyManage/Header';
import Lists from './modules/stydyManage/Lists';
import LogManages from './modules/logManage/logManages';

const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    system,
    user,
    classe,
    userInfo,
    breadcrumb,
    exhibition,
    Header,
    Lists,
    LogManages,
  },
});

declare module 'vuex' {
  type StoreStateType = typeof store.state;
  type ModulesType = {
    system: typeof system.state;
    user: typeof user.state;
    classe: typeof classe.state;
    userInfo: typeof userInfo.state;
    breadcrumb: typeof breadcrumb.state;
    exhibition: typeof exhibition.state;
    Header: typeof Header.state;
    Lists: typeof Lists.state;
    LogManages: typeof LogManages.state;
  };
  export function useStore<S = StoreStateType & ModulesType>(): Store<S>;
}

export default store;
