<template lang="pug">
.main.flex.flex-row
  .m-left {{props.title}}
  .m-right(:style="{background:props.bgColor}")
    .mr-progress(:style="{background:props.pgColor,width:props.percent,opacity: 1}")
      .mrp-text(:style="{left:`calc(${props.percent} / 2)`}") {{props.number}}, {{props.percent}}
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: {
      type: String,
      default: () => '加入案例学习',
    },
    number: {
      type: Number,
      default: () => 30,
    },
    percent: {
      type: String,
      default: () => '30%',
    },
    pgColor: {
      type: String,
      default: () => '#357EF7',
    },
    bgColor: {
      type: String,
      default: () => 'rgb(194,216,252)',
    },
  },
  setup(props) {
    return {
      props,
    };
  },
});
</script>

<style lang="stylus" scoped>
.main
  height 24px
  .m-left
    width 100px
    margin-right 12px
    line-height 24px
    height 24px
  .m-right
    width calc(100% - 112px)
    border-radius 4px
    overflow hidden
    height 24px
    .mr-progress
      color #ffffff
      line-height 24px
      height 24px
      // text-align center
      position: relative;
      .mrp-text
        position absolute
        width: 110px;
        text-align: center;
</style>
