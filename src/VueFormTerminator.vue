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

    <div class="bodynator" :class="{ invalid: VueFormTerminator.haveErrors }">
      <div
        v-for="item in VueFormTerminator.items"
        :key="item.name"
        class="inputnator"
        :class="{ invalid: item.haveErrors, [item.type]: item.type }"
      >
        <div
          class="lbl-err"
          :class="{ [errorMessagePosition]: errorMessagePosition }"
        >
          <label
            for="item.id"
            v-if="item.label"
            :class="{ invalid: item.haveErrors }"
            >{{ item.label }}</label
          >
          <small
            class="errornator invalid"
            :class="'top'"
            v-if="errorMessagePosition === 'top'"
            >{{ item.errorMessage }}</small
          >
        </div>
        <input
          :class="{
            [item.otherClasses]: item.otherClasses,
            invalid: item.haveErrors,
            [errorMessagePosition]: errorMessagePosition,
          }"
          :type="item.type"
          :id="item.id"
          :placeholder="item.placeholder"
          v-model="item.value"
          @input="handleInput(item)"
        />

        <small
          class="errornator invalid"
          :class="'bottom'"
          v-if="errorMessagePosition === 'bottom'"
        >
          {{ item.errorMessage }}
        </small>
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
import { VueFormTerminator } from "./js/Form.js";

export default {
  name: "VueFormTerminator",

  props: {
    title: {
      type: String,
    },
    errorMessagePosition: {
      type: String,
      validator: (value) => {
        const test = ["top", "bottom"].indexOf(value) === -1 && value !== "";
        if (test)
          throw Error(
            `vue-form-terminator error: Property "errorMessagePosition" must be "top" or "bottom" value!!!`
          );

        return true;
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

  & .titlenator {
    align-self: center;
    font-size: 1.5rem;
  }

  & .inputnator {
    display: flex;
    flex-direction: column;
    position: relative;
    margin-bottom: 0.5rem;

    & .lbl-err {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 0.1rem;

      &.top {
        min-height: 1.4rem;
      }

      & label {
        margin: 0;
      }

      & .errornator.top {
        text-align: right;
        font-size: 0.8rem;

        &.invalid {
          color: red;
        }
      }
    }

    & input {
      border: 1px solid;
      font-size: 1rem;
      outline: none;

      &.invalid {
        border-color: red;

        &:hover {
          box-shadow: 0 0 2px 0.5px red;
        }

        &:focus {
          box-shadow: 0 0 0 2px red;
        }
      }
    }

    & .errornator.bottom {
      position: absolute;
      bottom: -1rem;
      right: 0;
      font-size: 0.8rem;

      &.invalid {
        color: red;
      }
    }
  }

  & .buttonator {
    display: flex;
    flex-direction: column;

    & button {
      width: 100%;
      margin: 0.5rem 0;
    }
  }
}
</style>
