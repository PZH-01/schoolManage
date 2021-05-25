<template lang='pug'>
.content
  .chr(ref='container')
  .table
    a-table(
      :columns='columns',
      :data-source='data',
      :pagination='pagination',
      rowKey='id',
      @change='pageChange'
    )
</template>
<script lang='ts'>
import * as echarts from 'echarts/core';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import {
  Button, Form, Input, Select, Table, DatePicker,
} from 'ant-design-vue';
import {
  ref, reactive, defineComponent, onMounted, watch,
} from 'vue';
import { useStore } from 'vuex';

echarts.use([TooltipComponent, LegendComponent, PieChart, CanvasRenderer]);

export default defineComponent({
  props: {
    EchartsData: {
      type: Object,
      default: () => {},
    },
  },
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
  setup(props) {
    const store = useStore();
    const container = ref();
    const chart = ref();
    const option = reactive({
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '5%',
        left: 'center',
      },
      series: [
        {
          name: '数据来源',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: '学习记录' },
            { value: 735, name: '已完成记录' },
            { value: 580, name: '记录累计时长' },
            { value: 484, name: '完成人数' },
            { value: 300, name: '学习时长' },
          ],
        },
      ],
    });
    const setChart = () => {
      option.series.forEach((item: any, index) => {
        if (index === 0) {
          item.data[0].value = props.EchartsData.data1;
        }
        if (index === 1) {
          item.data[1].value = props.EchartsData.data2;
        }
        if (index === 2) {
          item.data[2].value = props.EchartsData.data3;
        }
        if (index === 3) {
          item.data[3].value = props.EchartsData.data4;
        }
        if (index === 4) {
          item.data[4].value = props.EchartsData.data5;
        }
      });
      chart.value = echarts.init(container.value);
      chart.value.setOption(option, true);
    };
    watch(
      () => props.EchartsData,
      (newValue, oldValue) => {
        setChart();
      },
    );

    // 列表配置项
    const columns = reactive([
      {
        title: '学习记录',
        dataIndex: 'studyLog',
        width: '20%',
        align: 'left',
      },
      {
        title: '已完成记录',
        dataIndex: 'finishLog',
        align: 'left',
        width: '20%',
      },
      {
        title: '记录累计时长',
        dataIndex: 'timeLog',
        width: '20%',
        align: 'left',
      },
      {
        title: '完成人数',
        dataIndex: 'finishNumber',
        width: '20%',
        align: 'left',
      },
      {
        title: '学习时长',
        dataIndex: 'studyTime',
        width: '20%',
        align: 'left',
      },
    ]);
    // 列表数据源
    const data = ref([]);
    // 列表分页器配置项
    const pagination = reactive({
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      showQuickJumper: true,
      showSizeChanger: true,
      total: 0,
      current: 1,
      pageSize: 10,
    });
    // 获取列表数据
    const getListData = async (pageNo = 1) => {
      const { pageSize } = pagination;
      // 请求参数
      const queryLogData = {
        pageNo,
        pageSize,
      };
      const res = await store.dispatch(
        'StatisticsStudy/getListData',
        queryLogData,
      );
      data.value = res.list;
      pagination.current = res.pageNo;
      pagination.total = res.totalRecords;
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
      getListData(current);
    }
    onMounted(() => {
      setChart();
      getListData();
    });
    return {
      container,
      columns,
      data,
      pagination,
      pageChange,
    };
  },
});
</script>
<style lang='stylus' scoped>
.content
  width 100%
  background #ffffff
  box-shadow 0px 0px 2px 1px rgba(0, 0, 0, 0.03)
  border-radius 10px
  margin 20px 0px
  display flex
  .chr
    width 25%
    height 662px
  .table
    width 75%
    height 100%
    padding 20px
</style>
