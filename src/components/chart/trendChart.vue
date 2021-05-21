<!--
 * @Author: 王琪瑞
 * @Date: 2020-12-02 09:43:10
 * @LastEditTime: 2020-12-09 17:35:32
 * @LastEditors: 王琪瑞
-->
<template lang="pug">
.trend-chart(v-if="props.chartId", :id="props.chartId")
</template>

<script lang="ts">
import { PropType, onMounted, watch } from 'vue';
import { DualAxes } from '@antv/g2plot';
import { definitions } from '@/../types/api';

interface ChartProps {
  chartId: string;
  chartData: Array<definitions['StudyTopResponse']>;
}

export default {
  props: {
    chartId: {
      type: String as PropType<string>,
      default: '',
    },
    chartData: {
      type: Array as PropType<Array<definitions['StudyTopResponse']>>,
      default() {
        return [];
      },
    },
  },
  setup(props: ChartProps) {
    /** 成绩统计 成绩趋势 柱线混合图 */
    const data = [
      { context: '一月', score: 35, rate: 0.08 },
      { context: '二月', score: 90, rate: 0.06 },
      { context: '三月', score: 30, rate: 0.04 },
      { context: '四月', score: 45, rate: 0.03 },
      { context: '五月', score: 47, rate: 0.03 },
      { context: '六月', score: 47, rate: 0.04 },
      { context: '七月', score: 47, rate: 0.03 },
      { context: '八月', score: 47, rate: 0.05 },
      { context: '九月', score: 47, rate: 0.04 },
      { context: '十月', score: 47, rate: 0.04 },
      { context: '十一月', score: 47, rate: 0.05 },
      { context: '十二月', score: 47, rate: 0.04 },
    ];

    let trendChart: DualAxes | null = null;

    function RenderChart() {
      trendChart = new DualAxes(props.chartId, {
        data: [props.chartData, props.chartData],
        xField: 'context',
        yField: ['score', 'rate'],
        meta: {
          score: {
            alias: '分数',
          },
          rate: {
            alias: '分数增长率',
          },
        },
        geometryOptions: [
          {
            geometry: 'column',
            columnWidthRatio: 0.3,
          },
          {
            geometry: 'line',
            lineStyle: {
              lineWidth: 2,
            },
          },
        ],
        yAxis: {
          score: {
            nice: true,
          },
          rate: {
            nice: true,
            min: 0,
            label: {
              formatter: (val) => `${+val * 100}%`,
            },
          },
        },
        legend: {
          position: 'bottom',
        },
      });

      trendChart.render();
    }

    onMounted(() => {
      RenderChart();
    });

    // 监听
    watch(
      () => props.chartData,
      async (newV) => {
        if (newV) {
          if (trendChart) {
            trendChart.changeData([props.chartData, props.chartData]);
          }
        }
      },
      {
        immediate: true,
        deep: true,
      },
    );

    return {
      props, data, trendChart, RenderChart,
    };
  },
};
</script>

<style lang="stylus" scoped>
.trend-chart
  height 100%
</style>
