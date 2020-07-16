<template>
  <form
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
      <span :class="{ invalid: VueFormTerminator.haveErrors }">{{ title }}</span>
    </div>

    <div class="bodynator" :class="{
        invalid: VueFormTerminator.haveErrors,
      }">
      <!-- Group items -->
      <!-- <div v-if="item.isGroup">
          <div
            v-for="itm in item.items"
            :key="itm.name"
            :class="{invalid: itm.haveErrors}"
          >{{`${itm.name} - ${itm.errorMessage}`}}</div>
      </div>-->

      <div v-for="item in VueFormTerminator.items" :key="item.name" class="inputnator">
        <!-- Single item -->
        <custom-input
          :item="item"
          v-if="!item.isGroup"
          :errorMessagePosition="errorMessagePosition"
        ></custom-input>
      </div>
    </div>

    <div class="buttonator" :class="{ [errorMessagePosition]: errorMessagePosition }">
      <custom-button v-for="action in actions" :key="action.id" v-bind="action"></custom-button>
    </div>
  </form>
</template>

<script>
import { VueFormTerminator } from "@js/Form.js";
import button from "@c/button/button.vue";
import input from "@c/input/input.vue";

export default {
  name: "VueFormTerminator",
  components: {
    "custom-button": button,
    "custom-input": input
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
    }
  }
};
</script>

<style lang="scss">
@import "@sc/vue-form-terminator.scss";
</style>
