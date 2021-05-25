<template lang="pug">
.main
  the-search.search
  .imgbox
    .imgdiv
      .left
        span.span1 学习记录
        span.span3 {{ RecordsTotal.total }}
      .right
        img(src='@/assets/img/allrecords.png')
    .imgdiv(
      style='background: linear-gradient(135deg, #ffd03b 0%, #feb807 100%)'
    )
      .left
        span.span1 已完成记录
        span.span3 {{ RecordsTotal.tolearn }}
      .right
        img(src='@/assets/img/tolearn.png')
    .imgdiv(
      style='background: linear-gradient(135deg, #edac7f 0%, #fd7d26 100%)'
    )
      .left
        span.span1 记录累计时长
        span.span3 {{ RecordsTotal.learning }}
      .right
        img(src='@/assets/img/learning.png')
    .imgdiv(
      style='background: linear-gradient(135deg, #d5b8ff 0%, #ac84ff 100%)'
    )
      .left
        span.span1 完成者
        span.span3 {{ RecordsTotal.completed }}
      .right
        img(src='@/assets/img/completed.png')
  .foot.margin-top-24.flex.flex-row
    //- the-transform.chart-transform
    //- the-distribution.chart-distribution
    the-stackedChart(:EchartsData='EchartsDatas')
    the-lineHistogramChart(:EchartsData='EchartsDatass')
    the-PieChart(:EchartsData='EchartsDatasss')
</template>

<script lang="ts">
import { computed, defineAsyncComponent, onMounted } from 'vue';
import { useStore } from 'vuex';
import { Spin } from 'ant-design-vue';

export default {
  components: {
    aSpin: Spin,
    theDistribution: defineAsyncComponent(
      () => import('./Study/Distribution.vue'),
    ),
    theRecord: defineAsyncComponent(() => import('./Study/Record.vue')),
    theTransform: defineAsyncComponent(() => import('./Study/Transform.vue')),
    theTime: defineAsyncComponent(() => import('./Study/Time.vue')),
    theSearch: defineAsyncComponent(() => import('./Study/Search.vue')),
    colorCard: defineAsyncComponent(() => import('./Study/ui/ColorCard.vue')),
    theStackedChart: defineAsyncComponent(
      () => import('./Charts/stackedChart.vue'),
    ),
    theLineHistogramChart: defineAsyncComponent(
      () => import('./Charts/lineHistogramChart.vue'),
    ),
    thePieChart: defineAsyncComponent(() => import('./Charts/pieChart.vue')),
  },
  setup() {
    const store = useStore();
    // 学习记录总条数
    const RecordsTotal = computed(() => store.state.Header.RecordsTotal);
    // 获取学习记录总条数
    const getLearnRecordsTotal = () => {
      store.dispatch('Header/getLearnRecordsTotal');
    };
    // 堆叠图区域的数据
    const EchartsDatas = computed(
      () => store.state.StatisticsStudy.stackedChart,
    );
    // 折线柱状图区域的数据
    const EchartsDatass = computed(
      () => store.state.StatisticsStudy.lineHistogramChart,
    );
    // 饼图区域的数据
    const EchartsDatasss = computed(() => store.state.StatisticsStudy.pieChart);
    onMounted(() => {
      getLearnRecordsTotal();
    });

    return {
      RecordsTotal,
      EchartsDatas,
      EchartsDatass,
      EchartsDatasss,
    };
  },
};
</script>

<style lang="stylus" scoped>
.main
  width 100%
  .card
    width 100%
    >>>.card-head
      display flex
      justify-content space-between
  .margin-top-24
    margin-top 24px
  .foot
    display flex
    flex-direction column
  .imgbox
    margin 20px 0px
    display flex
    justify-content space-between
  .imgdiv
    height 79px
    background linear-gradient(135deg, #81CEFF 0%, #357EF7 100%)
    border-radius 8px
    display flex
    justify-content center
    align-items center
    margin-left 4px
    margin-right 4px
    flex 1
  .span1
    width 100px
  .left
    width 60px
    margin-right 30px
    display flex
    flex-direction column
  .left .span1
    font-size 14px
    font-family PingFangSC-Regular, PingFang SC
    font-weight 400
    color #FFFFFF
    line-height 20px
  .left .span3
    font-size 25px
    font-family PingFangSC-Medium, PingFang SC
    font-weight 500
    color #FFFFFF
    line-height 36px
  .right
    width 59px
    height 59px
  .right img
    width 100%
    background #FFFFFF
    opacity 0.6
    border-radius 50%
</style>
