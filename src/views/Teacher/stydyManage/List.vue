<template lang="pug">
.filter
  //- AdvancedSearch
  .title
    span.span1 数据筛选
  a-form.formout(layout='inline')
    .forms
      a-form-item(label='输入查询:')
        a-input(
          placeholder='用户名称',
          v-model:value='searchForm.mixedName',
          style='width: 100px'
        )
      a-form-item(label='输入查询:')
        a-input(
          placeholder='案例编号/案例名称',
          v-model:value='searchForm.mainTitle',
          ,
          style='width: 140px'
        )
      a-form-item(label='状态:')
        a-select(
          v-model:value='searchForm.statusStr',
          placeholder='全部',
          style='width: 160px',
          allowClear
        )
          a-select-option(value='待学习') 待学习
          a-select-option(value='学习中') 学习中
          a-select-option(value='已完成') 已完成
          a-select-option(value='异常') 异常
      a-form-item(label='课程分类:')
        a-select(
          v-model:value='searchForm.seniorCategory',
          placeholder='全部',
          style='width: 150px',
          allowClear
        )
          a-select-option(v-for='item in sort', :value='item.id') {{ item.categoryName }}
      a-form-item(label='时间:', style='width: 50%')
        a-range-picker(v-model:value='searchForm.time', showTime)
    a-form-item.btns
      a-button(type='primary', @click='submitForm') 查询
      a-button(@click='resetForm') 重置
.list
  a-tabs
    a-tab-pane(tab='数据列表')
      a-table(
        :columns='columns',
        :data-source='data',
        :pagination='pagination',
        :loading='queryRecordLoding',
        :row-selection='{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }',
        rowKey='id',
        @change='pageChange'
      )
        template(v-slot:equi='{ text, record }') {{ record.duration > 0 && record.appDuration > 0 ? "PC,APP" : record.duration > 0 ? "PC" : record.appDuration > 0 ? "APP" : " " }}
        template(v-slot:badge='{ text, record }')
          a-badge(v-if='record.abnormalMark == true', color='cyan', text='异常')
          a-badge(
            v-else-if='record.studyStatus == 1',
            color='orange',
            text='学习中'
          )
          a-badge(
            v-else-if='record.studyStatus == 0',
            color='yellow',
            text='待学习'
          )
          a-badge(
            v-else-if='record.studyStatus == 2',
            color='purple',
            text='已完成'
          )
        template(v-slot:action='{ text, record }')
          .option
            .option-container(@click='showViewrecord(record)')
              a 查看
            .option-container(@click='delrecord(record)')
              span 重置记录
    template(v-slot:tabBarExtraContent)
      Abnormal
      //- a-button.btn(type='primary', @click='studyExport') 导出
  .table-foot
    .all-check.btn-other
      a-checkbox(:checked='checked.check', @change='onSelectAll') 全选
    .all-check.btn-other
      a-checkbox(:checked='checkedother.check', @change='selectOther') 反选
    a-select.more-btn.btn-other(placeholder='批量操作', style='width: 120px')
      a-select-option(
        @click='closeCheckedRecords',
        value='closeCheckedRecords'
      ) 重置
  a-modal(
    :visible='viewrecord.show',
    title='查看记录',
    dialogClass='modal-help',
    :width='500',
    :footer='null',
    @cancel='closeViewrecord'
  )
    a-form(layout='vertical', :label-col='labelCol')
      a-form-item(label='加入学习:') {{ records.startDate }}
      a-form-item(label='访问课时页:') {{ records.startPeriodDate }}
      a-form-item(label='完成学习:') {{ records.doneDate || "未完成" }}
      a-form-item(label='学习进度:')
        .card
          .left
            a-avatar(shape='square', :size='74', :src='records.userCover')
          .right
            .top
              span.name {{ records.username }}
              //- a-button.guanzhu 关注
              //- a-button.guanzhu 发私信
            .bottom
              .up
                span 学习进度
              .down
                a-progress(:percent='records.studyProgress')
