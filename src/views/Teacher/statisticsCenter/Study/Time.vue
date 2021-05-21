<template lang="pug">
the-card.main(:frame="['head','body','foot']")
  template(v-slot:head-left)
    .head-left.font-size-16.font-weight-500.font-color-333333 记录学时
  template(v-slot:head-right)
    .head-right.flex.flex-row
      .hr-btns
        a-config-provider(:auto-insert-space-in-button="false")
          a-button.hrb-btn.btns-radius-04.default-btns-blue(
            v-for="(v,k) in ['本日','本周','本月']"
            @click='typeSearch(k)',
            :type="btnType===k?'primary':'default'"
            :class="{'btn-color':btnType===k}"
          ) {{ ['本日','本周','本月'][k] }}
      //- .hr-search 2020年12月15日 此版本不做
        a-range-picker.hrs(v-model:value='searchForm.dateRange', @change='timeSearch')
  template(v-slot:body)
    a-spin(:spinning="allLoading.timeColumn")
      the-column-chart.body(renderId='record-column-chart', :renderData='columnChartData', :renderTick='tickInterval')
  template(v-slot:foot)
    a-spin(:spinning="allLoading.timeCircle")
      .foot.flex.flex-row.space-between.align-items-center
        the-progress(v-for="(v,k) in progressData" :key='`progress-chart-${k+1}`',
          :renderId='`progress-chart-${k+1}`',
          :number='v.number',
          :title='v.title',
          :percent='v.percent',
          :color='v.color',
        ).foot-item
</template>

<script lang="ts">
import {
  computed, defineAsyncComponent, defineComponent, reactive, ref, SetupContext,
} from 'vue';
import {
  Button, ConfigProvider, DatePicker, Spin,
} from 'ant-design-vue';
import { useStore } from 'vuex';
import { SearchForm } from '@/store/modules/statiscsCenter/StatisticsStudy';
import { Moment } from 'moment';

export default defineComponent({
  components: {
    aButton: Button,
    aSpin: Spin,
    aConfigProvider: ConfigProvider,
    aRangePicker: DatePicker.RangePicker,
    theProgress: defineAsyncComponent(() => import('./ui/Progress.vue')),
    // theColumnChart: defineAsyncComponent(() => import('./chart/ColumnChart.vue')),
    theColumnChart: defineAsyncComponent(() => import('@/components/chart/ColumnChart.vue')),
    theCard: defineAsyncComponent(() => import('./ui/RadiusCard.vue')),
  },
  setup(props: unknown, context: SetupContext) {
    const store = useStore();
    const progressData = computed(() => store.state.StatisticsStudy.timeCircle);
    const columnChartData = computed(() => store.state.StatisticsStudy.timeColumn);
    const allLoading = computed(() => store.state.StatisticsStudy.allLoading);
    const searchForm = reactive<SearchForm>({ dateRange: undefined });
    const btnType = ref<number|undefined>(0);
    const tickInterval = computed(() => {
      if (searchForm.dateRange) {
        return undefined; // 按天
      } if (btnType.value === 0) {
        return 3; // 按日
      } if (btnType.value === 1) {
        return 1; // 按周
      } if (btnType.value === 2) {
        return 4; // 按月
      }
      return undefined;
    });

    const typeSearch = (type: number) => {
      btnType.value = type;
      context.emit('data-refresh', { type });
    };
    const timeSearch = (dates: [Moment, Moment], dateStrings: [string, string]) => {
      context.emit('data-refresh', { startDate: dateStrings[0] || undefined, endDate: dateStrings[1] || undefined, type: btnType.value });
    };

    return {
      progressData,
      columnChartData,
      typeSearch,
      timeSearch,
      allLoading,
      searchForm,
      btnType,
      tickInterval,
    };
  },
});
</script>

<style lang="stylus" scoped>
.main
  .head-right
    .hr-btns
      .hrb-btn
        margin-right 16px
  .body
    height 460px
  .foot
    margin 0 auto
    width 420px
    .foot-item
      width 100px
  .btn-color
    color #ffffff
</style>
