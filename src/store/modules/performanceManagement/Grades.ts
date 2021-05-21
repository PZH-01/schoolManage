import { ActionTree, MutationTree, StoreOptions } from 'vuex';
import axios from '@/axios/api';

class State {
  sort = []; // 课程分类列表

  data = []; // 学习记录列表
}

class Grades implements StoreOptions<State> {
  namespaced = true;

  state = new State();

  mutations: MutationTree<State> = {
    // 提交管理员的课程分类列表
    updateadminSort(state, sort) {
      state.sort = sort;
    },
    // 提交教师的课程分类列表
    updateteacherSort(state, sort) {
      state.sort = sort;
    },
    // 提交学习记录列表
    updateSearchRecordsList(state, sort) {
      state.sort = sort;
    },
  };

  actions: ActionTree<State, unknown> = {
    // 请求左侧教师列表
    getteacherList({ commit }, data) {
      return new Promise((resolve) => {
        axios.getteacherList(data).then((res: any) => {
        //   commit('updateadminSort', res.data.data.list);
          resolve(res.data.data);
        });
      });
    },
    // 根据教师id获取右侧班级列表
    getClassGradesList({ commit }, data) {
      return new Promise((resolve) => {
        axios.getClassGradesList(data).then((res: any) => {
        //   commit('updateteacherSort', res.data.data.list);
          resolve(res.data.data);
        });
      });
    },
    // 查询学习记录列表
    getSearchRecordsList({ commit }, data) {
      return new Promise((resolve) => {
        axios.getSearchRecordsList(data).then((res: any) => {
          commit('updateSearchRecordsList', res.data.data);
          resolve(res.data.data);
        });
      });
    },
    // 关闭一条记录
    delrecord({ commit }, data) {
      return new Promise((resolve) => {
        axios.delrecord(data).then((res: any) => {
          resolve(res.data.data);
        });
      });
    },
    // 关闭一条记录
    delrecordList({ commit }, data) {
      return new Promise((resolve) => {
        axios.delrecordList(data).then((res: any) => {
          resolve(res.data.data);
        });
      });
    },
  };
}

export default new Grades();
