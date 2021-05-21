<template lang="pug">
the-card.main(:frame="['head','body']")
  template(v-slot:head-left)
    .head-left.font-size-16.font-weight-500.font-color-333333 记录转化
  template(v-slot:head-right)
    .head-right
      a-config-provider(:auto-insert-space-in-button="false")
        a-button.hr-btn.btns-radius-04.default-btns-blue(
          v-for="(v,k) in ['本日','本周','本月']"
          @click='typeSearch(k)',
          :type="btnType===k?'primary':'default'"
          :class="{'btn-color':btnType===k}"
        ) {{ ['本日','本周','本月'][k] }}
  template(v-slot:body)
    a-spin(:spinning="allLoading.transform")
      .body
        .body-contain
          the-color-progress.body-item(
            v-for="(v, k) in transformData" :key="`progress-${k+1}`",
            :title='v.title',
            :number='v.number',
            :percent='v.percent',
            :pgColor='v.pgColor',
            :bgColor='v.bgColor',
          )
</template>

<script lang="ts">
import { Button, ConfigProvider, Spin } from 'ant-design-vue';
import {
  computed, defineAsyncComponent, defineComponent, ref, SetupContext,
} from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  components: {
    aButton: Button,
    aSpin: Spin,
    aConfigProvider: ConfigProvider,
    theColorProgress: defineAsyncComponent(() => import('./ui/ColorProgress.vue')),
    theCard: defineAsyncComponent(() => import('./ui/RadiusCard.vue')),
  },
  setup(props: unknown, context: SetupContext) {
    const store = useStore();
    const transformData = computed(() => store.state.StatisticsStudy.transformData);
    const allLoading = computed(() => store.state.StatisticsStudy.allLoading);
    const btnType = ref<number|undefined>(0);

    const typeSearch = (type: number) => {
      btnType.value = type;
      context.emit('data-refresh', { type });
    };
    return {
      transformData,
      allLoading,
      typeSearch,
      btnType,
    };
  },
});
</script>

<style lang="stylus" scoped>
.main
  .head-right
    .hr-btn
      margin-left 16px
  .body
    height 237px
    .body-contain
      margin-top 30px
      .body-item
        margin-bottom 52px
        &:last-child
          margin-bottom 0
  .btn-color
    color #ffffff
</style>
