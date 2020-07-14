export class VueFormTerminator {
  constructor(formBody) {
    this.items = formBody.map((item) => new Item(this, item));
    this.haveErrors = false;
  }

  get isValid() {
    const test = this.items.map((item) => item.isValid);
    this.haveErrors = test.indexOf(false) !== -1;
    return !this.haveErrors;
  }

  reset() {
    this.items.map((item) => item.reset());
    this.haveErrors = false;
  }

  get data() {
    const data = {};
    this.items.map((item) => (data[item.id] = item.value));
    return data;
  }
}

/*************************************************************************************************************************/
/*************************************************************************************************************************/
class Error {
  constructor() {
    this.errors = [];
  }

  errorExists(message) {
    return this.errors.indexOf(message) !== -1;
  }

  addError(message) {
    if (!this.errorExists(message)) this.errors.push(message);
  }

  removeError(message) {
    this.errors = this.errors.filter((error) => error !== message);
  }

  resetErrors() {
    this.errors = [];
  }
}

/*************************************************************************************************************************/
/*************************************************************************************************************************/
class Item extends Error {
  constructor(form, item) {
    super();
    this.form = form;

    const {
      id,
      name,
      type,
      label,
      placeholder,
      validations,
      value,
      otherClasses,
    } = item;

    this.id = id;
    this.name = name;
    this.type = type;
    this.label = label;
    this.placeholder = placeholder;
    this.validations = validations || {};
    this.otherClasses = otherClasses;
    this.value = value || "";
  }

  required() {
    return !this.value.length;
  }

  min(val) {
    return this.value.length < val;
  }

  max(val) {
    return this.value.length > val;
  }

  email() {
    const emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return !emailReg.test(this.value);
  }

  compareElements(elId) {
    const comperedItem = this.form.items.filter((item) => item.id === elId);
    return comperedItem[0].value !== this.value;
  }

  get haveErrors() {
    return this.errors.length > 0;
  }

  get errorMessage() {
    return this.errors[0];
  }

  get isValid() {
    this.validate();
    return !this.haveErrors;
  }

  validate() {
    this.resetErrors();
    Object.keys(this.validations).map((fn) => {
      const { value, message } = this.validations[fn];

      if (this[fn]) {
        const isError = this[fn](value);
        const msg = message;
        isError ? this.addError(msg) : this.removeError(msg);
      } else {
        throw Error(
          `At form definition, item ${this.name}, validation function ${fn} does not exists`
        );
      }
    });
  }

  reset() {
    this.value = "";
    this.resetErrors();
  }
}
