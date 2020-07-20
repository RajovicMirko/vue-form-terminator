<template>
  <!-- FORM -->
  <form
    ref="VueFormTerminator"
    class="vue-form-terminator"
    @submit="handleSubmit"
    @reset="handleReset"
  >
    <!-- TITLE -->
    <titlenator :title="title"></titlenator>

    <!-- FORM BODY -->
    <div ref="formBody" class="bodynator">
      <fragment
        v-for="element in VueFormTerminator.body"
        :key="element.name"
        :class="errorMessagePosition"
      >
        <!-- SINGLE ELEMENT -->
        <inputnator
          :element="element"
          v-if="!element.isGroup"
          :errorMessagePosition="errorMessagePosition"
        ></inputnator>

        <!-- GROUP ELEMENTS -->
        <fragment v-if="element.isGroup">
          <group
            :group="element"
            :errorMessagePosition="errorMessagePosition"
          ></group>
        </fragment>
      </fragment>
    </div>

    <!-- BUTTONS -->
    <buttonator
      :actions="actions"
      :errorMessagePosition="errorMessagePosition"
      :formCleared="VueFormTerminator.formCleared"
    ></buttonator>
  </form>
</template>

<script>
import { VueFormTerminator } from "@js/Form.js";
import titlenator from "@c/titlenator.vue";
import inputnator from "@c/inputnator.vue";
import group from "@c/group.vue";
import buttonator from "@c/buttonator.vue";

export default {
  name: "VueFormTerminator",
  components: {
    titlenator,
    inputnator,
    group,
    buttonator,
  },

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
    model: {
      type: Object,
    },
  },

  data() {
    return {
      VueFormTerminator: {
        body: {},
      },
    };
  },

  mounted() {
    this.VueFormTerminator = new VueFormTerminator({
      title: this.title,
      errorMessagePosition: this.errorMessagePosition,
      body: this.body,
      actions: this.actions,
      model: this.model,
    });
    this.focusFirstElement();
  },

  methods: {
    resetTabIndex() {
      const errorElements = this.$refs.formBody.querySelectorAll("input");
      for (let el of errorElements) {
        el.tabIndex = 0;
      }
    },

    focusFirstElement() {
      setTimeout(() => {
        this.$refs.VueFormTerminator[0].focus();
        this.resetTabIndex();
      }, 100);
    },

    fixErrorTabIndex() {
      const errorElements = this.$refs.formBody.querySelectorAll(
        "input.invalid"
      );

      let counter = 1;
      for (let el of errorElements) {
        el.tabIndex = counter.toString();
        counter += 1;
      }
    },

    focusFirstErrorElement() {
      setTimeout(() => {
        const errorElement = this.$refs.formBody.querySelector("input.invalid");
        if (errorElement) errorElement.focus();
        this.fixErrorTabIndex();
      }, 10);
    },

    handleSubmit(e) {
      e.preventDefault();
      const formIsValid = this.VueFormTerminator.validate();
      if (formIsValid) {
        this.$emit("submited", this.VueFormTerminator.model);
        this.VueFormTerminator.reset();
        this.focusFirstElement();
      } else {
        this.focusFirstErrorElement();
      }
    },

    handleReset() {
      this.VueFormTerminator.reset();
      this.focusFirstElement();
    },
  },
};
</script>

<style lang="scss">
.vue-form-terminator {
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  width: 100%;
}
</style>
