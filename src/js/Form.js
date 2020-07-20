export const VueFormTerminator = function(setup, config, body, actions, model) {
  // HELPERS //////////////////////////////////////////////////////////////////////////////////////
  function applyMixin(object, mixin) {
    Object.assign(object.prototype, mixin);
  }

  class TerminatorError extends Error {
    constructor(message) {
      super(message);
      this.name = "vue-form-terminator";
    }
  }

  // PRIVATE VARIABLES //////////////////////////////////////////////////////////////////////////////////////
  let _model = {};
  let _config = {};
  let _setup = {};
  let _actions = [];

  let _groupCount = 1;
  const _elements = [];

  // MIXINS //////////////////////////////////////////////////////////////////////////////////////
  const ElementErrorMixin = {
    addError: function(errorMessage) {
      this.errors.push(errorMessage);
    },

    removeError: function(errorMessage) {
      this.errors = this.errors.filter((msg) => msg !== errorMessage);
    },

    errorMessage: function() {
      return this.errors[0];
    },

    isValid: function() {
      this.validate();
      this.haveErrors = this.errors.length > 0;
      return !this.haveErrors;
    },

    clearErrors: function() {
      this.errors = [];
      this.haveErrors = false;
    },
  };

  const ElementValidationsMixin = {
    compareElements: function(elId) {
      const comperingElement = _elements.find((el) => el.id === elId);
      return this.value !== comperingElement.value;
    },

    email: function() {
      const emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return !emailReg.test(this.value);
    },

    min: function(val) {
      return this.value.length < val;
    },

    max: function(val) {
      return this.value.length > val;
    },

    noWhiteSpace: function() {
      return this.value.indexOf(" ") !== -1;
    },

    numberOnly: function() {
      const reg = /^\d+$/;
      return !reg.test(this.value);
    },

    required: function() {
      return !this.value.length;
    },
  };

  // CLASSES //////////////////////////////////////////////////////////////////////////////////////
  // FORM LOGIC //////////////////////////////////
  function Form({ setup, config, body, actions, model = {} }) {
    _model = model;

    _setup = setup;

    _config = config;

    if (!body)
      throw new TerminatorError(
        `Missing property in form setup: "body" is required property`
      );
    this.body = body.map((element) =>
      element instanceof Array ? new Group(element) : new Element(element)
    );

    this.body.map((el) => {
      el instanceof Group
        ? el.elements.map((e) => _elements.push(e))
        : _elements.push(el);
    });

    if (!actions)
      throw new TerminatorError(
        `Missing property in form setup: "actions" is required property`
      );
    _actions = actions;
  }

  Form.prototype = {
    get model() {
      const data = {};
      _elements.map((el) => (data[el.id] = el.value));
      return data;
    },

    get setup() {
      return _setup;
    },
    get config() {
      return _config;
    },
    get actions() {
      return _actions;
    },

    validate: function() {
      const elValidationArr = _elements.map((el) => el.isValid());
      return elValidationArr.indexOf(false) === -1;
    },

    reset: function() {
      _elements.map((el) => el.reset());
    },
  };

  // GROUP ELEMENTS LOGIC //////////////////////////////////
  const Group = function(elements) {
    this.isGroup = true;
    this.class = `group group-${_groupCount}`;
    this.elements = elements.map((el) => new Element(el));

    // Prepare data for next group elements
    _groupCount += 1;
  };

  // SINGLE ELEMENT LOGIC //////////////////////////////////
  function Element(element) {
    const {
      id,
      name,
      type,
      label,
      placeholder,
      validations,
      value,
      otherClasses,
    } = element;

    const errorRequiredProperties = `Missing property in form setup: in "body" schema required properties are:
    - id
    - type`;
    if (!id || !type) throw new TerminatorError(errorRequiredProperties);

    this.id = id;
    this.name = name;
    this.type = type;
    this.label = label;
    this.placeholder = placeholder;
    this.validations = validations || {};
    this.otherClasses = otherClasses;
    this.value = _model[id] = _model[id] || value || "";

    // Initialize element error array
    this.errors = [];
    this.haveErrors = false;

    // Added _elements private variable for easier data extraction and elements manipulation
    _elements.push(this);
  }

  Element.prototype = {
    get value() {
      return _model[this.id];
    },
    set value(val) {
      _model[this.id] = val;
    },

    // Control of element input component (Bootstrap or SemanticUI) logic
    get inputComponentClass() {
      if (this.otherClasses) {
        switch (true) {
          // SemanticUI logic
          case this.otherClasses.substring(0, 2).toLowerCase() === "ui":
            return "input-ui";

          // Others logic
          default:
            return "";
        }
      }

      return "";
    },

    reset: function() {
      this.value = "";
      this.clearErrors();
    },

    validate() {
      this.clearErrors();

      Object.keys(this.validations).map((fn) => {
        const { value, message } = this.validations[fn];

        if (this[fn]) {
          const isError = this[fn](value);
          const msg = message;

          isError ? this.addError(msg) : this.removeError(msg);
        } else {
          throw new TerminatorError(
            `At form definition, element ${this.name}, validation function ${fn} does not exists`
          );
        }
      });
    },
  };

  applyMixin(Element, ElementErrorMixin);
  applyMixin(Element, ElementValidationsMixin);

  // RETURN MODUL RESULT
  return new Form(setup, config, body, actions, model);
};
