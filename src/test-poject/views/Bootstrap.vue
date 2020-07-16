<template>
  <div id="bootstrap">
    <a
      class="git-link"
      target="_blank"
      href="https://github.com/RajovicMirko/vue-form-terminator-live/blob/master/src/views/Bootstrap.vue"
      >Git page code sample</a
    >
    <vue-form-terminator
      v-bind="formSetup"
      @submited="handleSubmit"
    ></vue-form-terminator>
  </div>
</template>
<script>
export default {
  name: "Bootstrap",
  data() {
    return {
      formSetup: {
        title: "Bootstrap sample",
        errorMessagePosition: "bottom",
        body: [
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
            otherClasses: "form-control custom-input",
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
            otherClasses: "form-control custom-input",
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
            otherClasses: "btn btn-outline-primary custom-button",
          },
          {
            id: "reset",
            name: "Reset",
            type: "Reset",
            otherClasses: "btn btn-outline-warning custom-button",
          },
        ],
      },
    };
  },
  methods: {
    handleSubmit(data) {
      console.log(data);
    },
  },
};
</script>
<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap";
@import "node_modules/bootstrap-vue/src/index.scss";

#bootstrap {
  display: grid;
  grid-template-rows: auto 1fr;
  place-items: center;
  min-width: 350px;

  & .vue-form-terminator {
    width: 40%;
    min-width: 300px;

    & .titlenator {
      margin-bottom: 1.5rem;
      font-weight: bold;
      color: #007bff;
    }

    & .inputnator {
      margin-bottom: 0.5rem;

      & .errornator {
        & small {
          font-size: 0.9rem;
        }
      }
    }

    & .buttonator {
      justify-content: space-evenly;
    }
  }

  & .custom-input {
    border-radius: 2rem;
  }

  & .custom-button {
    border-radius: 2rem;
    width: 40%;
  }
}
</style>
