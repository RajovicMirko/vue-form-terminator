<template>
  <div id="nostyle">
    <a
      class="git-link"
      target="_blank"
      href="https://github.com/RajovicMirko/vue-form-terminator-live/blob/master/src/views/NoStyle.vue"
    >Git page code sample</a>

    <vue-form-terminator v-bind="formSetup" :model="model" @submited="handleSubmit"></vue-form-terminator>
  </div>
</template>

<script>
export default {
  name: "NoStyle",

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
        title: "NoStyle sample",
        body: [
          {
            isGroup: true,
            title: "Test group title",
            otherClasses: "outline",
            elements: [
              {
                id: "firstName",
                name: "FirstName",
                type: "text",
                label: "First name",
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
              },
              {
                id: "lastName",
                name: "LastName",
                type: "text",
                label: "Last name",
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
              },
              {
                id: "address",
                name: "Address",
                type: "text",
                label: "Address",
                placeholder: "Address",
                validations: {
                  required: {
                    message: "Address is required",
                  },
                },
                otherClasses: "",
              },
              {
                id: "addressNumber",
                name: "HouseNumber",
                type: "number",
                label: "Str. no.",
                placeholder: "No.",
                validations: {
                  required: {
                    message: "No. is required",
                  },
                  numberOnly: {
                    message: "Only numbers allowed",
                  },
                },
                otherClasses: "",
              },
            ],
          },
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
            label: "Password",
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
            label: "Repeat Password",
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
            otherClasses: "",
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
