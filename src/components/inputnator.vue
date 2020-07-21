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
    }"
  >
    <!-- INPUT LABEL -->
    <label
      :for="element.id"
      v-if="element.label"
      :class="{
        invalid: element.haveErrors,
        [element.positioning.label]: element.positioning.label
       }"
    >{{ element.label }}</label>

    <!-- Others input type -->
    <input
      v-if="element.inputComponentClass"
      :class="{ 
        invalid: element.haveErrors,
        [element.positioning.text]: element.positioning.text,
      }"
      :type="element.type"
      :id="element.id"
      :name="element.name"
      :placeholder="element.placeholder"
      v-model="element.value"
      @input="handleInput(element)"
    />

    <!-- SemanticUI input type -->
    <input
      v-if="!element.inputComponentClass"
      :class="{
        [element.otherClasses]:
          element.otherClasses && !element.inputComponentClass,
        invalid: element.haveErrors,
        [element.positioning.text]: element.positioning.text,
      }"
      :type="element.type"
      :id="element.id"
      :name="element.name"
      :placeholder="element.placeholder"
      v-model="element.value"
      @input="handleInput(element)"
    />

    <!-- INPUT ERROR MESSAGE -->
    <small
      class="errornator invalid"
      :class="element.positioning.errorMessage"
    >{{ element.errorMessage() }}</small>
  </div>
</template>

<script>
export default {
  name: "Inputnator",

  props: {
    element: {
      type: Object,
      required: true
    }
  },

  methods: {
    handleInput(element) {
      element.isValid();
    }
  }
};
</script>

<style lang="scss">
@import "@sc/inputnator/global.scss";
@import "@sc/inputnator/semantic-ui.scss";
</style>
