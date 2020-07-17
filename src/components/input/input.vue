<template>
  <!-- LABEL INPUT ERROR -->
  <div
    class="inputnator"
    :class="{
      [cssType]: cssType,
      [item.otherClasses]: item.otherClasses && cssType,
      [item.customClasses]: item.customClasses,
      [errorMessagePosition]: errorMessagePosition,
      [item.id]: item.id,
    }"
  >
    <!-- INPUT LABEL -->
    <label :for="item.id" v-if="item.label" :class="{ invalid: item.haveErrors }">{{ item.label }}</label>

    <input
      v-if="cssType"
      :class="{
        invalid: item.haveErrors,
      }"
      :type="item.type"
      :id="item.id"
      :name="item.name"
      :placeholder="item.placeholder"
      v-model="item.value"
      @input="handleInput(item)"
    />

    <input
      v-if="!cssType"
      :class="{
        [item.otherClasses]: item.otherClasses && !cssType,
        invalid: item.haveErrors,
      }"
      :type="item.type"
      :id="item.id"
      :name="item.name"
      :placeholder="item.placeholder"
      v-model="item.value"
      @input="handleInput(item)"
    />

    <!-- INPUT ERROR MESSAGE -->
    <div class="errornator">
      <small class="invalid">{{ item.errorMessage }}</small>
    </div>
  </div>
</template>

<script>
export default {
  name: "custom-input",

  props: {
    item: {
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
  },

  methods: {
    handleInput(item) {
      item.isValid;
    }
  }
};
</script>

<style lang="scss">
$invalid-color: red;
$err-msg-font-size: 0.79rem;

.inputnator {
  margin: 0;
  margin-bottom: 1rem;
  padding: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  font-size: 1rem;

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
  &.semanticui-test {
    display: flex;
    color: inherit !important;
  }

  // Window size controll ////////////////////////////////////////////////////////////////////////////////
}
</style>
