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
            id: "email",
            name: "Email",
            type: "text",
            label: "",
            placeholder: "Email",
            validations: {
              required: {
                message: "Email is required",
              },
              email: {
                message: "Email must be a valid email",
              },
            },
          },
          {
            id: "username",
            name: "Username",
            type: "text",
            label: "",
            placeholder: "Username",
            validations: {
              required: {
                message: "Username is required",
              },
              max: {
                value: 20,
                message: "Username must have less then 20 characters",
              },
            },
          },
          {
            id: "password",
            name: "Password",
            type: "password",
            label: "",
            placeholder: "Password",
            validations: {
              required: {
                message: "Password is required",
              },
              min: {
                value: 5,
                message: "Pasword must have more then 5 characters",
              },
              max: {
                value: 20,
                message: "Pasword must have less then 20 characters",
              },
            },
          },
          {
            id: "repeatPassword",
            name: "RepeatPassword",
            type: "password",
            label: "",
            placeholder: "Repeat Password",
            validations: {
              required: {
                message: "Repeat Pasword is required",
              },
              min: {
                value: 5,
                message: "Repeat Pasword must have more then 5 characters",
              },
              max: {
                value: 20,
                message: "Repeat Pasword must have less then 20 characters",
              },
              compareElements: {
                value: "password",
                message: "Repeat Password must be equal as password",
              },
            },
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
