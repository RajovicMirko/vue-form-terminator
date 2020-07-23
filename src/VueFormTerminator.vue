<template>
  <!-- FORM -->
  <form
    ref="VueFormTerminator"
    class="vue-form-terminator"
    method
    action
    @submit="handleSubmit"
    @reset="handleReset"
  >
    <!-- TITLE -->
    <titlenator
      :title="VueFormTerminator.title"
      :titlePosition="VueFormTerminator.positioning.title"
    ></titlenator>

    <!-- FORM BODY -->
    <div ref="formBody" class="bodynator">
      <fragment v-for="element in VueFormTerminator.body" :key="element.name">
        <!-- SINGLE ELEMENT -->
        <inputnator :element="element" v-if="!element.isGroup"></inputnator>

        <!-- GROUP ELEMENTS -->
        <fragment v-if="element.isGroup">
          <group :group="element" :errorMessagePosition="'test'"></group>
        </fragment>
      </fragment>
    </div>

    <!-- FORM ACTIONS -->
    <buttonator :actions="VueFormTerminator.actions"></buttonator>
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

    positioning: {
      type: Object,
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
        title: "",
        positioning: {
          title: "",
          input: {
            label: "",
            text: "",
            errorMessage: "",
          },
        },
        body: {},
      },
    };
  },

  mounted() {
    this.VueFormTerminator = new VueFormTerminator({
      title: this.title,
      positioning: this.positioning,
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
