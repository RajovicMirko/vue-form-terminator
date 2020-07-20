<template>
  <div :class="group.class">
    <inputnator
      v-for="element in group.elements"
      :key="element.name"
      :element="element"
      :errorMessagePosition="errorMessagePosition"
    ></inputnator>
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
      required: true
    },
    errorMessagePosition: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss">
@import "@sc/variables.scss";

.group {
  margin: 0;
  padding: 0;

  display: flex;
  justify-content: space-between;
  width: 100%;

  & input {
    margin: 0;
  }
}

@media (max-width: $min-width) {
  .group {
    flex-direction: column;
  }
}
</style>
