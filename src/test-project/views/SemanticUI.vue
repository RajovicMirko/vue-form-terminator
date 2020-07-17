<template>
  <div id="semanticui">
    <div style="width: 100%; display: flex; justify-content: space-evenly; align-items: center;">
      <a
        class="git-link"
        target="_blank"
        href="https://github.com/RajovicMirko/vue-form-terminator-live/blob/master/src/views/SemanticUI.vue"
      >Git page code sample</a>

      <div>
        <label for="errorMessagePosition" style="margin-right: 0.5rem">Error message position</label>
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

    <vue-form-terminator v-bind="formSetup" @submited="handleSubmit"></vue-form-terminator>
  </div>
</template>

<script>
import VueFormTerminator from "@/VueFormTerminator.vue";

export default {
  name: "SemanticUI",

  components: {
    "vue-form-terminator": VueFormTerminator
  },

  data() {
    return {
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
                  message: "First name is required"
                },
                max: {
                  value: 30,
                  message: "First name must have less then 20 characters"
                }
              },
              otherClasses: "ui input"
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
              otherClasses: "ui input"
            }
          ],
          {
            id: "username",
            name: "Username",
            type: "text",
            label: "Username",
            placeholder: "Username",
            validations: {
              required: {
                message: "Username is required"
              },
              max: {
                value: 20,
                message: "Username must have less then 20 characters"
              }
            },
            otherClasses: "ui input"
          },
          {
            id: "email",
            name: "Email",
            type: "text",
            label: "Email",
            placeholder: "Email",
            validations: {
              required: {
                message: "Email is required"
              },
              email: {
                message: "Email must be a valid email"
              }
            },
            otherClasses: "ui input"
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
            otherClasses: "ui input"
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
            otherClasses: "ui input custom-input-semanticui"
          }
        ],
        actions: [
          {
            id: "submit",
            name: "Submit",
            type: "submit",
            icon: "fas fa-check-circle",
            otherClasses: "ui primary button custom-button"
          },
          {
            id: "reset",
            name: "Reset",
            type: "Reset",
            icon: "fas fa-times-circle",
            otherClasses: "ui yellow basic button custom-button"
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
#semanticui {
  display: grid;
  grid-template-rows: auto 1fr;
  place-items: center;
  min-width: 350px;

  & .vue-form-terminator {
    width: 40%;
    min-width: 300px;
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
</style>
