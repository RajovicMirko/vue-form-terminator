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
      :model="model"
      @submited="handleSubmit"
    ></vue-form-terminator>
  </div>
</template>

<script>
export default {
  name: "SemanticUI",

  data() {
    return {
      model: {
        firstName: "John",
        lastName: "Doe",
        address: "Test street address",
        addressNumber: "123",
        username: "JohnDoe",
        email: "john.doe@gmail.com",
        password: "12345",
        repeatPassword: "12345",
      },

      formSetup: {
        positioning: {
          title: "left",
          input: {
            label: "top center",
            text: "center",
            errorMessage: "bottom center",
          },
        },
        title: "SemanticUI sample",
        errorMessagePosition: "top",
        body: [
          {
            isGroup: true,
            title: "Personal data",
            otherClasses: "group-1",
            elements: [
              {
                id: "firstName",
                name: "FirstName",
                type: "text",
                label: "First name",
                placeholder: "",
                validations: {
                  required: {
                    message: "First name is required",
                  },
                  max: {
                    value: 30,
                    message: "First name must have less then 20 characters",
                  },
                },
                otherClasses: "ui input custom-input-semanticui",
              },
              {
                id: "lastName",
                name: "LastName",
                type: "text",
                label: "Last name",
                placeholder: "",
                validations: {
                  required: {
                    message: "Last name is required",
                  },
                  max: {
                    value: 30,
                    message: "Last name must have less then 20 characters",
                  },
                },
                otherClasses: "ui input custom-input-semanticui",
              },
            ],
          },
          {
            isGroup: true,
            title: "",
            otherClasses: "group-2",
            elements: [
              {
                id: "address",
                name: "Address",
                type: "text",
                label: "Address",
                placeholder: "",
                validations: {
                  required: {
                    message: "Address is required",
                  },
                },
                otherClasses: "form-control",
              },
              {
                id: "addressNumber",
                name: "HouseNumber",
                type: "number",
                label: "No.",
                placeholder: "",
                validations: {
                  required: {
                    message: "No. is required",
                  },
                  numberOnly: {
                    message: "Only numbers allowed",
                  },
                },
                otherClasses: "form-control",
              },
            ],
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
            otherClasses: "ui input custom-input-semanticui",
          },
          {
            id: "email",
            name: "Email",
            type: "text",
            label: "Email",
            placeholder: "",
            validations: {
              required: {
                message: "Email is required",
              },
              email: {
                message: "Email must be a valid email",
              },
            },
            otherClasses: "ui input custom-input-semanticui",
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
            otherClasses: "ui input custom-input-semanticui",
          },
          {
            id: "repeatPassword",
            name: "RepeatPassword",
            type: "password",
            label: "Repeat Password",
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
            otherClasses: "ui input custom-input-semanticui",
          },
        ],
        actions: [
          {
            id: "submit",
            name: "Submit",
            type: "submit",
            icon: "fas fa-check-circle",
            otherClasses: "ui primary button custom-button",
          },
          {
            id: "reset",
            name: "Reset",
            type: "Reset",
            icon: "fas fa-times-circle",
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
$primary: #2185d0;

#semanticui {
  display: grid;
  grid-template-rows: auto 1fr;
  place-items: center;
  color: $primary;

  & .vue-form-terminator {
    width: 50%;
    min-width: 300px;

    & .titlenator {
      margin-bottom: 0;
    }

    & .group {
      &.group-2 {
        & .group-row {
          flex-direction: row;
          & .address {
            width: 70%;
          }

          & .addressNumber {
            width: 27.5%;
          }
        }
      }
    }

    & .buttonator {
      margin-top: 1rem;
      & button {
        margin-bottom: 1rem;
      }
    }

    @media (min-width: 900px) {
      & .buttonator {
        flex-direction: row;

        & button {
          width: 48%;
        }
      }
    }
  }
}
</style>
