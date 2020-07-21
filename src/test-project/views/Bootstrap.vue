<template>
  <div id="bootstrap">
    <a
      class="git-link"
      target="_blank"
      href="https://github.com/RajovicMirko/vue-form-terminator-live/blob/master/src/views/Bootstrap.vue"
    >Git page code sample</a>

    <vue-form-terminator v-bind="formSetup" :model="model" @submited="handleSubmit"></vue-form-terminator>
  </div>
</template>

<script>
import VueFormTerminator from "@/VueFormTerminator.vue";

export default {
  name: "Bootstrap",

  components: {
    "vue-form-terminator": VueFormTerminator
  },

  data() {
    return {
      model: {
        firstName: "John",
        lastName: "Doe",
        username: "JohnDoe",
        email: "john.doe@gmail.com",
        password: "12345",
        repeatPassword: "12345",
        address: "Some test street",
        addressNumber: "123"
      },
      formSetup: {
        positioning: {
          title: "",
          group: {
            title: ""
          },
          input: {
            label: "",
            text: "",
            errorMessage: ""
          }
        },
        title: "Bootstrap sample",
        body: [
          {
            isGroup: true,
            title: "Name and Last name",
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
                    message: "First name is required"
                  },
                  max: {
                    value: 30,
                    message: "First name must have less then 20 characters"
                  }
                },
                otherClasses: "form-control custom-input-bootstrap"
              },
              {
                id: "lastName",
                name: "LastName",
                type: "text",
                label: "",
                placeholder: "Last name",
                validations: {
                  required: {
                    message: "Last name is required"
                  },
                  max: {
                    value: 30,
                    message: "Last name must have less then 20 characters"
                  }
                },
                otherClasses: "form-control custom-input-bootstrap"
              }
            ]
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
                    message: "Address is required"
                  }
                },
                otherClasses: "form-control custom-input-bootstrap"
              },
              {
                id: "addressNumber",
                name: "HouseNumber",
                type: "number",
                label: "",
                placeholder: "No.",
                validations: {
                  required: {
                    message: "No. is required"
                  },
                  numberOnly: {
                    message: "Only numbers allowed"
                  }
                },
                otherClasses: "form-control custom-input-bootstrap"
              }
            ]
          },
          {
            id: "username",
            name: "Username",
            type: "text",
            label: "",
            placeholder: "Username",
            validations: {
              required: {
                message: "Username is required"
              },
              max: {
                value: 20,
                message: "Username must have less then 20 characters"
              },
              noWhiteSpace: {
                message: "No space character allowed"
              }
            },
            otherClasses: "form-control custom-input-bootstrap"
          },
          {
            id: "email",
            name: "Email",
            type: "text",
            label: "",
            placeholder: "Email",
            validations: {
              required: {
                message: "Email is required"
              },
              email: {
                message: "Email must be a valid email"
              }
            },
            otherClasses: "form-control custom-input-bootstrap"
          },
          {
            id: "password",
            name: "Password",
            type: "password",
            label: "",
            placeholder: "Password",
            validations: {
              required: {
                message: "Password is required"
              },
              min: {
                value: 5,
                message: "Pasword must have more then 5 characters"
              },
              max: {
                value: 20,
                message: "Pasword must have less then 20 characters"
              }
            },
            otherClasses: "form-control custom-input-bootstrap"
          },
          {
            id: "repeatPassword",
            name: "RepeatPassword",
            type: "password",
            label: "",
            placeholder: "Repeat Password",
            validations: {
              required: {
                message: "Repeat Pasword is required"
              },
              min: {
                value: 5,
                message: "Must have more then 5 characters"
              },
              max: {
                value: 20,
                message: "Repeat Pasword must have less then 20 characters"
              },
              compareElements: {
                value: "password",
                message: "Repeat Password must be equal as password"
              }
            },
            otherClasses: "form-control custom-input-bootstrap"
          }
        ],
        actions: [
          {
            id: "submit",
            name: "Submit",
            type: "submit",
            icon: "fas fa-check",
            otherClasses: "btn btn-outline-primary custom-button"
          },
          {
            id: "reset",
            name: "Reset",
            type: "reset",
            icon: "fas fa-times",
            otherClasses: "btn btn-outline-warning custom-button"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(data) {
      console.log(data);
    }
  }
};
</script>
<style lang="scss">
#bootstrap {
  display: grid;
  grid-template-rows: auto 1fr;
  place-items: center;
  min-width: 350px;

  & .vue-form-terminator {
    width: 50%;
    min-width: 300px;

    & .titlenator {
      margin-bottom: 2rem;
    }

    & .group-2 {
      flex-direction: row;
      & .address {
        width: 70%;
      }
      & .addressNumber {
        width: 25%;
      }
    }

    & .inputnator {
      padding-bottom: 0.2rem;
    }

    & .buttonator {
      margin-top: 1rem;
      & button {
        margin-bottom: 1rem;
      }
    }
  }
}

@media (min-width: 930px) {
  #bootstrap {
    & .buttonator {
      flex-direction: row;
      margin: 2rem 0;
    }
  }
}

.custom-input-bootstrap {
  font-size: 1.2rem;

  &:hover {
    border-color: transparent;
    box-shadow: 0 0 2px 0.5px #2185d0;
  }

  &:focus {
    border-color: transparent;
    box-shadow: 0 0 0 1.5px #2185d0;
  }
}
</style>
