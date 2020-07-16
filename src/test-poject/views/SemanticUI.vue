<template>
  <div id="semanticui">
    <a
      class="git-link"
      target="_blank"
      href="https://github.com/RajovicMirko/vue-form-terminator-live/blob/master/src/views/SemanticUI.vue"
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
  name: "SemanticUI",

  data() {
    return {
      formSetup: {
        title: "SemanticUI sample",
        errorMessagePosition: "top",
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
            otherClasses: "ui input custom-input",
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
            otherClasses: "ui input custom-input",
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
            otherClasses: "ui input custom-input",
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
            otherClasses: "ui input custom-input",
          },
        ],
        actions: [
          {
            id: "submit",
            name: "Submit",
            type: "submit",
            otherClasses: "ui primary button custom-button",
          },
          {
            id: "reset",
            name: "Reset",
            type: "Reset",
            otherClasses: "ui yellow basic button custom-button",
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
#semanticui {
  display: grid;
  grid-template-rows: auto 1fr;
  place-items: center;
  min-width: 350px;

  & .vue-form-terminator {
    width: 40%;
    min-width: 300px;

    & .titlenator {
      margin-bottom: 0.5rem;
      font-weight: bold;
      color: #007bff;
    }

    & .inputnator {
      margin-bottom: 0.5rem;

      & .errornator {
        justify-content: flex-end;

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
    & input {
      border-radius: 2rem !important;
    }
  }

  & .custom-button {
    border-radius: 2rem;
    width: 40%;
  }
}
</style>
