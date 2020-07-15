<template>
  <form
    class="vue-form-terminator"
    :class="{
      invalid: VueFormTerminator.haveErrors,
    }"
    @submit="handleSubmit"
    @reset="handleReset"
  >
    <div
      class="titlenator"
      :class="{
        invalid: VueFormTerminator.haveErrors,
      }"
    >
      <span :class="{ invalid: VueFormTerminator.haveErrors }">
        {{ title }}
      </span>
    </div>

    <div
      class="bodynator"
      :class="{
        invalid: VueFormTerminator.haveErrors,
      }"
    >
      <div
        v-for="item in VueFormTerminator.items"
        :key="item.name"
        class="inputnator"
        :class="{
          invalid: item.haveErrors,
          [item.type]: item.type,
          [errorMessagePosition]: errorMessagePosition,
        }"
      >
        <label
          for="item.id"
          v-if="item.label"
          :class="{ invalid: item.haveErrors }"
          >{{ item.label }}</label
        >

        <input
          v-if="item.otherClasses.substring(0, 2) !== 'ui'"
          :class="{
            [item.otherClasses]: item.otherClasses,
            invalid: item.haveErrors,
          }"
          :type="item.type"
          :id="item.id"
          :name="item.name"
          :placeholder="item.placeholder"
          v-model="item.value"
          @input="handleInput(item)"
        />

        <div
          v-if="item.otherClasses.substring(0, 2) === 'ui'"
          :class="{ [item.otherClasses]: item.otherClasses }"
        >
          <input
            :class="{ invalid: item.haveErrors }"
            class="semanticui"
            :type="item.type"
            :id="item.id"
            :name="item.name"
            :placeholder="item.placeholder"
            v-model="item.value"
            @input="handleInput(item)"
          />
        </div>

        <div class="errornator">
          <small class="invalid">{{ item.errorMessage }}</small>
        </div>
      </div>
    </div>

    <div
      class="buttonator"
      :class="{ [errorMessagePosition]: errorMessagePosition }"
    >
      <button
        v-for="action in actions"
        :key="action.id"
        :type="action.type"
        :class="action.otherClasses"
      >
        {{ action.name }}
      </button>
    </div>
  </form>
</template>

<script>
import { VueFormTerminator } from "@js/Form.js";

export default {
  name: "VueFormTerminator",

  props: {
    title: {
      type: String,
    },
    errorMessagePosition: {
      required: true,
      validator: (value) => {
        const test = ["top", "bottom"].indexOf(value) === -1;
        if (test) {
          throw Error(
            `vue-form-terminator error: Property "errorMessagePosition" must be "top" or "bottom" value!!!`
          );
        }

        return "bottom";
      },
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
      VueFormTerminator: {},
    };
  },

  computed: {
    invalidClass() {
      return { invalid: this.VueFormTerminator.haveErrors };
    },
  },

  mounted() {
    this.VueFormTerminator = new VueFormTerminator(this.body);
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault();
      const test = this.VueFormTerminator.isValid;
      if (test) this.$emit("submited", this.VueFormTerminator.data);
    },

    handleReset() {
      this.VueFormTerminator.reset();
    },

    handleInput(item) {
      item.isValid;
    },
  },
};
</script>

<style lang="scss">
@import "@sc/vue-form-terminator.scss";
</style>
