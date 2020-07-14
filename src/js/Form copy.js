class Item {
  constructor(el) {
    this.id = el.id;
    this.name = el.name;
    this.type = el.type;
    this.label = el.label;
    this.placeholder = el.placeholder;
    this.validations = el.validations || {};
    this.style = el.style;
    this.value = "";
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
}

export class Form {
  constructor(formBodyElements) {
    this.items = formBodyElements.map((el) => new Item(this, el));
    this.errors = {};
  }
  get haveErrors() {
    return Object.keys(this.haveErrors).length > 0;
  }

  get isValid() {
    this.validate();
    return !this.haveErrors;
  }

  validate() {}

  reset() {
    this.errors = {};
    for (let item of this.items) {
      item.reset();
    }
  }

  data() {
    const data = {};
    this.items.map((item) => (data[item.id] = item.value));
    return data;
  }
}
