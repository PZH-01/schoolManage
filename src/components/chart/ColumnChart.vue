<template lang="pug">
.main(v-bind:id="props.renderId", :style="{height:`${props.chartHeight}px`}")
</template>

<script lang="ts">
import {
  defineComponent, onMounted, PropType, watch,
} from 'vue';
import { Column } from '@antv/g2plot';

interface RenderField {
  xField: string;
  yField: string;
  seriesField: string;
}

export default defineComponent({
  props: {
    renderId: {
      type: String,
      default: () => 'record-column-chart',
    },
    renderField: {
      type: Object,
      default: () => ({
        xField: 'xValue',
        yField: 'yValue',
        seriesField: 'value',
      }),
    },
    // 柱状图 横轴间隔数
    renderTick: {
      type: Number as PropType<number|undefined>,
      default: () => undefined,
    },
    renderData: {
      type: Array as PropType<Array<RenderField>>,
      default: () => [],
    },
    chartHeight: {
      type: Number,
      default: () => 400,
    },
    // 柱状图类型 stack堆积图 group分组柱状图
    chartType: {
      type: String,
      default: () => 'stack',
    },
  },
  setup(props) {
    let columnPlot: null|Column = null;

    onMounted(() => {
      columnPlot = new Column(props.renderId, {
        data: props.renderData,
        isStack: props.chartType === 'stack',
        isGroup: props.chartType === 'group',
        xField: props.renderField.xField,
        yField: props.renderField.yField,
        seriesField: props.renderField.seriesField,
        label: {
          // 可手动配置 label 数据标签位置
          position: 'bottom', // 'top', 'bottom', 'middle'
          // 可配置附加的布局方法
          layout: [
            // 柱形图数据标签位置自动调整
            { type: 'interval-adjust-position' },
            // 数据标签防遮挡
            { type: 'interval-hide-overlap' },
            // 数据标签文颜色自动调整
            { type: 'adjust-color' },
          ],
        },
        legend: {
          layout: 'horizontal',
          position: 'bottom',
        },
        xAxis: {
          tickCount: 7, // 默认7个点
          tickInterval: props.renderTick, // 间隔数
        },
        // color: ['#96BAF5', '#679EFA', '#357EF7'],
        color: ['#357EF7', '#679EFA', '#96BAF5'],
      });

      columnPlot.render();
    });

    watch(
      () => props.renderData,
      async (newV) => { if (newV && columnPlot) columnPlot.changeData(props.renderData); },
      { immediate: true, deep: true },
    );
    watch(
      () => props.renderTick,
      async () => { if (columnPlot) columnPlot.update({ xAxis: { tickInterval: props.renderTick } }); },
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
