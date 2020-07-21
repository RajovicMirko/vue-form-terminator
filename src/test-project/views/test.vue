<template>
  <div id="test">
    <vue-form-terminator v-bind="formSetup" @submited="handleSubmit"></vue-form-terminator>
  </div>
</template>

<script>
import VueFormTerminator from "@/VueFormTerminator.vue";

export default {
  name: "Test",

  components: {
    "vue-form-terminator": VueFormTerminator
  },

  data() {
    return {
      formSetup: {
        positioning: {
          title: "",
          input: {
            label: "",
            text: "",
            errorMessage: ""
          }
        },
        title: "Test form title",
        body: [
          {
            id: "name",
            type: "text",
            label: "Test",
            placeholder: "Test",
            otherClasses: "ui input",
            validations: {
              required: {
                message: "Is required"
              }
            }
          },
          {
            id: "name2",
            type: "text",
            label: "Test 2",
            placeholder: "Test 2",
            otherClasses: "form-control",
            validations: {
              required: {
                message: "Is required"
              }
            }
          }
        ],
        actions: [
          {
            id: "submit",
            name: "Submit",
            type: "submit",
            icon: "fas fa-check-circle",
            otherClasses: "ui primary button custom-button"
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
#test {
  display: flex;
  justify-content: center;
  & .vue-form-terminator {
    max-width: 500px;
  }
}
</style>
