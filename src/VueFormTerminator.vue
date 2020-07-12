<template>
  <form class="vue-form-terminator flex flex-column" @submit="handleSubmit">
    <div class="titlenator flex flex-column">
      <span>{{ title }}</span>
    </div>

    <div class="bodynator flex flex-column">
      <div
        v-for="item in FormClass.items"
        :key="item.name"
        class="inputnator flex flex-column"
      >
        <label for="item.id">{{ item.label }}</label>
        <input
          :type="item.type"
          :id="item.id"
          :placeholder="item.placeholder"
          v-model="item.value"
          @input="handleInput(item)"
        />
        <small class="errornator">{{ item.errors[0] }}</small>
      </div>
    </div>

    <div class="buttonator flex flex-column">
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
  },

  data() {
    return {
      FormClass: {},
    };
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

    handleInput(item) {
      item.isValid;
    },
  },
};
</script>

<style lang="scss">
@import "@sc/global.scss";
.vue-form-terminator {
  & .titlenator {
  }

  & .bodynator {
    & .inputnator {
    }
  }

  & .buttonator {
  }
}
</style>
