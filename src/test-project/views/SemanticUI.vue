<template>
  <div id="semanticui">
    <div
      style="width: 100%; display: flex; justify-content: space-evenly; align-items: center;"
    >
      <a
        class="git-link"
        target="_blank"
        href="https://github.com/RajovicMirko/vue-form-terminator-live/blob/master/src/views/SemanticUI.vue"
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

    <div class="forms">
      <vue-form-terminator
        v-bind="formSetup"
        :model="model"
        @submited="handleSubmit"
      ></vue-form-terminator>
      <vue-form-terminator
        v-bind="formSetup2"
        :model="model2"
        @submited="handleSubmit"
      ></vue-form-terminator>
    </div>
  </div>
</template>

<script>
import VueFormTerminator from "@/VueFormTerminator.vue";

export default {
  name: "SemanticUI",

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
      },

      formSetup: {
        title: "SemanticUI sample",
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
              otherClasses: "ui input custom-input-semanticui",
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
              otherClasses: "ui input custom-input-semanticui",
            },
          ],
          {
            id: "username",
            name: "Username",
            type: "text",
            label: "Username",
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
            otherClasses: "ui input custom-input-semanticui",
          },
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
            otherClasses: "ui input custom-input-semanticui",
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
            otherClasses: "ui input custom-input-semanticui",
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

      model2: {
        test: "Nije nego",
      },

      formSetup2: {
        title: "Test form",
        errorMessagePosition: "top",
        body: [
          {
            id: "test",
            name: "Test",
            placeholder: "test",
            validations: {
              required: {
                message: "Nije dobro",
              },
            },
            otherClasses: "ui input custom-input-semanticui",
          },
        ],
        actions: [
          {
            id: "submit2",
            name: "Submit",
            type: "submit",
            icon: "fas fa-check-circle",
            otherClasses: "ui primary button custom-button",
          },
          {
            id: "reset2",
            name: "Reset",
            type: "reset",
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
@import "@sc/variables.scss";

#semanticui {
  display: grid;
  grid-template-rows: auto 1fr;
  place-items: center;
  min-width: 350px;

  & .vue-form-terminator {
    width: 80%;
    min-width: 300px;

    & .buttonator {
      flex-direction: row;
      & button {
        margin: 0;
        width: 40%;
      }
    }
  }
}

.custom-input-semanticui {
  & input {
    border-radius: 2rem !important;
    text-align: center !important;

    &:hover {
      border-color: transparent;
      box-shadow: 0 0 2px 0.5px #2185d0;
    }

    &:focus {
      border-color: transparent !important;
      box-shadow: 0 0 0 1.5px #2185d0 !important;
    }
  }
}

.forms {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;

  & .vue-form-terminator {
    flex: 0 1 40%;
    margin-bottom: 10%;
  }
}

@media (min-width: $min-width) {
  .forms {
    & .vue-form-terminator {
      margin-bottom: 0;
    }
  }
}
</style>
