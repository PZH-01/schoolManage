<template lang="pug">
.card()
  .card-head
  .card-body.flex.flex-row.justify-start
    .b-left.flex.flex-row.align-items-center.justify-center(:style="{background:props.cColor}")
      a-icon.bl-icon(:type='props.cIcon', style='color:#ffffff;')
    .b-right
      .br-head.flex.flex-row.space-between.font-color-333333
        .brh-left.font-weight-500.font-size-16 {{props.cTitle}}
        //- .brh-right.font-weight-400 {{props.cDate}}
      .br-body.flex.flex-row.justify-start.align-items-center
        .brb-left.font-weight-400.font-color-333333 {{props.cNum}}
        //- .brb-center(:class="{'brbc-up':props.cType}") {{props.cCompare}} {{props.cType?'↑':'↓'}} <br />{{props.cType?'同比增长':'同比下降'}}
  .card-foot()
    //- img.img(:src="require(`/assets/statistics/${props.cBackground}`)")
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';

// interface ColorCardProps {
//   cIcon: string;
//   cTitle: string;
//   cDate: string;
//   cNum: number;
//   cCompare: string;
//   cType: boolean;
//   cBackground: string;
//   cColor: string;
// }

export default defineComponent({
  props: {
    cIcon: {
      type: String,
      require: true,
    },
    cTitle: {
      type: String,
      require: true,
    },
    cDate: {
      type: String,
      require: true,
    },
    cNum: {
      type: Number,
      require: true,
    },
    cCompare: {
      // 同比增长&下降
      type: String,
      require: true,
    },
    cType: {
      type: Boolean,
      require: true,
    },
    cBackground: {
      type: String,
      default: 'background1',
      require: true,
    },
    cColor: {
      type: String,
      default: '#357EF7',
      require: true,
    },
  },
  components: {
    aIcon: defineAsyncComponent(() => import('@/components/Icon.vue')),
  },
  setup(props) {
    return {
      props,
    };
  },
});
</script>

<style lang="stylus" scoped>

.card
  background #ffffff
  box-shadow 0px 0px 2px 1px rgba(0, 0, 0, 0.03)
  border-radius 10px
  overflow hidden
  // width 135px*2
  // height 80px*2
  width calc((100% - 48px) / 4)
  // height @width * (80 / 135)
  min-width calc(80px * 2 * (80 / 135)) // 135px*2
  min-height 80px * 2 // 80px*2
  .card-body
    padding 16px
    .b-left
      width 60px
      height 60px
      border-radius 30px
      font-size 16px
      overflow hidden
      .bl-icon
        width 40px
        height 40px
    .b-right
      width calc(100% - 70px)
      margin-left 10px
      .br-head
        width 100%
      .br-body
        .brb-left
          font-size 18px*2
          height 18px*2
          line-height 18px*2
        .brb-center
          padding-left 8px
          line-height 16px // 9px
          color #F22735
        .brbc-up
          color #6FA332
  .card-foot
    height 68px
    position relative
    .img
      width calc(100% - 30px)
      margin 0 auto
      position absolute
      bottom 0
      left 15px
</style>
