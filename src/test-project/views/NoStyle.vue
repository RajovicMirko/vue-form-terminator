<template>
  <div id="nostyle">
    <a
      class="git-link"
      target="_blank"
      href="https://github.com/RajovicMirko/vue-form-terminator-live/blob/master/src/views/NoStyle.vue"
    >Git page code sample</a>

    <vue-form-terminator v-bind="formSetup" @submited="handleSubmit"></vue-form-terminator>
  </div>
</template>

<script>
export default {
  name: "NoStyle",

  data() {
    return {
      formSetup: {
        title: "NoStyle sample",

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

        body: [
          {
            isGroup: true,
            title: "Personal data",
            otherClasses: "",
            elements: [
              {
                id: "firstName",
                type: "text",
                name: "FirstName",
                label: "First name",
                placeholder: "First name",
              },
              {
                id: "lastName",
                type: "text",
                name: "LastName",
                label: "Last name",
                placeholder: "Last name",
              },
              {
                id: "address",
                type: "text",
                name: "Address",
                label: "Address",
                placeholder: "Address",
              },
              {
                id: "addressNumber",
                type: "number",
                name: "HouseNumber",
                label: "Str. no.",
                placeholder: "No.",
              },
            ],
          },
          {
            id: "username",
            type: "text",
            name: "Username",
            label: "Username",
            placeholder: "Username",
          },
          {
            id: "email",
            type: "text",
            name: "Email",
            label: "Email",
            placeholder: "Email",
          },
          {
            id: "password",
            type: "password",
            name: "Password",
            label: "Password",
            placeholder: "Password",
          },
          {
            id: "repeatPassword",
            type: "password",
            name: "RepeatPassword",
            label: "Repeat Password",
            placeholder: "Repeat Password",
          },
        ],
        actions: [
          {
            id: "submit",
            type: "submit",
            name: "Submit",
            icon: "fas fa-plus",
            otherClasses: "",
          },
          {
            id: "reset",
            type: "reset",
            name: "Reset",
            icon: "fas fa-trash",
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
