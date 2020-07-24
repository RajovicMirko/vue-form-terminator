<template>
  <div :class="{
      [group.class]: group.class,
    }">
    <div
      class="title"
      :class="{
        [group.positioning.title]: group.positioning.title,
      }"
    >
      <span class="text" v-if="group.title">{{ group.title }}</span>
    </div>

    <div class="group-data">
      <inputnator v-for="element in group.elements" :key="element.name" :element="element"></inputnator>
    </div>
  </div>
</template>

<script>
import inputnator from "@c/inputnator.vue";

export default {
  name: "Group",

  components: { inputnator },

  props: {
    group: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@import "@sc/group/global.scss";
</style>
