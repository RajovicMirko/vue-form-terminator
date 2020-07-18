<template>
  <form
    ref="VueFormTerminator"
    class="vue-form-terminator"
    :class="{
      invalid: VueFormTerminator.haveErrors,
    }"
    @submit="handleSubmit"
    @reset="handleReset"
  >
    <div class="titlenator" :class="{
        invalid: VueFormTerminator.haveErrors,
      }">
      <span :class="{ invalid: VueFormTerminator.haveErrors }">
        {{
        title
        }}
      </span>
    </div>

    <div
      ref="formBody"
      class="bodynator"
      :class="{
        invalid: VueFormTerminator.haveErrors,
      }"
    >
      <fragment
        v-for="item in VueFormTerminator.body.elements"
        :key="item.name"
        :class="errorMessagePosition"
      >
        <!-- Single item -->
        <custom-input
          :item="item"
          v-if="!item.isGroup"
          :errorMessagePosition="errorMessagePosition"
        ></custom-input>

        <!-- Group items -->
        <fragment v-if="item.isGroup">
          <custom-input-group :group="item" :errorMessagePosition="errorMessagePosition"></custom-input-group>
        </fragment>
      </fragment>
    </div>

    <div class="buttonator" :class="{ [errorMessagePosition]: errorMessagePosition }">
      <custom-button v-for="action in actions" :key="action.id" v-bind="action"></custom-button>
    </div>
  </form>
</template>

<script>
import VueFormTerminator from "@js/Form.js";
import button from "@c/button/button.vue";
import input from "@c/input/input.vue";
import inputGroup from "@c/input/input-group.vue";

export default {
  name: "VueFormTerminator",
  components: {
    "custom-button": button,
    "custom-input": input,
    "custom-input-group": inputGroup
  },

  props: {
    title: {
      type: String
    },
    errorMessagePosition: {
      required: true,
      validator: value => {
        const test = ["top", "bottom"].indexOf(value) === -1;
        if (test) {
          throw Error(
            `vue-form-terminator error: Property "errorMessagePosition" must be "top" or "bottom" value!!!`
          );
        }

        return "bottom";
      }
    },
    body: {
      type: Array,
      required: true
    },
    actions: {
      type: Array,
      required: true
    },
    model: {
      type: Object
    }
  },

  data() {
    return {
      VueFormTerminator: {}
    };
  },

  computed: {
    invalidClass() {
      return { invalid: this.VueFormTerminator.haveErrors };
    }
  },

  mounted() {
    this.VueFormTerminator = new VueFormTerminator(
      {
        title: this.title,
        errorMessagePosition: this.errorMessagePosition,
        body: this.body,
        actions: this.actions
      },
      this.model
    );
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
        errorElement.focus();
        this.fixErrorTabIndex();
      }, 10);
    },

    handleSubmit(e) {
      e.preventDefault();
      const test = this.VueFormTerminator.isValid();
      if (test) {
        this.$emit("submited", this.VueFormTerminator.getModel());
        this.VueFormTerminator.reset();
        this.focusFirstElement();
      } else {
        this.focusFirstErrorElement();
      }
    },

    handleReset() {
      this.VueFormTerminator.reset();
      this.focusFirstElement();
    }
  }
};
</script>

<style lang="scss">
@import "@sc/vue-form-terminator.scss";
</style>
