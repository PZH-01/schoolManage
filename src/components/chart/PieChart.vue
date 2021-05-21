<template lang="pug">
.main(v-bind:id="props.renderId", :style="{height:`${props.chartHeight}px`}")
</template>

<script lang="ts">
import {
  defineComponent, onMounted, PropType, watch,
} from 'vue';
import { Pie } from '@antv/g2plot';

export default defineComponent({
  props: {
    renderId: {
      type: String,
      default: () => 'pie-chart',
    },
    chartHeight: {
      type: Number,
      default: () => 300,
    },
    renderData: {
      type: Array as PropType<Array<Record<string, string|number>>>,
      default: () => [],
    },
  },
  setup(props) {
    let piePlot: null|Pie = null;
    onMounted(() => {
      piePlot = new Pie(props.renderId, {
        appendPadding: 10,
        data: props.renderData,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.64,
        meta: {
          value: {
            formatter: (v) => `${v}`,
          },
        },
        label: {
          type: 'inner',
          offset: '-50%',
          autoRotate: false,
          style: { textAlign: 'center' },
          formatter: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
        },
        statistic: {
          title: {
            offsetY: -8,
          },
          content: {
            offsetY: -4,
          },
        },
        legend: {
          layout: 'horizontal',
          position: 'bottom',
        },
        // 添加 中心统计文本 交互
        interactions: [
          { type: 'element-selected' },
          { type: 'element-active' },
          {
            type: 'pie-statistic-active',
            cfg: {
              start: [
                { trigger: 'element:mouseenter', action: 'pie-statistic:change' },
                { trigger: 'legend-item:mouseenter', action: 'pie-statistic:change' },
              ],
              end: [
                { trigger: 'element:mouseleave', action: 'pie-statistic:reset' },
                { trigger: 'legend-item:mouseleave', action: 'pie-statistic:reset' },
              ],
            },
          },
        ],
      });

      piePlot.render();
    });

    watch(
      () => props.renderData,
      (newV) => { if (newV && piePlot) piePlot.changeData(props.renderData); },
      { immediate: true, deep: true },
    );

    return {
      props,
    };
  },
});
</script>

<style lang="stylus" scoped>

</style>
