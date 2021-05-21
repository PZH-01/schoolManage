<template lang="pug">
.main(v-bind:id="props.renderId", :style="{height:`${props.chartHeight}px`}")
</template>

<script lang="ts">
import {
  defineComponent, onMounted, PropType, watch,
} from 'vue';
import { Line } from '@antv/g2plot';

interface RenderField {
  xField: string;
  yField: string;
  seriesField: string;
}

export default defineComponent({
  props: {
    renderId: {
      type: String,
      default: () => 'record-line-chart',
    },
    renderField: {
      type: Object,
      default: () => ({
        xField: 'xValue',
        yField: 'yValue',
        seriesField: 'value',
      }),
    },
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
    let line: null|Line;

    onMounted(() => {
      line = new Line(props.renderId, {
        data: props.renderData,
        xField: props.renderField.xField, // 'xValue', year
        yField: props.renderField.yField, // 'yValue', value
        seriesField: props.renderField.seriesField, // 'value', category
        smooth: true,
        legend: {
          layout: 'horizontal',
          position: 'bottom',
        },
        yAxis: {
          label: {
          // 数值格式化为千分位
            formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
          },
        },
        xAxis: {
          tickCount: 7, // 默认7个点
          tickInterval: props.renderTick, // 间隔数
        },
      });
      line.render();
    });

    watch(
      () => props.renderData,
      async (newV) => { if (newV && line) line.changeData(props.renderData); },
      { immediate: true, deep: true },
    );
    watch(
      () => props.renderTick,
      async () => { if (line) line.update({ xAxis: { tickInterval: props.renderTick } }); },
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
