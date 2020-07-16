<template>
  <div class="group">
    <custom-input
      v-for="item in items"
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
    "custom-input": input,
  },

  props: {
    items: {
      type: Array,
      required: true,
    },
    errorMessagePosition: {
      type: String,
      required: true,
    },
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
    },
  },

  methods: {
    handleInput(item) {
      item.isValid;
    },
  },
};
</script>

<style lang="scss">
.group {
  display: flex;

  justify-content: space-between;
  width: 100%;

  // & .custom-item {
  //   width: 100%;
  //   margin: 0;
  // }
}

@media (max-width: 930px) {
  .group {
    flex-direction: column;

    & .custom-item {
      width: 100% !important;
      margin: 0 !important;
    }
  }
}
</style>
