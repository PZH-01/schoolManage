import { Moment } from 'moment';
import { ActionTree, MutationTree, StoreOptions } from 'vuex';
import axios from '@/axios/api';

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

  // 堆叠图区域的数据
  stackedChart = {};

  // 折线柱状图区域的数据
  lineHistogramChart = {};

  // 饼图区域的数据
  pieChart = {};
}

class StatisticsStudy implements StoreOptions<State> {
  namespaced = true;

  state = new State();

  mutations: MutationTree<State> = {
    // 更新堆叠图区域
    updateStackedChart(store, data) {
      store.stackedChart = data;
    },
    // 更新折线柱状图区域
    updateLineHistogramChart(store, data) {
      store.lineHistogramChart = data;
    },
    // 更新饼图区域
    updatePieChart(store, data) {
      store.pieChart = data;
    },
  };

  actions: ActionTree<State, unknown> = {
    // 获取堆叠图的数据
    getStackedChart({ commit }) {
      return new Promise((resolve, reject) => {
        axios.getStackedChart().then((res) => {
          console.log(res.data.data);
          commit('updateStackedChart', res.data.data || []);
          resolve(res);
        });
      });
    },
    // 获取折线柱状图的数据
    getLineHistoGramChart({ commit }) {
      return new Promise((resolve, reject) => {
        axios.getLineHistoGramChart().then((res) => {
          console.log(res.data.data);
          commit('updateLineHistogramChart', res.data.data || []);
          resolve(res);
        });
      });
    },
    // 获取饼图的数据
    getPieChart({ commit }) {
      return new Promise((resolve, reject) => {
        axios.getPieChart().then((res) => {
          console.log(res.data.data);
          commit('updatePieChart', res.data.data || []);
          resolve(res);
        });
      });
    },
    // 获取表格的数据
    getListData({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.getListData(data).then((res) => {
          console.log(res.data.data);
          resolve(res.data.data);
        });
      });
    },
  };
}
export { SearchForm };
export default new StatisticsStudy();
