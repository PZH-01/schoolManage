import { Moment } from 'moment';
import { ActionTree, MutationTree, StoreOptions } from 'vuex';
import axios from '@/axios/fetch';

// 查询对象
interface SearchForm {
  teacherId?: string;
  classId?: string;
  classRange?: string;
  dateRange?: Moment[];
  startDate?: string;
  endDate?: string;
  type?: number;
}
// loading对象
interface LoadingType {
  key: string;
  type: boolean;
}
interface ColorList {
  cIcon?: string;
  cTitle?: string;
  cDate?: string;
  cNum?: number;
  cCompare?: string;
  cType?: boolean;
  cColor?: string;
}
interface TimeCircle {
  number?: number;
  title?: string;
  percent?: number;
  color?: string;
}
interface TransformData {
  title?: string;
  number?: number;
  percent?: string;
  pgColor?: string;
  bgColor?: string;
}

class SearchClass {
  categoryId?: string; // 分类Id ,

  classId?: string; // 班级Id ,

  endDate?: string; // 止时间 ,

  startDate?: string; // 起时间 ,

  teacherId?: string; // 教师Id ,

  type?: number; // 0-本日,1-本周,2-本月 ,

  userId?: string; // 学生Id

  constructor(data: SearchForm) {
    this.classId = data.classId;
    this.teacherId = data.teacherId;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.type = data.type; // type为必填参数，传参时做的处理，默认传的2
  }
}

class State {
  searchForm: SearchForm = {
    // dateRange: [moment().subtract(30, 'days'), moment()],
  }; // 查询对象

  allLoading = {
    cardList: false, // card-list
    record: false, // 记录
    timeColumn: false, // 学时-柱
    timeCircle: false, // 学时-环
    transform: false, // 转化
    distribution: false, // 分布
  }; // loading

  /**
   * @param cNum 数量
   * @param cCompare 增减百分比
   * @param cType 增true 减false
   */
  colorList: ColorList[] = [
    {
      cIcon: 'iconxuexijilu-01',
      cTitle: '学习记录',
      cDate: '本月',
      cNum: 0,
      cCompare: '+45%',
      cType: true,
      cColor: '#357EF7',
    }, // 学习记录
    {
      cIcon: 'iconyiwanchengjilu-01',
      cTitle: '已完成记录',
      cDate: '本月',
      cNum: 0,
      cCompare: '+45%',
      cType: true,
      cColor: '#FEB807',
    }, // 已完成记录
    {
      cIcon: 'iconjiluleijishichang-01',
      cTitle: '记录累计时长',
      cDate: '本日',
      cNum: 0,
      cCompare: '+25%',
      cType: true,
      cColor: '#FD7D26',
    }, // 记录累计时长
    {
      cIcon: 'iconwanchengzhe-01',
      cTitle: '完成者',
      cDate: '本周',
      cNum: 0,
      cCompare: '-25%',
      cType: false,
      cColor: '#52C41A',
    }, // 完成者
  ]; // 顶部list

  recordData = []; // 学习记录 chartData

  timeColumn = []; // 记录学时 chartData

  /**
   * @param number 小时
   * @param percent 进度 0~1
   */
  timeCircle: TimeCircle[] = [
    {
      number: 0, // 总时间
      title: '总学时',
      percent: 0, // 百分比 0~1
      color: 'rgb(53,126,247)',
    },
    {
      number: 0,
      title: 'PC学时',
      percent: 0,
      color: 'rgb(103,158,250)',
    },
    {
      number: 0,
      title: 'APP学时',
      percent: 0,
      color: 'rgb(150,186,245)',
    },
  ]; // 记录学时 progressData

  /**
   * @param number 小时
   * @param percent 进度
   */
  transformData: TransformData[] = [
    {
      title: '加入案例学习',
      number: 0,
      percent: '0%',
      pgColor: 'rgb(53,126,247)',
      bgColor: 'rgb(194,216,252)',
    },
    {
      title: '访问案例课时页',
      number: 0,
      percent: '0%',
      pgColor: 'rgb(82,196,26)',
      bgColor: 'rgb(203,237,186)',
    },
    {
      title: '完成案例学习',
      number: 0,
      percent: '0%',
      pgColor: 'rgb(254,184,7)',
      bgColor: 'rgb(254,233,180)',
    },
  ]; // 记录转化 Data

  /**
   * @param type 类型
   * @param value 数值
   */
  distributionData = [
    { type: '异常', value: 0 },
    { type: '已关闭', value: 0 },
    { type: '已完成', value: 0 },
    { type: '未完成', value: 0 },
    { type: '未学习', value: 0 },
  ]; // 记录分别 pieData
}

class StatisticsStudy implements StoreOptions<State> {
  namespaced = true;

  state = new State();