</template>
<script lang="ts">
import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Progress,
  Select,
  Table,
  Tabs,
  DatePicker,
  message,
} from 'ant-design-vue';
import {
  reactive, onMounted, defineComponent, ref, Ref, computed,
} from 'vue';
import { useForm } from '@ant-design-vue/use';
import { useStore } from 'vuex';
// import { definitions } from '@/../types/api';
// import Abnormal from './Abnormal.vue';

const List = defineComponent({
  name: 'List',
  components: {
    aTabs: Tabs,
    aTable: Table,
    aButton: Button,
    aTabPane: Tabs.TabPane,
    aModal: Modal,
    aInput: Input,
    aForm: Form,
    aFormItem: Form.Item,
    aCheckbox: Checkbox,
    aSelect: Select,
    aSelectOption: Select.Option,
    aBadge: Badge,
    aAvatar: Avatar,
    aProgress: Progress,
    aRangePicker: DatePicker.RangePicker,
  },
  setup() {
    function toHHmmss(date: number) {
      let s = date;
      let m = 0;
      let h = 0;
      if (s > 60) {
        m = Math.floor(s / 60);
        s = Math.floor(s % 60);
        if (m > 60) {
          h = Math.floor(m / 60);
          m = Math.floor(m % 60);
        }
      }
      const time = `${h < 10 ? `0${h}` : h}:${m < 10 ? `0${m}` : m}:${
        s < 10 ? `0${s}` : s
      }`;
      return time;
    }
    const store = useStore();
    // 列表配置项
    const columns = reactive([
      {
        title: '案例名称',
        dataIndex: 'teacherCaseName',
        width: '17%',
        align: 'left',
      },
      {
        title: '加入时间',
        dataIndex: 'startDate',
        align: 'left',
        width: '18%',
      },
      {
        title: '用户名称',
        dataIndex: 'username',
        align: 'left',
        width: '10%',
      },
      {
        title: '学习时长',
        dataIndex: 'sumDuration',
        width: '10%',
        align: 'left',
      },
      {
        title: '学习设备',
        dataIndex: 'equipment',
        width: '15%',
        align: 'left',
        slots: { customRender: 'equi' },
      },
      {
        title: '学习状态',
        dataIndex: 'studyStatus',
        width: '10%',
        align: 'left',
        slots: { customRender: 'badge' },
      },
      {
        title: '操作',
        dataIndex: 'action',
        width: '20%',
        align: 'left',
        slots: { customRender: 'action' },
      },
    ]);
    // 列表请求中状态变量
    let queryRecordLoding = false;
    // 列表分页器配置项
    const pagination = reactive({
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      showQuickJumper: true,
      showSizeChanger: true,
      total: 0,
      current: 1,
      pageSize: 10,
    });
    // 列表数据源
    const data = ref([]);
    // 普通查询数据绑定
    const searchForm = reactive({
      mixedName: undefined,
      mainTitle: undefined,
      statusStr: undefined,
      seniorCategory: undefined,
      time: [],
    });
    // 普通查询数据验证规则
    const searchRules = reactive({});
    const { resetFields, validate, validateInfos } = useForm(
      searchForm,
      searchRules,
    );
    // 清除普通查询
    function resetForm() {
      resetFields();
    }
    // 课程分类
    const sort = computed(() => store.state.Lists.sort);
    // 教师获取课程分类
    function teacherSort() {
      store.dispatch('Lists/teacherSort');
    }
    // 管理员获取课程分类
    function adminSort() {
      store.dispatch('Lists/adminSort');
    }
    // 查询学习记录列表
    async function getSearchRecordsList(pageNo = 1) {
      const { mixedName } = searchForm;
      const { mainTitle } = searchForm;
      const { statusStr } = searchForm;
      const { seniorCategory } = searchForm;
      const startTime = searchForm.time[0];
      const endTime = searchForm.time[1];
      const { pageSize } = pagination;
      const queryData = {
        mixedName,
        mainTitle,
        statusStr,
        seniorCategory,
        startTime,
        endTime,
        pageSize,
        pageNo,
      };
      const res = await store.dispatch(
        'Lists/getSearchRecordsList',
        queryData,
      );
      data.value = res.list;
      pagination.current = res.pageNo;
      pagination.total = res.totalRecords;
      queryRecordLoding = false;
      if (sessionStorage.getItem('role') === 'admin') {
        adminSort();
      } else {
        teacherSort();
      }
    }
    // 提交普通查询
    const submitForm = () => {
      validate()
        .then(() => {
          getSearchRecordsList();
          console.log('提交普通查询');
        })
        .catch((err) => {
          console.log('error', err);
        });
    };
    // 分页切换
    function pageChange({
      current,
      pageSize,
    }: {
      current: number;
      pageSize: number;
    }) {
      pagination.pageSize = pageSize;
      getSearchRecordsList(current);
    }
    // 多选框选中项
    const selectedRowKeys: Ref<string[]> = ref([]);
    // 表格选择回调
    function onSelectChange(selectedRowKeya: string[]) {
      console.log('当前选中项', selectedRowKeya);
      selectedRowKeys.value = selectedRowKeya;
    }
    // 选中所有数据
    const checked = reactive({ check: false });
    function onSelectAll() {
      if (checked.check) {
        onSelectChange([]);
      } else {
        const datakey = data.value.map((item: { id: string }) => item.id);
        onSelectChange(datakey);
      }
      checked.check = !checked.check;
    }
    // 反选
    const checkedother = reactive({ check: false });
    function selectOther() {
      if (checkedother.check) {
        onSelectChange([]);
      } else {
        const datakey = data.value.map((item: { id: string }) => item.id);
        selectedRowKeys.value.forEach((item) => {
          datakey.forEach((element) => {
            if (element === item) {
              datakey.splice(datakey.indexOf(item), 1);
            }
          });
        });
        onSelectChange(datakey);
      }
      console.log('反选');
      checkedother.check = !checkedother.check;
    }
    const records = ref({});
    // 查看对话框是否显示
    const viewrecord = reactive({ show: false });
    function showViewrecord(record: {}) {
      viewrecord.show = true;
      console.log(record);
      records.value = record;
    }
    function closeViewrecord() {
      viewrecord.show = false;
    }
    // 关闭记录
    function delrecord(record: { id: string }) {
      Modal.confirm({
        title: '确定关闭记录吗?',
        content: '关闭记录后学生需要重新加入学习',
        cancelText: '取消',
        okText: '确定',
        onOk() {
          return new Promise((resolve, reject) => {
            store
              .dispatch('Lists/delrecord', record.id)
              .then((res) => {
                getSearchRecordsList();
                resolve(true);
              })
              .catch((err) => reject(err));
          });
        },
      });
    }
    // 关闭选中记录 批量操作
    function closeCheckedRecords() {
      if (selectedRowKeys.value.length) {
        Modal.confirm({
          title: '确定关闭记录吗?',
          content: '关闭记录后学生需要重新加入学习',
          cancelText: '取消',
          okText: '确定',
          onOk() {
            return new Promise((resolve, reject) => {
              store
                .dispatch('Lists/delrecordList', selectedRowKeys.value)
                .then((res) => {
                  getSearchRecordsList();
                  resolve(true);
                })
                .catch((err) => reject(err));
            });
          },
        });
      } else {
        message.error('至少选择一条数据');
      }
    }
    // 导出
    const studyExport = async () => {
      if (selectedRowKeys.value.length) {
        const tableName = [
          '案例名称',
          '加入时间',
          '用户账户',
          '学习时长',
          '学习设备',
          '学习状态',
        ];
        const tableData: (string | number | undefined)[][] = [];
        const esItem: any = {}; // eslint
        selectedRowKeys.value.forEach((id) => {
          const item = data.value.find((k: any) => k.id === id) || esItem;
          if (item) {
            const status = ['待学习', '学习中', '已完成'][
              item.studyStatus || 0
            ];
            tableData.push([
              item.teacherCaseName,
              item.startDate,
              item.username,
              item.duration,
              item.equipment,
              status,
            ]);
          }
        });
        await store
          .dispatch('StudyManagement/studyExport', { tableName, tableData })
          .then((res) => {
            if (res?.data?.data) window.open(res.data.data);
          });
      } else {
        message.error('至少选择一条数据');
      }
    };
    onMounted(() => {
      getSearchRecordsList();
    });
    const ifShowAbnormal = ref(false);
    function showSetAbnormal() {
      ifShowAbnormal.value = !ifShowAbnormal.value;
    }
    return {
      columns,
      viewrecord,
      showViewrecord,
      closeViewrecord,
      delrecord,
      pagination,
      queryRecordLoding,
      selectedRowKeys,
      onSelectChange,
      data,
      getSearchRecordsList,
      checked,
      onSelectAll,
      resetFields,
      validate,
      validateInfos,
      labelCol: { span: 4 },
      closeCheckedRecords,
      selectOther,
      checkedother,
      pageChange,
      records,
      searchForm,
      searchRules,
      resetForm,
      submitForm,
      ifShowAbnormal,
      showSetAbnormal,
      sort,
      studyExport,
      toHHmmss,
    };
  },
});
export default List;
</script>
<style lang="stylus" scoped>
.list
  margin-top 19px
  position relative
  .ant-tabs
    background #FFFFFF
    box-shadow 0px 0px 2px 2px rgba(0, 0, 0, 0)
    border-radius 8px
  .table-foot
    position absolute
    bottom 0px
    left 30px
    display flex
    flex-direction row
    justify-content space-between
    align-items center
    margin-bottom 16px
    .all-check
      width 80px
      height 32px
      border 1px solid #d9d9d9
    .ant-checkbox-wrapper
      margin-top 2px
      margin-left 11px
    .btn-other
      margin-right 10px
    .more-btn
      width 120px
      height 32px
  .ant-tabs
    background-color #fff
    padding 5px 25px
  :deep().ant-tabs-extra-content
    width 90%
    display flex
    justify-content space-between
    position relative
    top 8px
  .option
    display flex
    padding-right 10%
    align-items center
    .option-container
      position relative
      cursor pointer
      color #1890FF
      margin-right 15px
  .btn
    height 30px
    background #357EF7
    border-radius 4px
  .modal-help
    width 480px !important
    height 176px !important
