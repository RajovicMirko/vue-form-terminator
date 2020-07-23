<template>
  <div class="buttonator">
    <button
      v-for="action in actions"
      :key="action.id"
      :type="action.type"
      :class="{ [action.otherClasses]: action.otherClasses }"
    >
      <i class="iconator" :class="action.icon" v-if="action.icon"></i>
      <span class="name" v-if="action.name">{{ action.name }}</span>
    </button>
  </div>
</template>

<script>
import componentMixin from "@m/component-mixin.js";

export default {
  name: "Buttonator",

  mixins: [componentMixin],

  props: {
    actions: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss">
@import "@sc/buttonator/global.scss";
</style>
