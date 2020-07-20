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
  let _body = [];
  let _actions = [];

  let _groupCount = 1;
  const _elements = [];
  const _errors = {};

  // MIXINS //////////////////////////////////////////////////////////////////////////////////////
  const ElementErrorMixin = {
    _haveErrors: false,

    addError: function(errorMessage) {
      _errors[this.id].push(errorMessage);
    },

    removeError: function(errorMessage) {
      _errors[this.id] = _errors[this.id].filter((msg) => msg !== errorMessage);
    },

    errorMessage: function() {
      return _errors[this.id][0];
    },

    isValid: function() {
      this.validate();
      this._haveErrors = _errors[this.id].length > 0;
      return !this.haveErrors;
    },

    clearErrors: function() {
      _errors[this.id] = [];
      this._haveErrors = false;
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

    _body = body.map((element) =>
      element instanceof Array ? new Group(element) : new Element(element)
    );

    _actions = actions;
  }

  Form.prototype = {
    get errors() {
      return _errors;
    },

    get setup() {
      return _setup;
    },

    get config() {
      return _config;
    },

    get body() {
      return _body;
    },

    get actions() {
      return _actions;
    },

    get model() {
      const data = {};
      _elements.map((el) => (data[el.id] = el.value));
      return data;
    },

    validate: function() {
      const elValidationArr = _elements.map((el) => el.isValid());
      return elValidationArr.indexOf(false) === -1;
    },

    reset: () => {
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

    this.id = id;
    this.name = name;
    this.type = type;
    this.label = label;
    this.placeholder = placeholder;
    this.validations = validations || {};
    this.otherClasses = otherClasses;
    this.value = _model[id] = _model[id] || value || "";

    // Initialize element error array
    _errors[this.id] = [];

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

    get haveErrors() {
      return this._haveErrors;
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
