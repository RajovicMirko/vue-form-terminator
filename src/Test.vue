<template>
  <div id="test">
    <VueFormTerminator
      v-bind="formSetup"
      @submited="handleSubmit"
    ></VueFormTerminator>
  </div>
</template>

<script>
import VueFormTerminator from "./VueFormTerminator.vue";

export default {
  name: "test",

  components: {
    VueFormTerminator,
  },

  data() {
    return {
      formSetup: {
        title: "Custom title",
        body: [
          {
            id: "input1",
            name: "Input 1",
            type: "text",
            label: "",
            placeholder: "Input 1",
          },
          {
            id: "input2",
            name: "Input 2",
            type: "text",
            label: "",
            placeholder: "Input 2",
          },
        ],
        actions: [
          {
            id: "btn1",
            name: "Btn 1",
            type: "submit",
            class: "primary",
          },
        ],
      },
    };
  },

  methods: {
    handleSubmit(data) {
      console.log("Parent test", data);
    },
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
