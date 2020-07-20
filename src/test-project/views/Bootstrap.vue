<template>
  <div id="bootstrap">
    <div
      style="width: 100%; display: flex; justify-content: space-evenly; align-items: center;"
    >
      <a
        class="git-link"
        target="_blank"
        href="https://github.com/RajovicMirko/vue-form-terminator-live/blob/master/src/views/Bootstrap.vue"
        >Git page code sample</a
      >

      <div>
        <label for="errorMessagePosition" style="margin-right: 0.5rem"
          >Error message position</label
        >
        <select
          name="errorMessagePosition"
          id="errorMessagePosition"
          v-model="formSetup.errorMessagePosition"
          style="border: none; color: inherit;"
        >
          <option value="top" selected>Top</option>
          <option value="bottom">Bottom</option>
        </select>
      </div>
    </div>

    <vue-form-terminator
      v-bind="formSetup"
      :model="model"
      @submited="handleSubmit"
    ></vue-form-terminator>
  </div>
</template>

<script>
import VueFormTerminator from "@/VueFormTerminator.vue";

export default {
  name: "Bootstrap",

  components: {
    "vue-form-terminator": VueFormTerminator,
  },

  data() {
    return {
      model: {
        firstName: "Mirko",
        lastName: "Rajovic",
        username: "Mirkasin",
        email: "mirko@gmail.com",
        password: "12345",
        repeatPassword: "12345",
        address: "Pastirska",
        addressNumber: "123",
      },
      formSetup: {
        title: "Bootstrap sample",
        errorMessagePosition: "top",
        body: [
          [
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
              otherClasses: "form-control",
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
              otherClasses: "form-control",
            },
          ],
          [
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
              otherClasses: "form-control",
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
              otherClasses: "form-control",
            },
          ],
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
            otherClasses: "form-control",
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
            otherClasses: "form-control",
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
            otherClasses: "form-control",
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
            otherClasses: "form-control custom-input-bootstrap",
          },
        ],
        actions: [
          {
            id: "submit",
            name: "Submit",
            type: "submit",
            icon: "fas fa-check",
            otherClasses: "btn btn-outline-primary custom-button",
          },
          {
            id: "reset",
            name: "Reset",
            type: "reset",
            icon: "fas fa-times",
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
@import "@sc/variables.scss";
#bootstrap {
  display: grid;
  grid-template-rows: auto 1fr;
  place-items: center;
  min-width: 350px;

  & .inputnator {
    margin-bottom: 0.6rem;
  }

  & .errornator {
    justify-content: flex-start;
  }

  & .vue-form-terminator {
    width: 50%;
    min-width: 300px;

    & .group-2 {
      flex-direction: row;
      & .address,
      & .addressNumber {
        width: 47.5%;
      }
    }

    & .buttonator {
      & button {
        margin-bottom: 1rem;
      }
    }
  }
}

@media (min-width: $min-width) {
  #bootstrap {
    & .vue-form-terminator {
      & .group-1 {
        & .firstName {
          width: 47.5%;
        }

        & .lastName {
          width: 47.5%;
        }
      }

      & .group-2 {
        & .address {
          width: 75%;
        }
        & .addressNumber {
          width: 20%;
        }
      }

      & .buttonator {
        flex-direction: row;
        & button {
          width: 48%;
        }
      }
    }
  }
}

.custom-input-bootstrap {
  border-radius: 2rem;

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
