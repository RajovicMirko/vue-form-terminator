<template>
  <form
    class="vue-form-terminator"
    :class="{
      clear: clearStyles,
      invalid: FormClass.haveErrors,
    }"
    @submit="handleSubmit"
    @reset="handleReset"
  >
    <div
      class="titlenator"
      :class="{
        clear: clearStyles,
        invalid: FormClass.haveErrors,
      }"
    >
      <span :class="{ invalid: FormClass.haveErrors }">{{ title }}</span>
    </div>

    <div
      class="bodynator"
      :class="{ clear: clearStyles, invalid: FormClass.haveErrors }"
    >
      <div
        v-for="item in FormClass.items"
        :key="item.name"
        class="inputnator"
        :class="{
          invalid: item.haveErrors,
        }"
      >
        <label
          for="item.id"
          v-if="item.label"
          :class="{ invalid: item.haveErrors }"
          >{{ item.label }}</label
        >
        <input
          :class="{
            [item.style]: item.style,
            invalid: item.haveErrors,
          }"
          :type="item.type"
          :id="item.id"
          :placeholder="item.placeholder"
          v-model="item.value"
          @input="handleInput(item)"
        />
        <small class="errornator invalid">{{ item.errors[0] }}</small>
      </div>
    </div>

    <div class="buttonator">
      <button
        v-for="action in actions"
        :key="action.id"
        :type="action.type"
        :class="action.class"
      >
        {{ action.name }}
      </button>
    </div>
  </form>
</template>

<script>
import { Form } from "./js/Form.js";

export default {
  name: "VueFormTerminator",

  props: {
    title: {
      type: String,
    },
    body: {
      type: Array,
      required: true,
    },
    actions: {
      type: Array,
      required: true,
    },
    clearStyles: {
      type: Boolean,
    },
    styles: {
      type: Object,
    },
  },

  data() {
    return {
      FormClass: {},
    };
  },

  computed: {
    invalidClass() {
      console.log("invalidClass");
      return { invalid: this.FormClass.haveErrors };
    },
  },

  mounted() {
    this.FormClass = new Form(this.body);
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault();
      const test = this.FormClass.isValid;
      if (test) this.$emit("submited", this.FormClass.data);
    },

    handleReset() {
      this.FormClass.reset();
    },

    handleInput(item) {
      item.isValid;
    },
  },
};
</script>

<style lang="scss">
.vue-form-terminator {
  display: flex;
  flex-direction: column;

  & .inputnator {
    position: relative;
    margin-bottom: 1.3rem;

    & input {
      font-size: 1rem;
    }

    & .errornator {
      position: absolute;
      bottom: -1.1rem;
      font-size: 0.8rem;
    }
  }

  & .buttonator {
    display: flex;
    flex-direction: column;

    & button {
      width: 100%;
    }
  }
}
</style>
