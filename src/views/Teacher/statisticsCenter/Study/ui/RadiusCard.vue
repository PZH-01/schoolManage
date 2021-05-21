<template lang="pug">
.card
  .card-head.flex.flex-row.space-between(v-if="frameInclude('head')")
    .head-left
      slot(name="head-left")
    .head-right
      slot(name="head-right")
  .card-line(v-if="props.hasLine")
  .card-body(v-if="frameInclude('body')")
    slot(name='body')
  .card-foot(v-if="frameInclude('foot')")
    slot(name="foot")
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    frame: {
      type: Array,
      default: () => ['head', 'body', 'foot'],
    },
    hasLine: {
      type: Boolean,
      default: () => false,
    },
  },
  setup(props) {
    const frameInclude = (type: string) => {
      if (props?.frame) {
        return props.frame.includes(type);
      }
      return false;
    };
    return {
      props,
      frameInclude,
    };
  },
});
</script>

<style lang="stylus" scoped>
.card
  background #ffffff
  box-shadow 0px 0px 2px 1px rgba(0, 0, 0, 0.03)
  border-radius 10px
  .card-head
    .head-left
      padding 16px 0px 16px 16px
    .head-right
      padding 16px 16px 16px 0
  .card-body
    padding 16px
    padding-bottom 0px
  .card-line
    border-bottom 1px solid #F0F0F0
  .card-foot
    padding 16px
    .foot-left
      height auto
    .foot-right
      height auto
</style>
