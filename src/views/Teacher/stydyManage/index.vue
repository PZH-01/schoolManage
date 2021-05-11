<template lang="pug">
.main
  Header
  List
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';

export default defineComponent({
  components: {
    Header: defineAsyncComponent(
      () => import('@/views/Teacher/stydyManage/Header.vue'),
    ),
    List: defineAsyncComponent(
      () => import('@/views/Teacher/stydyManage/List.vue'),
    ),
  },
  props: {},
  setup() {},
});
</script>

<style lang="stylus" scoped>
.main
  .div
    margin 50px auto
</style>