.card
  width 350px
  height 120px
  background #FFFFFF
  box-shadow 0px 0px 4px 2px rgba(0, 0, 0, 0.03)
  border-radius 8px
  margin-left 75px
  display flex
  padding 10px
  .left
    width 30%
    display flex
    justify-content center
    align-items center
  .right
    width 70%
    display flex
    flex-direction column
    justify-content center
  .top
    width 100%
    display flex
    justify-content space-between
    align-items center
    .guanzhu
      border-radius 3px
      border 1px solid #D8D8D8
.filter
  height 130px
  background #FFFFFF
  box-shadow 0px 0px 2px 2px rgba(0, 0, 0, 0.03)
  border-radius 8px
  margin-top 19px
  padding 5px
  .title
    width 100%
    display flex
    justify-content space-between
    span
      margin 10px 15px
  .span1
    font-size 16px
    font-family PingFangSC-Medium, PingFang SC
    font-weight 600
    color #333333
    line-height 14px
  .span2
    font-size 16px
    font-family PingFangSC-Regular, PingFang SC
    font-weight 400
    color #357EF7
    line-height 14px
    cursor pointer
    padding-right 45px
  .formout
    margin-left 15px
    width 100%
    .forms
      width 100%
      display flex
      flex-wrap nowrap
      :deep().ant-form-item
        width 100%
        display flex
        flex-wrap nowrap
  .btns
    display flex
    justify-content flex-end
    margin-right 20px
    .ant-btn
      margin 0 18px
      border-radius 4px
  .btn
    color #357EF7
    color #357EF7
    border-radius 4px
    border 1px solid #357EF7
</style>
