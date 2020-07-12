<template>
  <div id="test">
    <VueFormTerminator></VueFormTerminator>
  </div>
</template>

<script>
import VueFormTerminator from "./VueFormTerminator.vue";

export default {
  name: "test",
  components: {
    VueFormTerminator,
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  font-family: Arial, Helvetica, Geneva, Tahoma, sans-serif;
  display: grid;
  place-items: center;
  width: 100vw;
  height: 100vh;
}
</style>
