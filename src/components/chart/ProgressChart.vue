<template lang="pug">
.main(v-bind:id="props.renderId")
</template>

<script lang="ts">
import { RingProgress } from '@antv/g2plot';
import { defineComponent, onMounted, watch } from 'vue';

export default defineComponent({
  props: {
    renderId: {
      type: String,
      default: () => 'progress-chart',
    },
    renderWidth: {
      type: Number,
      default: () => 100,
    },
    renderHeight: {
      type: Number,
      default: () => 100,
    },
    color: {
      type: String,
      default: () => '#5B8FF9',
    },
    percent: {
      type: Number,
      default: () => 0.5028,
    },
  },
  setup(props) {
    let ringProgress: null|RingProgress = null;

    onMounted(() => {
      ringProgress = new RingProgress(props.renderId, {
        height: props.renderHeight,
        width: props.renderWidth,
        autoFit: false,
        percent: props.percent,
        color: props.color,
      });
      ringProgress.render();
    });

    watch(
      () => props.percent,
      (newV) => {
        if (newV && ringProgress) ringProgress.changeData(props.percent);
      },
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
