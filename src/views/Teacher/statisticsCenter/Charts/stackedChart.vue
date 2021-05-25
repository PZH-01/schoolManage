<template lang='pug'>
.content
  .chr(ref='container')
</template>
<script lang='ts'>
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import {
  ref, reactive, defineComponent, onMounted, watch,
} from 'vue';

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
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
      title: {
        text: '堆叠区域图',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
        },
      },
      legend: {
        data: ['学习记录', '已完成记录', '记录累计时长', '完成者'],
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '学习记录',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: '已完成记录',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: '记录累计时长',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: '完成者',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: [320, 332, 301, 334, 390, 330, 320],
        },
      ],
    });
    const setChart = () => {
      option.series.forEach((item, index) => {
        if (index === 0) {
          item.data = props.EchartsData.data1;
        }
        if (index === 1) {
          item.data = props.EchartsData.data2;
        }
        if (index === 2) {
          item.data = props.EchartsData.data3;
        }
        if (index === 3) {
          item.data = props.EchartsData.data4;
        }
        if (index === 4) {
          item.data = props.EchartsData.data5;
        }
        if (index === 5) {
          item.data = props.EchartsData.data6;
        }
        if (index === 6) {
          item.data = props.EchartsData.data7;
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
  margin 10px 0px
  .chr
    width 100%
    height 100%
</style>
