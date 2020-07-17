<template>
  <button :type="type" :class="{[otherClasses]: otherClasses, [cssType]: cssType}">
    <i class="icon" :class="icon" v-if="icon"></i>
    <span class="name" v-if="name">{{ name }}</span>
  </button>
</template>

<script>
import componentMixin from "@m/component-mixin.js";

export default {
  name: "custom-button",

  mixins: [componentMixin],

  props: {
    type: {
      type: String,
      required: true
    },
    otherClasses: {
      type: String,
      required: false,
      default: ""
    },
    name: {
      type: String,
      required: false,
      default: ""
    },
    icon: {
      type: String,
      required: false,
      default: ""
    }
  }
};
</script>

<style lang="scss">
.buttonator {
  display: flex;
  justify-content: space-between;

  & button {
    display: flex !important;
    align-items: center !important;
    width: 100%;
    height: 2.5rem;
    width: 40%;
    padding: 0 !important;

    & .name {
      text-align: center;
      flex: 1;
    }

    & .icon {
      font-size: 1.5rem;
      margin: 0 0.5rem;
    }

    &.semanticui {
      & .name {
      }

      & .icon {
        margin-left: 0.8rem !important;
      }
    }
  }
}
</style>