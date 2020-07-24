# vue-form-terminator

- [vue-form-terminator](#vue-form-terminator)
  - [DEPENDANCIES](#dependancies)
  - [INTRODUCTION](#introduction)
  - [GIT SAMPLE](#git-sample)
  - [INSTALLATION](#installation)
  - [IMPORT](#import)
  - [USAGE](#usage)
  - [Registration page code explanation](#registration-page-code-explanation)
    - [template](#template)
    - [script](#script)
      - [formSetup](#formsetup)
        - [title - Form title](#title---form-title)
        - [positioning](#positioning)
        - [body - Form inputs](#body---form-inputs)
        - [actions - Form buttons](#actions---form-buttons)
      - [model](#model)
      - [method](#method)
    - [style](#style)
      - [Third-party](#third-party)

## DEPENDANCIES

For proper functioning of vue-form-terminator please install dependencies

## INTRODUCTION

This component contains a functional part of the form with the responsiveness, and styling is left as customizable.

Is created in a way to be easily integrated with third party CSS libraries like Bootstrap, SemanticUI, Font Awesome...

More about that in the styling section.

## GIT SAMPLE

Follow the link for more information

Sample - https://github.com/RajovicMirko/vue-form-terminator-live

Git sample contains sample pages for:

- NoStyle
- Bootstrap
- SemanticUI

## INSTALLATION

```
npm i --save vue-form-terminator
```

## IMPORT

In the primary vue project file main.js, index.js or whatever, use the following code

**_if vue-form-terminator.common is not imported, no initial style will be active. Is recommended to import it for the best experience_**

```js
import VueFormTerminator from "vue-form-terminator";
import "vue-form-terminator/dist/vue-form-terminator.common";
Vue.use(VueFormTerminator);
```

Now the vue-form-terminator component is available in the whole vue app.
```html
<template>
  <vue-form-terminator></vue-form-terminator>
<template>
```

## USAGE

**_In the following sections, a simple registration page will be presented and the styling with bootstrap_**

For this demo let's use CDNs for bootstrap and font awesome.

In the main index.html in the head section add following code:
```html
<!-- Bootstrap CDN -->
<link
  rel="stylesheet"
  href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
/>

<!-- FontAwesome CDN -->
<link
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
  rel="stylesheet"
/>
```

Then let's create a file named "Registration.vue" in "src/view" folder and paste the following code:

Code is explained after the script:
```javascript
<template>
  <div id="registration">
    <vue-form-terminator
      v-bind="formSetup"
      :model="model"
      @submited="handleSubmit"
    >
    </vue-form-terminator>
  </div>
</template>

<script>
export default {
  name: "Registration",

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
        title: "Registration",
        positioning: {
          title: "",
          group: {
            title: "none",
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

#registration {
  display: grid;
  grid-template-rows: auto 1fr;
  place-items: center;
  color: $primary;

  & .vue-form-terminator {
    width: 40%;
    min-width: 300px;

    & .titlenator {
      margin: 0;
    }

    & .group {
      &.outline {
        margin-bottom: 0.5rem;
      }

      &.group-1 {
        & .group-data {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          grid-gap: 0 1rem;

          & .inputnator {
            width: 100%;

            &.firstName {
              grid-column: 1/6;
            }
            &.lastName {
              grid-column: 1/6;
            }

            &.address {
              grid-column: 1/4;
            }

            &.addressNumber {
              grid-column: 4/6;
            }
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

    // BIG SCREEN
    @media (min-width: 768px) {
      & .group {
        &.group-1 {
          & .group-data {
            & .inputnator {
              &.firstName {
                grid-column: 1/3;
              }
              &.lastName {
                grid-column: 3/6;
              }
            }
          }
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
</style>
```

## Registration page code explanation

**_So what's happening here_**

### template

vue-form-terminator component props are:
* two attributes:
  * model - not required
  * formSetup - required
* submit handler:
  * method - required

All of the props and methods are explained in the script section.

### script

#### formSetup
formSetup contains many attributes and I'll try to explain them all:

##### title - Form title
This is form title. If you don't enter a value, the title will not be presented.

##### positioning
This is an object that controls some of the elements positioning.

In the code below logic is:

attribute - type (valid values)

```js
positioning: {
  title: string ("", "left", "center", "right"),
  group: {
    title: string ("", "none", "left", "center", "right"),
  },
  input: {
    label: string ( "", "none", "top", "bottom", "top left", "top center", "top right", "bottom left", "bottom center", "bottom right"),
    text: string ("", "left", "center", "right"),
    errorMessage: string ( "", "none", "top", "bottom", "top left", "top center", "top right", "bottom left", "bottom center", "bottom right")
  }
}
```

##### body - Form inputs
"body" object can include two types of schemas:

- Single element object:
  - id - required (form model object keys depends on it)
  - name - not required
  - type - required (for now available values are text, number, password, email)
  - label - not required
  - placeholder - not required
  - validations - not required. Available validations are:
    - compareElements { value: 'id of body object to compare with' message: 'return this error message'}
    - email { message: 'return this error message' }
    - min { value: 'Number of min string length' message: 'return this error message'}
    - max { value: 'Number of max string length' message: 'return this error message'}
    - noWhiteSpace { message: 'return this error message'}
    - numberOnly { message: 'return this error message'}
    - required { message: 'return this error message'}
  - otherClasses - not required (use to integrate custom and thired party class names)

- Group element object:
  - isGroup: required (set it to true)
  - title: not required
  - otherClasses - not required (use to integrate custom and thired party class names
  - elements - required (this is an array of "Single element object")

The main difference is that Single element is represented each in a new row, and Group element is represented in a single row.

Of course, the Group element can be controlled via CSS grid (as in the sample), and be reorganized in the way you need it.

##### actions - Form buttons
"actions" is an array of objects and it's attributes are:
- id - required
- name - required
- type - required (for now available values are submit, reset)
- otherClasses - not required (use to integrate thired party class names)

#### model
Form don't sync model, it creates a new one that is returned through the submit method as an object of all body elements.

Please try and see what is happening when you remove the model.

#### method
"data" parameter represents the new model.
```js
handleSubmit(data) {
  console.log(data);
},
```

### style
SCSS is used for styling and you can see that with a small amount of code we receive a very good result.

And Vue-la. That was it. :D :D :D :D

#### Third-party

For now are tested:

- Bootstrap
- SemanticUI
- Font Awesome
