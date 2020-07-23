<template>
  <span class="titlenator" :class="{ [titlePosition]: titlePosition }">{{
    title
  }}</span>
</template>

<script>
export default {
  name: "Titlenator",
  props: {
    title: {
      type: String,
    },
    titlePosition: {
      type: String,
    },
  },
};
</script>

<style lang="scss">
@import "@sc/titlenator/global.scss";
</style>
