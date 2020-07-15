<template>
  <div id="test">
    <VueFormTerminator
      v-bind="formSetup"
      @submited="handleSubmit"
    ></VueFormTerminator>
  </div>
</template>

<script>
import VueFormTerminator from "./components/VueFormTerminator.vue";

export default {
  name: "test",

  components: {
    VueFormTerminator,
  },

  data() {
    return {
      formSetup: {
        title: "Custom title",
        errorMessagePosition: "bottom",
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
            otherClasses: "ui input custom-input",
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
            otherClasses: "form-control custom-input",
          },
          {
            id: "password",
            name: "Password",
            type: "password",
            label: "Password",
            placeholder: "",
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
            otherClasses: "form-control custom-input",
          },
          {
            id: "repeatPassword",
            name: "RepeatPassword",
            type: "password",
            label: "RepeatPassword label",
            placeholder: "",
            validations: {
              required: {
                message: "Repeat Pasword is required",
              },
              min: {
                value: 5,
                message: "Must have more then 5 characters",
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
            otherClasses: "form-control custom-input",
          },
        ],
        actions: [
          {
            id: "submit",
            name: "Submit",
            type: "submit",
            otherClasses: "btn btn-primary",
          },
          {
            id: "reset",
            name: "Reset",
            type: "reset",
            otherClasses: "btn btn-warning",
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
  display: grid;
  width: 100vw;
  height: 100vh;
  min-width: 350px;

  & #test {
    display: grid;
    place-items: center;

    & .vue-form-terminator {
      width: 40%;
      min-width: 300px;

      & .inputnator {
        // margin-bottom: 1rem;
        & label {
        }

        & .errornator {
          align-self: center;
        }
      }
    }
  }

  $custom-color: blue;
  .custom-input {
    // border-radius: 2rem;
    // line-height: 2.5rem;
    // height: 2.5rem;
    // &:hover {
    //   box-shadow: 0 0 2px 0.5px $custom-color;
    // }
    // &:focus {
    //   box-shadow: 0 0 0 2px $custom-color;
    //   border: none;
    // }

    // & input {
    //   border-radius: 2rem !important;
    //   line-height: 2.5rem !important;
    //   height: 2.5rem !important;

    //   &:hover {
    //     box-shadow: 0 0 2px 0.5px $custom-color !important;
    //   }
    //   &:focus {
    //     box-shadow: 0 0 0 2px $custom-color !important;
    //     border: none;
    //   }
    // }
  }
}
</style>
