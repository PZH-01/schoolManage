<template lang="pug">
.log
  .search
    a-form.form(layout='inline', :model='searchForm')
      a-form-item(label='登录人员:', name='name')
        a-select(
          style='width: 160px',
          v-model:value='searchForm.code',
          placeholder='登录人员',
          allowClear,
          show-search,
          @search='getUserLists',
          :filterOption='false'
        )
          a-select-option(
            v-for='item in userList',
            :value='item.code',
            :key='item.code'
          ) {{ item.name }}
      a-form-item(label='时间:')
        a-range-picker(v-model:value='searchForm.time', showTime)
      a-form-item.btns
        a-button(type='primary', @click='submitSearch(1)') 查询
        a-button(@click='resetSearch') 重置
  .list1
    a-table(
      :columns='columns',
      :data-source='data',
      :pagination='pagination',
      :loading='queryLogLoding',
      rowKey='id',
      @change='pageChange'
    )
      template(v-slot:logincode='{ text, record }')
        a-button(type='link', @click='goToInfo(record)') {{ text }}
</template>
<script lang="ts">
import {
  Button, Form, Input, Select, Table, DatePicker,
} from 'ant-design-vue';
import {
  ref, reactive, onMounted, Ref,
} from 'vue';
import { useStore } from 'vuex';
import { useForm } from '@ant-design-vue/use';
import { useRouter } from 'vue-router';

interface Pagination {
  pageSizeOptions: string[];
  showQuickJumper: boolean;
  showSizeChanger: boolean;
  total: number;
  current: number;
  pageSize: number;
}

// 表格模块
function queryTable() {
  const router = useRouter();
  // 列表配置项
  const columns = reactive([
    {
      title: '登录时间',
      dataIndex: 'logintime',
      width: '20%',
      align: 'left',
    },
    {
      title: '登录人员',
      dataIndex: 'logincode',
      align: 'left',
      width: '20%',
      slots: { customRender: 'logincode' },
    },
    {
      title: '登录IP',
      dataIndex: 'ip',
      width: '20%',
      align: 'left',
    },
    {
      title: '地址',
      dataIndex: 'address',
      width: '20%',
      align: 'left',
    },
  ]);
  // 列表数据源
  const data = ref([]);
  // 列表请求中状态变量
  const queryLogLoding = ref(false);
  // 列表分页器配置项
  const pagination = reactive({
    pageSizeOptions: ['10', '20', '30', '40', '50'],
    showQuickJumper: true,
    showSizeChanger: true,
    total: 0,
    current: 1,
    pageSize: 10,
  });

  // // 跳转详情页
  // function goToInfo({
  //   className,
  //   userCode,
  // }: {
  //   className: string;
  //   userCode: string;
  // }) {
  //   // 先判断是老师还是学生,再进行跳转
  //   if (className === "教师班级") {
  //     router.push({
  //       name: "teacherInfo",
  //       params: { id: userCode },
  //     });
  //   } else {
  //     router.push({
  //       name: "studentInfo",
  //       params: { id: userCode },
  //     });
  //   }
  // }
  return {
    columns,
    data,
    queryLogLoding,
    pagination,
    // goToInfo,
  };
}

// 条件查询模块
function queryConditions(
  pagination: Pagination,
  queryLogLoding: Ref<boolean>,
  data: Ref<never[]>,
) {
  const store = useStore();
  // 查询参数
  const searchForm = reactive({
    code: undefined,
    time: [],
  });
  // 查询登录日志数据
  async function getLogList(pageNo = 1) {
    // await
    const { pageSize } = pagination;
    const startTime = searchForm.time[0];
    const endTime = searchForm.time[1];
    const userCode = searchForm.code;
    // 请求参数
    const queryLogData = {
      pageNo,
      pageSize,
      startTime,
      endTime,
      userCode,
    };
    queryLogLoding.value = true;
    const res = await store.dispatch('LogManages/getLogList', queryLogData);
    data.value = res.list;
    pagination.current = res.pageNo;
    pagination.total = res.totalRecords;
    queryLogLoding.value = false;
  }

  // 分页切换
  function pageChange({
    current,
    pageSize,
  }: {
    current: number;
    pageSize: number;
  }) {
    pagination.pageSize = pageSize;
    getLogList(current);
  }

  // 获取用户列表
  const userList = ref([]);
  function getUserLists(value: string) {
    store
      .dispatch('LogManages/getUserLists', {
        name: value,
      })
      .then((res) => {
        userList.value = res.list;
      });
  }

  // 查询参数规则
  const searchRules = reactive({});
  const { resetFields, validate, validateInfos } = useForm(
    searchForm,
    searchRules,
  );
  // 查询
  const submitSearch = () => {
    validate()
      .then(() => {
        getLogList();
      })
      .catch((err) => {
        console.log('error', err);
      });
  };
  // 重置
  const resetSearch = () => {
    resetFields();
  };
  return {
    searchForm,
    getLogList,
    pageChange,
    getUserLists,
    userList,
    searchRules,
    resetFields,
    validate,
    validateInfos,
    submitSearch,
    resetSearch,
  };
}

export default {
  components: {
    aButton: Button,
    aInput: Input,
    aInputSearch: Input.Search,
    aSelect: Select,
    aSelectOption: Select.Option,
    aRangePicker: DatePicker.RangePicker,
    aForm: Form,
    aFormItem: Form.Item,
    aTable: Table,
  },
  setup() {
    // 引入表格模块
    const {
      columns,
      data,
      queryLogLoding,
      pagination,
      // goToInfo,
    } = queryTable();
    // 引入条件查询模块
    const {
      searchForm,
      getLogList,
      pageChange,
      getUserLists,
      userList,
      searchRules,
      resetFields,
      validate,
      validateInfos,
      submitSearch,
      resetSearch,
    } = queryConditions(pagination, queryLogLoding, data);

    onMounted(() => {
      getLogList();
      getUserLists('');
    });

    return {
      columns,
      pagination,
      queryLogLoding,
      data,
      getLogList,
      resetFields,
      validate,
      validateInfos,
      submitSearch,
      resetSearch,
      searchForm,
      searchRules,
      // goToInfo,
      pageChange,
      userList,
      getUserLists,
    };
  },
};
</script>
<style lang="stylus" scoped>
.log
  display flex
  flex-direction column
  background #F5F8FB
  .search
    height 51px
    background #FFFFFF
    box-shadow 0px 0px 2px 2px rgba(0, 0, 0, 0.03)
    border-radius 8px
    display flex
    align-items center
    justify-content space-between
    .ant-input-search
      width 200px
      margin-left 20px
    .form
      margin-left 50px
      display flex
      justify-content space-between
      flex 1
      .ant-btn
        margin 0 18px
        border-radius 4px
  .list1
    margin-top 19px
    background #FFFFFF
    box-shadow 0px 0px 2px 2px rgba(0, 0, 0, 0.03)
    border-radius 8px
    padding 13px
</style>
