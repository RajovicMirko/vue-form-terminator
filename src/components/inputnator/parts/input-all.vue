<template>
  <fragment>
    <!-- INPUT LABEL -->
    <label
      :for="element.id"
      v-if="element.label"
      :class="{
        invalid: element.haveErrors,
        [element.positioning.label]: element.positioning.label,
      }"
      >{{ element.label }}</label
    >

    <!-- INPUT ERROR MESSAGE -->
    <small
      class="errornator invalid"
      :class="element.positioning.errorMessage"
      >{{ element.errorMessage() }}</small
    >

    <!-- Others input type -->
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

    <!-- SemanticUI input type -->
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
  </fragment>
</template>

<script>
// This element is used for input types: text, number, email, password
export default {
  name: "InputAll",

  props: {
    element: {
      type: Object,
      required: true,
    },
  },

  methods: {
    handleInput(element) {
      element.isValid();
    },
  },
};
</script>
