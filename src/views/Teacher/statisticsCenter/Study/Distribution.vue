<template lang="pug">
the-card.main(:frame='["head", "body"]')
  template(v-slot:head-left)
    .head-left.font-size-16.font-weight-500.font-color-333333 记录分布
  template(v-slot:body)
    a-spin(:spinning='allLoading.distribution')
      the-pie-chart.body(:chartHeight='250', :renderData='pieChartData')
</template>

<script lang="ts">
import { Spin } from 'ant-design-vue';
import { computed, defineAsyncComponent, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  components: {
    aSpin: Spin,
    // thePieChart: defineAsyncComponent(() => import('./chart/PieChart.vue')),
    thePieChart: defineAsyncComponent(
      () => import('@/components/chart/PieChart.vue'),
    ),
    theCard: defineAsyncComponent(() => import('./ui/RadiusCard.vue')),
  },
  setup() {
    const store = useStore();
    const pieChartData = computed(
      () => store.state.StatisticsStudy.distributionData,
    );
    const allLoading = computed(() => store.state.StatisticsStudy.allLoading);
    return {
      pieChartData,
      allLoading,
    };
  },
});
</script>

<style lang="stylus" scoped>
.main
  .body
    margin-bottom 10px
</style>
