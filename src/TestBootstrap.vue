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
        errorMessagePosition: "bottom",
        body: [
          {
            id: "email",
            name: "Email",
            type: "text",
            label: "",
            placeholder: "",
            validations: {
              required: {
                message: "Email is required",
              },
              email: {
                message: "Email must be a valid email",
              },
            },
            otherClasses: "form-control custom-input",
          },
          {
            id: "active",
            name: "Active",
            type: "checkbox",
            label: "Active",
            placeholder: "",
            validations: {},
            value: true,
            otherClasses: "",
          },
          {
            id: "username",
            name: "Username",
            type: "text",
            label: "Username",
            placeholder: "",
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
            class: "btn btn-primary",
          },
          {
            id: "reset",
            name: "Reset",
            type: "reset",
            class: "btn btn-warning",
          },
          {
            id: "test",
            name: "Test",
            type: "button",
            class: "btn btn-secondary",
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

//
<style lang="scss">
body {
  position: fixed;
  width: 100vw;
  height: 100vh;

  & #test {
    display: grid;
    place-items: center;
    height: 100%;

    & .vue-form-terminator {
      width: 500px;

      & .inputnator {
        // margin-bottom: 3rem;

        &.checkbox {
          flex-direction: row;
          align-items: center;
          justify-content: center;
          margin: 1rem 0 0 0;

          & label {
            margin: 0 1rem;
          }

          & input {
            transform: scale(1.5);
          }
        }

        & input {
        }
      }

      & .buttonator {
        flex-direction: row;
        justify-content: space-around;

        & button {
          width: 25%;
        }
      }
    }
  }
}

$custom-color: blue;
.custom-input {
  border-radius: 2rem;
  line-height: 2.5rem;
  height: 2.5rem;

  &:hover {
    box-shadow: 0 0 2px 0.5px $custom-color;
  }

  &:focus {
    box-shadow: 0 0 0 2px $custom-color;
    border: none;
  }
}
</style>
