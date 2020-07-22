<template>
  <div :class="{
    [group.class]: group.class,
    outlined: group.title
  }">
    <span
      class="title"
      :class="{
        [group.positioning.title]: group.positioning.title
      }"
      v-if="group.title"
    >{{ group.title }}</span>
    <div class="group-row">
      <inputnator v-for="element in group.elements" :key="element.name" :element="element"></inputnator>
    </div>
  </div>
</template>

<script>
import inputnator from "@c/inputnator.vue";

export default {
  name: "Group",

  components: { inputnator },

  props: {
    group: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss">
.group {
  position: relative;
  display: flex;
  flex-direction: column;

  &.outlined {
    padding: 1rem 1rem 0.5rem 1rem;
    margin: 1rem 0;
    border: 1px solid rgba(128, 128, 128, 0.2);
    border-radius: 1rem;
    background-color: rgba(128, 128, 128, 0.02);
  }

  & .title {
    position: absolute;
    top: -0.8rem;
    padding: 0 0.5rem;
    font-size: 1.2rem;
    color: rgba(0, 0, 0, 0.3);
    background-color: white;
    border-radius: 2rem;

    &.left {
      left: 1rem;
    }
    &.right {
      right: 1rem;
    }
  }

  & .group-row {
    position: relative;
    justify-content: space-between;
    display: flex;
    width: 100%;
  }
}

@media (min-width: $min-width) {
  @for $i from 1 through 10 {
    .group-row .inputnator:first-child:nth-last-child(#{$i}),
    .group-row .inputnator:first-child:nth-last-child(#{$i}) ~ .inputnator {
      width: calc(100% / #{$i} - 0.5rem);
    }
  }
}

@media (max-width: $min-width) {
  .group {
    & .group-row {
      flex-direction: column;
    }
  }
}
</style>
