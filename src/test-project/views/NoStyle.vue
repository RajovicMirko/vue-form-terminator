<template>
  <div id="nostyle">
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
      @submited="handleSubmit"
    ></vue-form-terminator>
  </div>
</template>

<script>
import VueFormTerminator from "@/VueFormTerminator.vue";

export default {
  name: "NoStyle",

  components: {
    "vue-form-terminator": VueFormTerminator,
  },

  data() {
    return {
      formSetup: {
        title: "NoStyle sample",
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
              customClasses: "first-name",
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
              customClasses: "last-name",
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
              noWhiteSpace: {
                message: "No space character allowed",
              },
            },
            otherClasses: "",
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
            otherClasses: "",
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
            otherClasses: "",
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
            otherClasses: "custom-input-nostyle",
          },
        ],
        actions: [
          {
            id: "submit",
            name: "Submit",
            type: "submit",
            icon: "fas fa-plus",
            otherClasses: "",
          },
          {
            id: "reset",
            name: "Reset",
            type: "reset",
            icon: "fas fa-camera",
            otherClasses: "",
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
#nostyle {
  display: grid;
  grid-template-rows: auto 1fr;
  place-items: center;
  min-width: 350px;

  & .vue-form-terminator {
    width: 40%;
    min-width: 300px;

    & .group {
      & .first-name {
        width: 40%;
      }

      & .last-name {
        width: 40%;
      }
    }
  }
}

.custom-input-nostyle {
  border: 1px solid gray;
  border-radius: 2rem;
  text-align: center;

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
