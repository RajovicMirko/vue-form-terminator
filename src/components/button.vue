<template>
  <button
    :type="action.type"
    :class="{ [action.otherClasses]: action.otherClasses }"
  >
    <i class="iconator" :class="action.icon" v-if="action.icon"></i>
    <span class="name" v-if="action.name">{{ action.name }}</span>
  </button>
</template>

<script>
export default {
  name: "Buttonator",

  props: {
    action: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss">
@import "@sc/button/global.scss";
</style>
