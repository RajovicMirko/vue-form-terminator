# vue-form-terminator

- [vue-form-terminator](#vue-form-terminator)
  - [INTRODUCTION](#introduction)
  - [SAMPLES](#samples)
  - [INSTALLATION](#installation)
  - [IMPORT](#import)
  - [USAGE](#usage)
    - [Template section](#template-section)
    - [Script section](#script-section)
    - [Style section](#style-section)
      - [Third-party](#third-party)
      - [Complete scss vue-form-terminator schema](#complete-scss-vue-form-terminator-schema)
  - [GIT PROJECT](#git-project)

## INTRODUCTION

This is Vue.js form component with the smallest possible styling.
Is created in a way to be easily integrated with third party CSS libraries like Bootstrap, SemanticUI...

More about that in the styling section.

## SAMPLES

Git project - https://github.com/RajovicMirko/vue-form-terminator-live

Git project contains sample pages for:

- Bootstrap
- SemanticUI

## INSTALLATION

```
npm i --save vue-form-terminator
```

## IMPORT

In the primary vue project file main.js, index.js or whatever use the code

**_if vue-form-terminator.common is not imported, no initial style will be active. Is recommended to import it for the best experience_**

```js
import VueFormTerminator from "vue-form-terminator";
import "vue-form-terminator/dist/vue-form-terminator.common";
Vue.use(VueFormTerminator);
```

Now the vue-form-terminator component is available in the whole vue app.

## USAGE

**_In the following sections, a simple registration page will be presented_**

**_Styling with Bootstrap_**

First create file named "Registration.vue" in src/view folder

### Template section

In the template section, call the component

```js
<template>
  <div id="registration">
    <vue-form-terminator
      v-bind="formSetup"
      @submited="handleSubmit"
    ></vue-form-terminator>
  </div>
</template>
```

For proper component functioning, we need to bind object (in this case "formSetup") and submit event controller (in this case "handleSubmit")

**_More about them in the script section_**

### Script section

**_Description of script section is after the code_**

```js
<script>
export default {
  data() {
    return {
      formSetup: {
        title: "Registration page",
        errorMessagePosition: "bottom",
        body: [
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
                message: "No space alowed",
              },
            },
            otherClasses: "form-control custom-input"
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
            otherClasses: "form-control custom-input"
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
            otherClasses: "form-control custom-input"
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
            otherClasses: "form-control custom-input"
          }
        ],
        actions: [
          {
            id: "submit",
            name: "Submit",
            type: "submit",
            otherClasses: "btn btn-outline-primary custom-button"
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
```

I know it looks ugly, but wait for it :D

**_So what's happening here_**

_"formSetup" object attributes explained:_

- **_title_** - form title (not requiered)
- **_errorMessagePosition_** - does input error validation message is on top of the input or on the bottom (requiered)
  - valid values: top or bottom
- **_body_** - array of objects for form inputs. Available atributes are:
  - id - required (form return object keys depends on it)
  - name - not required
  - type - required (for now available values are text, password, email)
  - label - not required
  - placeholder - not required
  - validations - not required. Available validations are:
    - compareElements { value: 'id of body object to compare with' message: 'return this error message'}
    - email { message: 'return this error message' }
    - min { value: 'Number of min string length' message: 'return this error message'}
    - max { value: 'Number of max string length' message: 'return this error message'}
    - noWhiteSpace { message: 'return this error message'}
    - required { message: 'return this error message'}
  - otherClasses - not required (use to integrate thired party class names)
- **_actions_** - array of objects for form buttons
  - id - required
  - name - required
  - type - required (for now available values are submit, reset)
  - otherClasses - not required (use to integrate thired party class names)

methods explained:

- handleSubmit - when we submit vue-form-terminator the "data" key:value pairs object is returned from the form in the way that inputs id is key and value is well input value :D

### Style section

Now let's make it look better

Sample bootstrap:

In the public/index.html in < head> section use bootstrap CDN, or import it in any other way.

Is just important that we need to make bootstrap classes available to us in the project

```html
<link
  rel="stylesheet"
  href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
  integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
  crossorigin="anonymous"
/>
```

After that, define classes you want to use in the otherClass attribute of objects.

In this sample we already defined in the script section:

```js
// FOR INPUTS IN body ATRIBUTE
otherClasses: "form-control custom-input";

// FOR BUTTONS IN actions ATRIBUTE
otherClasses: "btn btn-outline-primary custom-button";
```

Check the result, is much better now :D.

Let's customize it a bit to make it awesome:

```css
<style lang="scss">
#registration {
  display: grid;
  place-items: center;
  height: 100vh;
  min-width: 350px;

  & .vue-form-terminator {
    width: 40%;
    min-width: 300px;

    & .titlenator {
      margin-bottom: 1.5rem;
      font-weight: bold;
      color: #007bff;
    }

    & .inputnator {
      margin-bottom: 0.5rem;
    }

    & .buttonator {
      justify-content: center;
    }
  }

  & .custom-input {
    border-radius: 2rem;
  }

  & .custom-button {
    border-radius: 2rem;
    width: 40%;
  }
}
</style>
```

And vue-la. That was it. :D :D :D :D

#### Third-party

It's not tested with other CSS libraries except Bootstrap and SemanticUI.

#### Complete scss vue-form-terminator schema

This is a complete scss structure for vue-form-terminator:

```scss
// form
.vue-form-terminator {
  // title wrapper
  & .titlenator {
    // titlenator if invalid
    &.invalid {
    }

    // title
    & span {
      // span if invalid
      &.invalid {
      }
    }
  }

  // mid form section - inputs wrapper
  & .bodynator {
    // bodynator if invalid
    &.invalid {
    }

    // single label, input, errornator wrapper
    & .inputnator {
      // inputnator if invalid
      &.invalid {
      }

      // input label
      & label {
        // input label if invalid
        &.invalid {
        }
      }

      // input for bootstrap
      & input {
        // input for bootstrap if invalid
        &.invalid {
        }
      }

      // input for semanticUi
      & div {
        & input {
          // input for semanticUi if invalid
          &.invalid {
          }
        }
      }

      // input error wrapper
      & .errornator {
        // input error message
        & small.invalid {
        }
      }
    }
  }

  // buttons wrapper
  & .buttonator {
    // form button
    & button {
    }
  }
}
```

## GIT PROJECT

https://github.com/RajovicMirko/vue-form-terminator
