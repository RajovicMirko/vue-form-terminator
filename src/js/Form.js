export class Form {
  constructor(formBodyElements) {
    this.items = formBodyElements.map((el) => new Item(this, el));
    this.errors = {};
  }

  validate() {
    this.items
      .filter((item) => item.validate)
      .map((item) => {
        let err = Object.assign([], item.validate());

        if (err.length > 0) {
          this.errors[item.name] = err;
        } else {
          delete this.errors[item.name];
        }
      });
  }

  reset() {
    this.errors = {};
    for (let item of this.items) {
      item.reset();
    }
  }

  get haveErrors() {
    const test = Object.keys(this.errors).length !== 0;
    return test;
  }

  get isValid() {
    this.validate();
    return !this.haveErrors;
  }

  get data() {
    const data = {};
    this.items.map((item) => (data[item.id] = item.value));
    return data;
  }
}

export class Item {
  constructor(form, el) {
    this.form = form;
    this.id = el.id;
    this.name = el.name;
    this.type = el.type;
    this.label = el.label;
    this.placeholder = el.placeholder;
    this.validations = el.validations || {};
    this.style = el.style;

    this.value = "";
    this.errors = [];
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

  addErrorMessage(message) {
    const msgIndex = this.errors.indexOf(message);
    if (msgIndex === -1) this.errors.push(message);
  }

  removeErrorMessage(message) {
    this.errors = this.errors.filter((err) => err !== message);
  }

  validate() {
    Object.keys(this.validations).map((fn) => {
      const validationObj = this.validations[fn];

      if (this[fn]) {
        const result = this[fn](validationObj.value);
        const msg = validationObj.message;
        result ? this.addErrorMessage(msg) : this.removeErrorMessage(msg);
      } else {
        throw Error(
          `At form definition, item ${this.name}, validation function ${fn} does not exists`
        );
      }
    });

    return this.errors;
  }

  reset() {
    this.errors = [];
    this.value = "";
  }

  get haveErrors() {
    return this.errors.length !== 0;
  }

  get isValid() {
    this.validate();
    return !this.haveErrors;
  }
}
