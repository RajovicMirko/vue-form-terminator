<template>
  <fragment>
    <!-- INPUT LABEL -->
    <label
      :for="element.id"
      v-if="element.label"
      :class="{ invalid: element.haveErrors }"
      >{{ element.label }}</label
    >

    <!-- Others input type -->
    <input
      v-if="!element.inputComponentClass"
      :class="{
        [element.otherClasses]:
          element.otherClasses && !element.inputComponentClass,
        invalid: element.haveErrors,
      }"
      :type="element.type"
      :id="element.id"
      :name="element.name"
      :placeholder="element.placeholder"
      v-model="element.value"
      @click="handleClick()"
    />

    <!-- INPUT ERROR MESSAGE -->
    <small class="errornator invalid">{{ element.errorMessage() }}</small>
  </fragment>
</template>

<script>
// This element is used for input types: checkbox
export default {
  name: "InputCheckbox",

  props: {
    element: {
      type: Object,
      required: true,
    },
  },

  methods: {
    handleClick() {
      this.element.value = !this.element.value;
      this.element.isValid();
    },
  },
};
</script>
