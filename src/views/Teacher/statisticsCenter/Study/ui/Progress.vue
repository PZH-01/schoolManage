<template lang="pug">
.main.flex.justify-center.align-items-center
  the-progress-chart(
    :renderId='props.renderId'
    :percent='props.percent'
    :color='props.color'
  ).progress
  .title.font-weight-500.font-color-333333 {{props.title}}
  .number.font-weight-500.font-color-333333 {{getNumber(props.number)}}
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';

export default defineComponent({
  components: {
    // theProgressChart: defineAsyncComponent(() => import('../chart/ProgressChart.vue')),
    theProgressChart: defineAsyncComponent(() => import('@/components/chart/ProgressChart.vue')),
  },
  props: {
    renderId: {
      type: String,
      default: () => 'the-progress-chart',
    },
    number: {
      type: Number,
      default: () => 0,
    },
    title: {
      type: String,
      default: () => '总学时',
    },
    percent: {
      type: Number,
      default: () => 0.5028,
    },
    color: {
      type: String,
      default: () => '#5B8FF9',
    },
  },
  setup(props) {
    const getNumber = (n: number) => (n || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1, ');
    return {
      props,
      getNumber,
    };
  },
});
</script>

<style lang="stylus" scoped>
.main
  flex-direction column
  .title
    margin-top 8px
  .number
    margin-top 6px
    font-size 18px
</style>
