<template>
  <!-- LABEL INPUT ERROR -->
  <div
    class="inputnator"
    :class="{
      [element.inputComponentClass]: element.inputComponentClass,
      [element.otherClasses]:
        element.otherClasses && element.inputComponentClass,
      [element.customClasses]: element.customClasses,
      [errorMessagePosition]: errorMessagePosition,
      [element.id]: element.id,
    }"
  >
    <!-- INPUT LABEL -->
    <label
      :for="element.id"
      v-if="element.label"
      :class="{ invalid: element.haveErrors }"
      >{{ element.label }}</label
    >

    <!-- Others input type -->
    <input
      v-if="element.inputComponentClass"
      :class="{ invalid: element.haveErrors }"
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
      }"
      :type="element.type"
      :id="element.id"
      :name="element.name"
      :placeholder="element.placeholder"
      v-model="element.value"
      @input="handleInput(element)"
    />

    <!-- INPUT ERROR MESSAGE -->
    <div class="errornator">
      <small class="invalid">{{ element.errorMessage() }}</small>
    </div>
  </div>
</template>

<script>
export default {
  name: "Inputnator",

  props: {
    element: {
      type: Object,
      required: true,
    },
    errorMessagePosition: {
      type: String,
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

<style lang="scss">
@import "@sc/variables.scss";

.inputnator {
  margin: 0;
  margin-bottom: 1rem;
  padding: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  width: 100%;

  & label {
    position: absolute;
  }

  & input {
    height: 2rem;
    line-height: 2rem;
    width: 100%;

    &.invalid {
      box-shadow: 0 0 0 1px $invalid-color;
      border-color: transparent;

      &:hover {
        box-shadow: 0 0 2px 0.5px $invalid-color;
      }

      &:focus {
        border-color: transparent;
        box-shadow: 0 0 0 2px $invalid-color;
      }
    }
  }

  & .errornator {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    white-space: nowrap;

    & small.invalid {
      height: $err-msg-font-size;
      line-height: $err-msg-font-size;
      font-size: $err-msg-font-size;
      color: $invalid-color;
    }
  }

  // ERROR MESSAGE ON TOP
  &.top {
    flex-direction: column-reverse;

    & label {
      top: -0.2rem;
    }

    & .errornator {
      margin-bottom: 0.2rem;
    }
  }

  // ERROR MESSAGE ON BOTTOM
  &.bottom {
    flex-direction: column;

    & label {
      top: -1.2rem;
    }

    & .errornator {
      margin-top: 0.2rem;
    }
  }

  // SemanticUI definition ////////////////////////////////////////////////////////////////////////////////
  &.input-ui {
    display: flex;
    color: inherit !important;
  }

  // Window size controll ////////////////////////////////////////////////////////////////////////////////
}
</style>
