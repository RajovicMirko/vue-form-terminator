<template>
  <div class="titlenator">
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: "Titlenator",
  props: {
    title: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss">
.titlenator {
  display: flex;
  align-self: center;
  width: 100%;
  font-size: 2rem;
  margin: 0.5rem 0;
}
</style>