<template lang='pug'>
.content
  .chr(ref='container')
</template>
<script lang='ts'>
import * as echarts from 'echarts/core';
import {
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components';
import { BarChart, LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import {
  ref, reactive, defineComponent, onMounted, watch,
} from 'vue';

echarts.use([
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  LineChart,
  CanvasRenderer,
]);

export default defineComponent({
  props: {
    EchartsData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const container = ref();
    const chart = ref();
    const option = reactive({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999',
          },
        },
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      legend: {
        data: ['学习时长', '完成人数', '平均每日学习时长'],
      },
      xAxis: [
        {
          type: 'category',
          data: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月',
          ],
          axisPointer: {
            type: 'shadow',
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          name: '累计时长',
          min: 0,
          max: 250,
          interval: 50,
          axisLabel: {
            formatter: '{value} 小时',
          },
        },
        {
          type: 'value',
          name: '完成人数',
          min: 0,
          max: 100,
          interval: 5,
          axisLabel: {
            formatter: '{value} 人',
          },
        },
      ],
      series: [
        {
          name: '学习时长',
          type: 'bar',
          data: [
            2.0,
            4.9,
            7.0,
            23.2,
            25.6,
            76.7,
            135.6,
            162.2,
            32.6,
            20.0,
            6.4,
            3.3,
          ],
        },
        {
          name: '完成人数',
          type: 'bar',
          data: [
            2.6,
            5.9,
            9.0,
            26.4,
            28.7,
            70.7,
            175.6,
            182.2,
            48.7,
            18.8,
            6.0,
            2.3,
          ],
        },
        {
          name: '平均每日学习时长',
          type: 'line',
          yAxisIndex: 1,
          data: [
            2.0,
            2.2,
            3.3,
            4.5,
            6.3,
            10.2,
            20.3,
            23.4,
            23.0,
            16.5,
            12.0,
            6.2,
          ],
        },
      ],
    });
    const setChart = () => {
      option.series.forEach((item: any, index) => {
        if (index === 0) {
          item.data = props.EchartsData.data1;
        }
        if (index === 1) {
          item.data = props.EchartsData.data2;
        }
        if (index === 2) {
          item.data = props.EchartsData.data3;
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
    onMounted(() => {
      setChart();
    });
    return {
      container,
    };
  },
});
</script>
<style lang='stylus' scoped>
.content
  width 100%
  height 507px
  background #ffffff
  box-shadow 0px 0px 2px 1px rgba(0, 0, 0, 0.03)
  border-radius 10px
  margin 20px 0px
  .chr
    width 100%
    height 100%
</style>
