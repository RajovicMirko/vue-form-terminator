<template>
  <div class="buttonator" :class="{ [errorMessagePosition]: errorMessagePosition }">
    <button
      v-for="action in actions"
      :key="action.id"
      :type="action.type"
      :class="{ [action.otherClasses]: action.otherClasses }"
      :disabled="action.type.toLowerCase() === 'reset' && formCleared"
    >
      <i class="iconator" :class="action.icon" v-if="action.icon"></i>
      <span class="name" v-if="action.name">{{ action.name }}</span>
    </button>
  </div>
</template>

<script>
import componentMixin from "@m/component-mixin.js";

export default {
  name: "Buttonator",

  mixins: [componentMixin],

  props: {
    actions: {
      type: Array,
      default: () => []
    },
    errorMessagePosition: {
      type: String
    },
    formCleared: {
      type: Boolean
    }
  }
};
</script>

<style lang="scss">
.buttonator {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin: 0.5rem 0;

  & button {
    display: flex !important;
    align-items: center !important;
    width: 100%;
    height: 2.5rem;
    padding: 0 !important;

    & .name {
      text-align: center;
      flex: 1;
    }

    & .iconator {
      font-size: 1.5rem;
      margin: 0 0.5rem;
    }

    &.semanticui {
      & .name {
      }

      & .iconator {
        margin-left: 0.8rem !important;
      }
    }
  }
}
</style>
