<template>
  <form class="vue-form-terminator flex flex-column">
    <div class="titlenator flex flex-column">
      <span>Title</span>
    </div>

    <div class="bodynator flex flex-column">
      <div class="inputnator flex flex-column">
        <label for="item1">Input label</label>
        <input type="text" id="item1" placeholder="Input" />
      </div>
    </div>

    <div class="buttonator flex flex-column">
      <button>Button 1</button>
      <button>Button 2</button>
      <button>Button 3</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "VueFormTerminator",
};
</script>

<style lang="scss">
@import "@sc/global.scss";
.vue-form-terminator {
  & .titlenator {
  }

  & .bodynator {
    & .inputnator {
    }
  }

  & .buttonator {
  }
}
</style>
