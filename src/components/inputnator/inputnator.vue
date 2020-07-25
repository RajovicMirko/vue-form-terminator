<template>
  <!-- LABEL INPUT ERROR -->
  <div
    class="inputnator"
    :class="{
      [element.inputComponentClass]: element.inputComponentClass,
      [element.otherClasses]:
        element.otherClasses && element.inputComponentClass,
      [element.customClasses]: element.customClasses,
      [element.id]: element.id,
      checkboxnator: element.type === 'checkbox',
      [element.positioning.checkbox]: ['checkbox'].indexOf(element.type) !== -1,
    }"
  >
    <input-all
      :element="element"
      v-if="
        ['text', 'number', 'email', 'password', 'date'].indexOf(
          element.type
        ) !== -1
      "
    ></input-all>

    <input-checkbox
      :element="element"
      v-if="['checkbox'].indexOf(element.type) !== -1"
    ></input-checkbox>
  </div>
</template>

<script>
import inputAll from "@c/inputnator/parts/input-all.vue";
import inputCheckbox from "@c/inputnator/parts/input-checkbox.vue";

export default {
  name: "Inputnator",

  components: {
    "input-all": inputAll,
    "input-checkbox": inputCheckbox,
  },

  props: {
    element: {
      type: Object,
      required: true,
    },
  },

  // methods: {
  //   handleInput(element) {
  //     element.isValid();
  //   },
  // },
};
</script>

<style lang="scss">
@import "@sc/inputnator/global.scss";
@import "@sc/inputnator/semantic-ui.scss";
</style>
