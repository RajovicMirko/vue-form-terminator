# vue-form-terminator

- [vue-form-terminator](#vue-form-terminator)
  - [DEPENDANCIES](#dependancies)
  - [INTRODUCTION](#introduction)
  - [GIT SAMPLE](#git-sample)
  - [INSTALLATION](#installation)
  - [IMPORT](#import)
  - [USAGE](#usage)
    - [Template section](#template-section)
    - [Script section](#script-section)
      - [title](#title)
      - [errorMessagePosition](#errormessageposition)
      - [body - array of objects for form inputs.](#body---array-of-objects-for-form-inputs)
      - [actions - array of objects for form buttons](#actions---array-of-objects-for-form-buttons)
    - [Style section](#style-section)
      - [Third-party](#third-party)

## DEPENDANCIES

For proper functioning of vue-form-terminator please install dependencies

- vue-fragment - https://www.npmjs.com/package/vue-fragment

## INTRODUCTION

This component contains a functional part of the form, and styling is left as customizable.

Is created in a way to be easily integrated with third party CSS libraries like Bootstrap and SemanticUI.

More about that in the styling section.

## GIT SAMPLE

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
                  message: "First name is required"
                },
                max: {
                  value: 30,
                  message: "First name must have less then 20 characters"
                }
              },
              otherClasses: "form-control"
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
              otherClasses: "form-control"
            }
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
                  message: "Address is required"
                }
              },
              otherClasses: "form-control"
            },
            {
              id: "houseNumber",
              name: "HouseNumber",
              type: "text",
              label: "",
              placeholder: "No.",
              validations: {
                required: {
                  message: "No. is required"
                },
                numberOnly: {
                  message: "No. must be string"
                }
              },
              otherClasses: "form-control"
            }
          ],
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
            otherClasses: "form-control"
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
            otherClasses: "form-control"
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
            otherClasses: "form-control"
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
            icon: "fas fa-plus",
            otherClasses: "btn btn-outline-primary custom-button"
          },
          {
            id: "reset",
            name: "Reset",
            type: "reset",
            icon: "fas fa-camera",
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
```

I know it looks ugly, but wait for it :D

**_So what's happening here_**

_"formSetup" object attributes explained:_

#### title

- form title (not requiered)

#### errorMessagePosition

- does input error validation message is on top of the input or on the bottom (requiered)
- valid values: top or bottom

#### body - array of objects for form inputs.

**The first level**

- Available atributes are:
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
    - numberOnly { message: 'return this error message'}
    - required { message: 'return this error message'}
  - otherClasses - not required (use to integrate thired party class names)

**The second level (GROUPING)**

- if you create another array of objects like "The first level", it will be presented as a group element (single line elements)
- Groups are automatically separated by class "group group-{counter number}"

#### actions - array of objects for form buttons

- id - required
- name - required
- type - required (for now available values are submit, reset)
- otherClasses - not required (use to integrate thired party class names)

methods explained:

- handleSubmit - when we submit vue-form-terminator the "data" key:value pairs object is returned from the form in a way that inputs id is key and value is ... well input value :D

### Style section

Now let's make it looks better

Sample bootstrap:

In the public/index.html in < head> section use bootstrap CDN, or import it in any other way.

It's important that we make bootstrap classes available to us in the project.

```html
<link
  rel="stylesheet"
  href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
  integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
  crossorigin="anonymous"
/>
```

After that, define classes you want to use in the otherClasses attribute of body and action objects.

In this sample we already defined in the script section:

```js
// FOR INPUTS IN body ATRIBUTE
otherClasses: "form-control custom-input-bootstrap";

// FOR BUTTONS IN actions ATRIBUTE
otherClasses: "btn btn-outline-primary custom-button";
```

Check the result, is much better now :D.

Let's customize it a bit to make it awesome:

```scss
<style lang="scss">
#registration {
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

    & .group-1 {
      & .firstName,
      & .lastName {
        width: 100%;
      }
    }

    & .group-2 {
      flex-direction: row;
      & .address {
        width: 65%;
      }

      & .houseNumber {
        width: 30%;
      }
    }

    & .buttonator {
      & button {
        width: 48%;
      }
    }
  }
}

@media (min-width: 930px) {
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
```

And Vue-la. That was it. :D :D :D :D

#### Third-party

For now:

- Bootstrap
- SemanticUI
