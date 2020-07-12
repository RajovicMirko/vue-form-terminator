export class Form {
  constructor(formBodyElements) {
    this.items = formBodyElements.map((el) => new Item(this, el));
    this.errors = [];
  }

  validate() {}

  get data() {
    const data = {};
    this.items.map((item) => (data[item.id] = item.value));
    return data;
  }

  test() {
    console.log(this.items);
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
    this.value = "";
  }

  validate() {}
}
