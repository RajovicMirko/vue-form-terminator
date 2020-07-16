<template>
  <button :type="type" :class="otherClasses">
    <i class="icon" :class="icon" v-if="icon   === 1"></i>
    <span class="name" v-if="name">{{ name }}</span>
  </button>
</template>

<script>
export default {
  name: "Button",
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
button {
  display: flex !important;
  align-items: center !important;
  width: 100%;

  // & .btn {
  //   margin: 0;
  //   padding: 0;
  //   display: flex;
  //   align-items: center;
  //   justify-content: space-between;
  //   flex-direction: row-reverse;
  //   width: 100%;
  // }

  & .name {
    text-align: center;
    flex: 7;
  }

  & .icon {
    flex: 1;
  }
}
</style>