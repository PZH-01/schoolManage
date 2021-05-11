<template lang='pug'>
.imgbox
  .imgdiv
    .left
      span.span1 全部记录
      span.span3 {{ RecordsTotal.total }}
    .right
      img(src='@/assets/img/allrecords.png')
  .imgdiv(
    style='background: linear-gradient(135deg, #ffd03b 0%, #feb807 100%)'
  )
    .left
      span.span1 待学习
      span.span3 {{ RecordsTotal.tolearn }}
    .right
      img(src='@/assets/img/tolearn.png')
  .imgdiv(
    style='background: linear-gradient(135deg, #edac7f 0%, #fd7d26 100%)'
  )
    .left
      span.span1 学习中
      span.span3 {{ RecordsTotal.learning }}
    .right
      img(src='@/assets/img/learning.png')
  .imgdiv(
    style='background: linear-gradient(135deg, #d5b8ff 0%, #ac84ff 100%)'
  )
    .left
      span.span1 已完成
      span.span3 {{ RecordsTotal.completed }}
    .right
      img(src='@/assets/img/completed.png')
  .imgdiv(
    style='background: linear-gradient(135deg, #a1e281 0%, #52c41a 100%)'
  )
    .left
      span.span1 异常
      span.span3 {{ RecordsTotal.abnormal }}
    .right
      img(src='@/assets/img/abnormal.png')
</template>
<script lang='ts'>
import { defineComponent, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();
    // 学习记录总条数
    const RecordsTotal = computed(() => store.state.Header.RecordsTotal);
    // 获取学习记录总条数
    const getLearnRecordsTotal = () => {
      store.dispatch('Header/getLearnRecordsTotal');
    };
    onMounted(() => {
      getLearnRecordsTotal();
    });
    return { RecordsTotal };
  },
});
</script>
<style lang='stylus' scoped>
.imgbox
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
