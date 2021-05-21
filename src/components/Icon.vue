<template lang="pug">
svg.icon(aria-hidden='true')
  use(:xlink:href='`#${type}`')
</template>
<script lang="ts">
export default {
  // mounted() {
  //   const s = document.createElement('script');
  //   s.type = 'text/javascript';
  //   // s.src = '//at.alicdn.com/t/font_2170940_v5dil3mazup.js';
  //   // s.src = '//at.alicdn.com/t/font_2170940_tdqz8mc82.js';
  //   s.src = '//at.alicdn.com/t/font_2170940_ta4szykxcn.js';
  //   document.body.appendChild(s);
  //   // const l = document.createElement('link');
  //   // l.rel = 'stylesheet';
  //   // l.href = '//at.alicdn.com/t/font_2170940_n19dks4roti.css';
  //   // document.head.appendChild(l);
  // },
  props: {
    type: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang="stylus" scoped>
.icon
  width 1em
  height 1em
  vertical-align -0.15em
  fill currentColor
  overflow hidden
</style>
