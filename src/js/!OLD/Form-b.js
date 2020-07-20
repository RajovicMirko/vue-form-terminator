const VueFormTerminator = (function() {
  /////////////////////////////////////////////////////////////////////////////
  /* HELPERS */
  /////////////////////////////////////////////////////////////////////////////
  const extendObj = function(child, parent) {
    // const tmpObj = function() {};
    // tmpObj.prototype = parent.prototype;
    // child.prototype = new tmpObj();
    // child.prototype.constructor = child;
    Object.assign(child.prototype, parent.prototype);
  };

  class TerminatorError extends Error {
    constructor(message) {
      super(message);
      this.name = "vue-form-terminator";
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // FORM ERROR LOGIC /////////////////////////////////////////
  const Errornator = function() {};
  Errornator.prototype = {
    errors: {},

    addError: function(errorMessage) {
      if (this.constructor.name !== "Item")
        throw new TerminatorError(
          "Function removeError can be used only with constructor Item"
        );
      this.errors.push(errorMessage);
    },

    removeError: function(errorMessage) {
      if (this.constructor.name !== "Item")
        throw new TerminatorError(
          "Function removeError can be used only with constructor Item"
        );

      this.errors = this.errors.filter((msg) => msg !== errorMessage);
    },

    errorMessage: function() {
      if (this.constructor.name !== "Item")
        throw new TerminatorError(
          "Function removeError can be used only with constructor Item"
        );

      return this.errors[0];
    },

    isValid: function() {
      let test = [];

      switch (this.constructor.name) {
        case "Item":
          this.validate();
          this.haveErrors = this.errors.length > 0;
          return !this.haveErrors;

        case "VueFormTerminator":
          test = this.body.getElements.map((item) => item.isValid());
          this.haveErrors = test.indexOf(false) !== -1;
          return !this.haveErrors;

        default:
          throw new TerminatorError(
            "Function isValid can be used only with constructors Item and Form"
          );
      }
    },

    clearErrors: function() {
      if (this.constructor.name !== "Item")
        throw new TerminatorError(
          "Function removeError can be used only with constructor Item"
        );

      this.errors = [];
      this.haveErrors = false;
    },
  };

  // FORM LOGIC /////////////////////////////////////////
  const Setup = function(setup) {
    this.setup = setup;
    this.test = "testSetup";
  };

  const Config = function(config) {
    this.config = config;
    this.test = "testConfig";
  };

  const Body = function(body, model) {
    let _groupCount = 0;
    const _elements = [];
    this.getElements = _elements;

    this.elements = body.map((item) => {
      if (item instanceof Array) {
        // GROUP ITEMS LOGIC
        _groupCount += 1;
        const groupItem = new Group(item, model, _groupCount);
        groupItem.items.map((itm) => _elements.push(itm));

        return groupItem;
      } else {
        // SINGLE ITEM LOGIC
        if (model[item.id]) item.value = model[item.id];
        const singleItem = new Item(item);

        _elements.push(singleItem);
        return singleItem;
      }
    });

    this.reset = function() {
      this.getElements.map((item) => {
        item.reset();
      });
    };

    const data = {};
    this.getData = function() {
      _elements.map((item) => (data[item.id] = item.value));
      return data;
    };
  };

  // const Actions = function (actions) {};

  const VueFormTerminator = function(
    { setup, config, body, actions },
    model = {}
  ) {
    this.setup = new Setup(setup);
    this.config = new Config(config);
    this.body = new Body(body, model);
    this.actions = actions; //new Actions(actions);
    this.haveErrors = false;

    this.getModel = function() {
      return this.body.getData();
    };

    this.reset = function() {
      this.body.reset();
    };

    // HELPER FOR ITEMS VALUE COMPARE (VALIDATION "compareElements")
    Item.prototype.getItemToCompare = (itemId) => {
      return this.body.getData()[itemId];
    };
  };
  extendObj(VueFormTerminator, Errornator);
  extendObj(VueFormTerminator, Setup);
  extendObj(VueFormTerminator, Config);

  // GROUP ITEMS LOGIC //////////////////////////////////
  const Group = function(items, model, groupId) {
    this.isGroup = true;
    this.class = `group group-${groupId}`;
    this.items = items.map((item) => {
      // SINGLE ITEM LOGIC
      if (model[item.id]) item.value = model[item.id];
      return new Item(item);
    });
  };

  // ITEM AND VALIDATION LOGIC /////////////////////////////////////////
  // VALIDATIONS
  const InputValidations = function() {};
  extendObj(InputValidations, Errornator);

  InputValidations.prototype.compareElements = function(elId) {
    const comperedItemValue = this.getItemToCompare(elId);
    return comperedItemValue !== this.value;
  };

  InputValidations.prototype.email = function() {
    const emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return !emailReg.test(this.value);
  };

  InputValidations.prototype.min = function(val) {
    return this.value.length < val;
  };

  InputValidations.prototype.max = function(val) {
    return this.value.length > val;
  };

  InputValidations.prototype.noWhiteSpace = function() {
    return this.value.indexOf(" ") !== -1;
  };

  InputValidations.prototype.numberOnly = function() {
    const reg = /^\d+$/;
    return !reg.test(this.value);
  };

  InputValidations.prototype.required = function() {
    return !this.value.length;
  };

  // ITEM
  const Item = function(item) {
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
    this.value = value || (item.type === "number" ? 0 : "");

    this.errors = this.errors[id] = [];
    this.haveErrors = false;

    this.validate = function() {
      this.clearErrors();

      Object.keys(this.validations).map((fn) => {
        const { value, message } = this.validations[fn];

        if (this[fn]) {
          const isError = this[fn](value);
          const msg = message;
          isError ? this.addError(msg) : this.removeError(msg);
        } else {
          throw new TerminatorError(
            `At form definition, item ${this.name}, validation function ${fn} does not exists`
          );
        }
      });
    };

    this.reset = function() {
      this.value = "";
      this.clearErrors();
    };
  };
  extendObj(Item, InputValidations);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // RETURN MODUL
  return VueFormTerminator;
})();

export default VueFormTerminator;