  mutations: MutationTree<State> = {
    upSearchForm(store, data) {
      store.searchForm = data;
    },
    upLoading(store, data: LoadingType) {
      if (data.key === 'cardList') {
        store.allLoading.cardList = data.type;
      } else if (data.key === 'record') {
        store.allLoading.record = data.type;
      } else if (data.key === 'timeColumn') {
        store.allLoading.timeColumn = data.type;
      } else if (data.key === 'timeCircle') {
        store.allLoading.timeCircle = data.type;
      } else if (data.key === 'transform') {
        store.allLoading.transform = data.type;
      } else if (data.key === 'distribution') {
        store.allLoading.distribution = data.type;
      }
    },
    upColorData(store, data) {
      store.colorList = store.colorList.map((item, key) => {
        const isAdd = !`${data[key].rate}`.includes('-');
        const compare = isAdd ? `+${data[key].rate}%` : `${data[key].rate}%`;
        // 处理累计时长——后端返回是秒数——产品需要？
        // ×就是显示秒数
        // let number: number|undefined = 0;
        // if (key === 2 && data[key].count) {
        //   number = Math.round((data[key].count || 0) / 3600);
        // } else { number = data[key].count; }
        const iData = {
          ...item,
          cNum: data[key].count || 0,
          cCompare: compare,
        };
        return iData;
      });
    },
    upRecordData(store, data) {
      store.recordData = data;
    },
    upTimeColumn(store, data) {
      // const indexType = 3;
      // const currData = data[indexType - 1];
      // data[indexType - 1] = data[0];
      // data[0] = currData;
      // bug：总-P-A 但是g2的图表显示是根据第一组来的，所以对前三个进行一个重新排序（更换位置）
      // remark：es规范 Use array destructuring. 最后用数组解构重新赋值 arr1用来占位
      const [arr0, arr1, arr2, ...arrAll] = data;
      data = [arr2, arr0, arr1, ...arrAll];
      store.timeColumn = data;
    },
    upTimeCircle(store, data) {
      if (data.length > 0) {
        store.timeCircle = store.timeCircle.map((item, key) => {
          const iData = {
            ...item,
            number: data[key].count || 0,
            percent: Math.abs(data[key].rate || 0) / 100,
          };
          return iData;
        });
      }
    },
    upTransform(store, data) {
      if (data.length > 0) {
        store.transformData = store.transformData.map((item, key) => {
          const iData = {
            ...item,
            number: data[key].count,
            percent: `${Math.abs(data[key].rate || 0)}%`,
          };
          return iData;
        });
      }
    },
    upDistribution(store, data) {
      store.distributionData = data;
    },
  };

  actions: ActionTree<State, unknown> = {
    // color-list
    getColorList({ commit }, data) {
      const formData = new SearchClass(data);
      commit('upLoading', { key: 'cardList', type: true });
      // axios.post('./api/mock/studyColorList', formData).then((res) => {
      //   console.log(res, 'ressss');
      // });
      return new Promise((resolve, reject) => {
        axios
          .post('api/statist/queryStudyTop', formData)
          .then((res) => {
            commit('upColorData', res.data.data || []);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          })
          .finally(() => {
            commit('upLoading', { key: 'cardList', type: false });
          });
      });
    },
    // record
    getRecordData({ commit }, data) {
      const formData = new SearchClass(data);
      console.log(data, 'datadatadatadatadata');
      commit('upLoading', { key: 'record', type: true });
      return new Promise((resolve, reject) => {
        axios
          .post('api/statist/queryStudyStatist', formData)
          .then((res) => {
            commit('upRecordData', res.data.data || []);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          })
          .finally(() => {
            commit('upLoading', { key: 'record', type: false });
          });
      });
    },
    // timeColumn
    getTimeColumn({ commit }, data) {
      const formData = new SearchClass(data);
      commit('upLoading', { key: 'timeColumn', type: true });
      return new Promise((resolve, reject) => {
        axios
          .post('api/statist/queryStudyTime', formData)
          .then((res) => {
            commit('upTimeColumn', res.data.data || []);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          })
          .finally(() => {
            commit('upLoading', { key: 'timeColumn', type: false });
          });
      });
    },
    // timeCircle
    getTimeCircle({ commit }, data) {
      const formData = new SearchClass(data);
      commit('upLoading', { key: 'timeCircle', type: true });
      return new Promise((resolve, reject) => {
        axios
          .post('api/statist/queryStudyTimeRing', formData)
          .then((res) => {
            commit('upTimeCircle', res.data.data || []);
            console.log(res, 'timeCircle');
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          })
          .finally(() => {
            commit('upLoading', { key: 'timeCircle', type: false });
          });
      });
    },
    // transform
    getTransform({ commit }, data) {
      const formData = new SearchClass(data);
      commit('upLoading', { key: 'transform', type: true });
      return new Promise((resolve, reject) => {
        axios
          .post('api/statist/queryRecordConversion', formData)
          .then((res) => {
            // console.log(res, 'resss');
            commit('upTransform', res.data.data || []);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          })
          .finally(() => {
            commit('upLoading', { key: 'transform', type: false });
          });
      });
    },
    // distribution
    getDistribution({ commit }, data) {
      const formData = new SearchClass(data);
      commit('upLoading', { key: 'distribution', type: true });
      return new Promise((resolve, reject) => {
        axios
          .post('api/statist/queryRecordDistribution', formData)
          .then((res) => {
            // console.log(res, 'resss');
            commit('upDistribution', res.data.data || []);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          })
          .finally(() => {
            commit('upLoading', { key: 'distribution', type: false });
          });
      });
    },
  };
}
export { SearchForm };
export default new StatisticsStudy();
