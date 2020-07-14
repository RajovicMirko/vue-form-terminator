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
            label: "Email",
            placeholder: "Email",
            validations: {
              required: {
                message: "Email is required",
              },
              email: {
                message: "Email must be a valid email",
              },
            },
            style: "form-control",
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
            style: "form-control",
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
            style: "form-control",
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
            style: "form-control",
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
  position: fixed;
  width: 100vw;
  height: 100vh;
}
#test {
  display: grid;
  place-items: center;
  height: 100%;

  & .vue-form-terminator {
    width: 60%;
    min-width: 300px;
    padding: 3rem;
    border-radius: 5rem;
    &.invalid {
      box-shadow: 0 0 0 2px change-color($color: red, $alpha: 0.5);
    }

    & .titlenator {
      text-align: center;
      font-size: 2rem;
      width: 100%;

      & span {
        font-weight: bold;
      }
    }

    & .inputnator {
      & label {
      }
      & input {
        &.invalid {
          border-color: red;

          &:focus {
            box-shadow: 0 0 0 2px red;
          }
        }
      }
      & small.errornator {
      }
    }

    & .buttonator {
      flex-direction: row;
      justify-content: space-between;

      & button {
        width: 30%;
      }
    }
  }
}

.invalid {
  color: red;
}
</style>
