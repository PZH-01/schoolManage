<template lang="pug">
the-card.main(:frame='["head", "body", "foot"]')
  template(v-slot:head-left)
    .head-left.font-size-16.font-weight-500.font-color-333333 学习记录统计
  template(v-slot:head-right)
    .head-right.flex.flex-row
      .hr-btns
        a-config-provider(:auto-insert-space-in-button='false')
          a-button.hrb-btn.btns-radius-04.default-btns-blue(
            v-for='(v, k) in ["本日", "本周", "本月"]',
            @click='typeSearch(k)',
            :type='btnType === k ? "primary" : "default"',
            :class='{ "btn-color": btnType === k }'
          ) {{ ["本日", "本周", "本月"][k] }}
      //- .hr-search 2020年12月15日 此版本不做
        a-range-picker.hrs(v-model:value='searchForm.dateRange', @change='timeSearch')
  template(v-slot:body)
    a-spin(:spinning='allLoading.record')
      the-line-chart.body(
        renderId='record-line-chart',
        :renderData='lineChartData',
        :renderTick='tickInterval'
      )
</template>

<script lang="ts">
import {
  Button, ConfigProvider, DatePicker, Spin,
} from 'ant-design-vue';
import {
  computed,
  defineAsyncComponent,
  defineComponent,
  reactive,
  ref,
  SetupContext,
} from 'vue';
import { useStore } from 'vuex';
import { SearchForm } from '@/store/modules/statiscsCenter/StatisticsStudy';
import { Moment } from 'moment';

export default defineComponent({
  components: {
    aButton: Button,
    aSpin: Spin,
    aConfigProvider: ConfigProvider,
    aRangePicker: DatePicker.RangePicker,
    // theLineChart: defineAsyncComponent(() => import('./chart/LineChart.vue')),
    theLineChart: defineAsyncComponent(
      () => import('@/components/chart/LineChart.vue'),
    ),
    theCard: defineAsyncComponent(() => import('./ui/RadiusCard.vue')),
  },
  setup(props: unknown, context: SetupContext) {
    const store = useStore();
    const lineChartData = computed(() => store.state.StatisticsStudy.recordData);
    const allLoading = computed(() => store.state.StatisticsStudy.allLoading);
    const searchForm = reactive<SearchForm>({ dateRange: undefined });
    const btnType = ref<number | undefined>(0);
    const tickInterval = computed(() => {
      if (searchForm.dateRange) {
        return undefined; // 按天
      }
      if (btnType.value === 0) {
        return 3; // 按日
      }
      if (btnType.value === 1) {
        return 1; // 按周
      }
      if (btnType.value === 2) {
        return 4; // 按月
      }
      return undefined;
    });
    const typeSearch = (type: number) => {
      btnType.value = type;
      context.emit('data-refresh', { type });
    };
    const timeSearch = (
      dates: [Moment, Moment],
      dateStrings: [string, string],
    ) => {
      context.emit('data-refresh', {
        startDate: dateStrings[0] || undefined,
        endDate: dateStrings[1] || undefined,
        type: btnType.value,
      });
    };
    return {
      lineChartData,
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
  .btn-color
    color #ffffff
</style>
