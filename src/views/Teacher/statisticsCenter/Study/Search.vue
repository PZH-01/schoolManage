<template lang="pug">
the-card.main(:frame='["head"]')
  template(v-slot:head-left)
    a-form.search-form(layout='inline', :model='searchForm')
      a-form-item(label='教师：', name='teacherId', v-if='isAdmin')
        a-select.search-input(
          v-model:value='searchForm.teacherId',
          placeholder='选择教师',
          style='width: 150px',
          allowClear,
          show-search,
          :default-active-first-option='false',
          @change='handleSearchClass("")',
          :filterOption='false'
        )
          a-select-option(
            v-for='v in selectTeachers',
            :key='v.code',
            :value='v.code'
          ) {{ v.name }}
      //- a-form-item(label='班级：', name='classId')
      //-   a-select.search-input(
      //-     v-model:value='searchForm.classId',
      //-     placeholder='选择班级',
      //-     style='width:150px;',
      //-     allowClear,
      //-     show-search,
      //-     :default-active-first-option="false",
      //-     :filterOption='false'
      //-   )
      //-     a-select-option( v-for="v in selectClass" :key="v.id" :value='v.id') {{v.name}}
      //- a-form-item(label='课程范围：', name='classRange')
      //-   a-select.search-input(
      //-     v-model:value='searchForm.classRange',
      //-     placeholder='选择课程范围',
      //-     style='width:150px;',
      //-     allowClear
      //-   )
      //-     a-select-option(key="succ" value='1') 正常账号
      //-     a-select-option(key="fail" value='2') 停用账号
      //-     a-select-option(key="iced" value='3') 冷冻账号
      //- a-form-item(label='时间:', name='dateRange')
      //-   a-range-picker(v-model:value='searchForm.dateRange' style='width:340px;', :allowClear='false')
  template(v-slot:head-right)
    .search-btn.flex.flex-row.align-items-center
      a-config-provider(:auto-insert-space-in-button='false')
        a-button.s-btn.btns-width-80.btns-radius-06(
          type='primary',
          style='margin-right: 16px',
          @click='searchList'
        ) 查询
      a-config-provider(:auto-insert-space-in-button='false')
        a-button.s-btn.btns-width-80.btns-radius-06(
          type='primary',
          ghost,
          @click='resetFields'
        ) 重置
</template>

<script lang="ts">
import {
  defineAsyncComponent,
  reactive,
  toRaw,
  watch,
  computed,
  onMounted,
  SetupContext,
  nextTick,
  ref,
} from 'vue';
import {
  Button,
  Form,
  Select,
  DatePicker,
  ConfigProvider,
} from 'ant-design-vue';
import { useStore } from 'vuex';
import { useForm } from '@ant-design-vue/use';
import { SearchForm } from '@/store/modules/statiscsCenter/StatisticsStudy';
import moment, { Moment } from 'moment';

export default {
  components: {
    aButton: Button,
    aForm: Form,
    aFormItem: Form.Item,
    aSelect: Select,
    aSelectOption: Select.Option,
    aRangePicker: DatePicker.RangePicker,
    aConfigProvider: ConfigProvider,
    theCard: defineAsyncComponent(() => import('./ui/RadiusCard.vue')),
  },
  setup(props: unknown, context: SetupContext) {
    const store = useStore();
    const isAdmin = sessionStorage.code === 'admin';
    const defaultTime = undefined; // [moment().subtract(30, 'days'), moment()];
    const searchForm = reactive<SearchForm>({
      classId: undefined,
      teacherId: isAdmin ? undefined : sessionStorage.code,
      classRange: undefined,
      dateRange: defaultTime,
    });
    const searchRule = reactive({});
    const { resetFields } = useForm(searchForm, searchRule);

    const disabledDate = (current: Moment) => current && current > moment().endOf('day'); // 禁用时间 - 去掉

    // const selectTeachers = computed(() => store.state.StudentController.selectTeachers);
    // const selectClass = computed(() => store.state.StudentController.selectClass);
    const selectTeachers = computed(() => store.state.user.teacherData);
    const selectClass = ref([]);
    // 远程搜索
    const handleSearchTeacher = async (value: string) => {
      // await store.dispatch('StudentController/getSelectTeacher', {
      //   keyWord: value,
      // });
    };
    const handleSearchClass = (value: string) => {
      const Search = {
        keyWord: value,
        userId: isAdmin ? searchForm.teacherId : sessionStorage.code,
      };
      // store.dispatch('StudentController/getSelectClass', Search);
    };

    const searchList = () => {
      context.emit('data-refresh');
    };

    onMounted(async () => {
      const search = {
        pageNo: 1,
        pageSize: 15,
      };
      store.dispatch('user/getTeacherList', search);
      await handleSearchTeacher('');
      handleSearchClass('');
      // store.comm =t('StatistStudy/upSearchForm', { dateRange: defaultTime });
      const arr: any = toRaw(selectTeachers.value);
      if (isAdmin && arr.length) {
        searchForm.teacherId = arr[0].userId;
        // store.commit('StatistStudy/upSearchForm', toRaw(searchForm));
      }
      nextTick(() => {
        searchList();
      });
    });

    watch(
      () => searchForm,
      (newV) => {
        // store.commit('StatistStudy/upSearchForm', toRaw(newV));
      },
      { immediate: true, deep: true },
    );

    return {
      isAdmin,
      searchForm,
      disabledDate,
      resetFields,
      searchList,
      // handleSearchTeacher,
      handleSearchClass,
      selectTeachers,
      selectClass,
    };
  },
};
</script>

<style lang="stylus" scoped>
.main
  .search-btn
    height 40px
</style>
