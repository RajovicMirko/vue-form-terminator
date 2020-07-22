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
      :model="model"
      @submited="handleSubmit"
    ></vue-form-terminator>
  </div>
</template>

<script>
export default {
  name: "Bootstrap",

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
          title: "",
          group: {
            title: "",
          },
          input: {
            label: "",
            text: "",
            errorMessage: "",
          },
        },
        title: "Bootstrap sample",
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
                label: "",
                placeholder: "First name",
                validations: {
                  required: {
                    message: "First name is required",
                  },
                  max: {
                    value: 30,
                    message: "First name must have less then 20 characters",
                  },
                },
                otherClasses: "form-control form-control-sm",
              },
              {
                id: "lastName",
                name: "LastName",
                type: "text",
                label: "",
                placeholder: "Last name",
                validations: {
                  required: {
                    message: "Last name is required",
                  },
                  max: {
                    value: 30,
                    message: "Last name must have less then 20 characters",
                  },
                },
                otherClasses: "form-control form-control-sm",
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
                label: "",
                placeholder: "Address",
                validations: {
                  required: {
                    message: "Address is required",
                  },
                },
                otherClasses: "form-control form-control-sm",
              },
              {
                id: "addressNumber",
                name: "HouseNumber",
                type: "number",
                label: "",
                placeholder: "No.",
                validations: {
                  required: {
                    message: "No. is required",
                  },
                  numberOnly: {
                    message: "Only numbers allowed",
                  },
                },
                otherClasses: "form-control form-control-sm",
              },
            ],
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
              noWhiteSpace: {
                message: "No space character allowed",
              },
            },
            otherClasses: "form-control form-control-sm",
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
            otherClasses: "form-control form-control-sm",
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
            otherClasses: "form-control form-control-sm",
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
            otherClasses: "form-control form-control-sm",
          },
        ],
        actions: [
          {
            id: "submit",
            name: "Submit",
            type: "submit",
            icon: "fas fa-check",
            otherClasses: "btn btn-outline-primary",
          },
          {
            id: "reset",
            name: "Reset",
            type: "reset",
            icon: "fas fa-times",
            otherClasses: "btn btn-outline-warning",
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

#bootstrap {
  display: grid;
  grid-template-rows: auto 1fr;
  place-items: center;
  color: $primary;

  & .vue-form-terminator {
    width: 30%;
    min-width: 300px;

    & .titlenator {
      margin-bottom: 0;
    }

    & .group {
      &.outlined {
        margin-bottom: 0.5rem;
      }

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

    & .inputnator {
      padding-bottom: 0.3rem;

      & .errornator {
        font-size: 0.7rem;
        margin-top: 0.3rem;
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
