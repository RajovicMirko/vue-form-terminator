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
      <span :class="{ invalid: VueFormTerminator.haveErrors }">{{
        title
      }}</span>
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
          :class="{
            [item.otherClasses]: item.otherClasses,
            invalid: item.haveErrors,
          }"
          :type="item.type"
          :id="item.id"
          :placeholder="item.placeholder"
          v-model="item.value"
          @input="handleInput(item)"
        />
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
import { VueFormTerminator } from "./js/Form.js";

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
.vue-form-terminator {
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  width: 100%;

  & .titlenator {
    align-self: center;
    font-size: 1.7rem;
  }

  & .inputnator {
    display: flex;
    flex-direction: column;

    // GLOBAL ////////////////////////////////////////////////////////////////////////////
    & input.invalid {
      border-color: red;

      &:hover {
        box-shadow: 0 0 2px 0.5px red;
      }

      &:focus {
        box-shadow: 0 0 0 2px red;
      }
    }

    & small.invalid {
      color: red;
    }

    & .errornator {
      height: 0.8rem;
      line-height: 0.8rem;
    }

    // TOP ////////////////////////////////////////////////////////////////////////////
    &.top {
      position: relative;
      flex-direction: column-reverse;
      margin-bottom: 0.8rem;

      & label {
        position: absolute;
        top: -0.4rem;
      }

      & .errornator {
        margin-bottom: 0.35rem;
        text-align: right;
      }
    }

    // BOTTOM ////////////////////////////////////////////////////////////////////////////
    &.bottom {
      position: relative;
      margin-bottom: 1.5rem;

      & label {
        position: absolute;
        top: -1.5rem;
      }

      & input {
        outline: none;
      }

      & .errornator {
        // margin-top: 0.1rem;
      }
    }
  }

  & .buttonator {
    display: flex;
    justify-content: space-between;

    & button {
      width: 100%;
    }

    &.top {
      margin-top: 1rem;
    }

    &.bottom {
      margin: 0;
    }
  }
}
</style>
