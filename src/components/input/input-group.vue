<template>
  <div :class="group.class">
    <custom-input
      v-for="item in group.items"
      :key="item.name"
      :item="item"
      :errorMessagePosition="errorMessagePosition"
    ></custom-input>
  </div>
</template>

<script>
import input from "@c/input/input.vue";

export default {
  name: "custom-input-group",

  components: {
    "custom-input": input
  },

  props: {
    group: {
      type: Object,
      required: true
    },
    errorMessagePosition: {
      type: String,
      required: true
    }
  },

  computed: {
    cssType() {
      if (this.item.otherClasses) {
        const validUi = ["ui"];

        return validUi.indexOf(this.item.otherClasses.substring(0, 2)) !== -1
          ? "semanticui-test"
          : "";
      }

      return "";
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
