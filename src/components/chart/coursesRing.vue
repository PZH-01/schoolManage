<!--
 * @Author: 王琪瑞
 * @Date: 2020-12-02 17:13:13
 * @LastEditTime: 2020-12-09 18:16:58
 * @LastEditors: 王琪瑞
-->
<template lang="pug">
.courses-ring(v-if="props.chartId", :id="props.chartId")
</template>

<script lang="ts">
import { PropType, onMounted, watch } from 'vue';
import { RingProgress } from '@antv/g2plot';

interface ChartProps {
  chartId: string;
  color: Array<string>;
  mix: number;
}

export default {
  props: {
    chartId: {
      type: String as PropType<string>,
      default: '',
    },
    color: {
      type: Array as PropType<Array<string>>,
      default() {
        return [];
      },
    },
    mix: {
      type: Number as PropType<number>,
      default: 0,
    },
  },
  setup(props: ChartProps) {
    /** 课程占比 圆环图 */
    let ringChart: RingProgress | null = null;

    function renderChart() {
      ringChart = new RingProgress(props.chartId, {
        height: 120,
        width: 120,
        autoFit: false,
        percent: props.mix,
        color: ['#357EF7', '#C2D8FC'],
        innerRadius: 0.85,
        radius: 0.98,
      });

      ringChart.render();
    }

    onMounted(() => {
      renderChart();
    });

    // 监听
    watch(
      () => props.mix,
      async (newV) => {
        if (newV) {
          if (ringChart) {
            ringChart.changeData(props.mix);
          }
        }
      },
      {
        immediate: true,
        deep: true,
      },
    );

    return { props, renderChart, ringChart };
  },
};
</script>

<style lang="stylus" scoped></style>
