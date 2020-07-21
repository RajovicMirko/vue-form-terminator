export const VueFormTerminator = function(
  title,
  positioning,
  body,
  actions,
  model
) {
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
  let _title = "";
  let _model = {};
  let _config = {};
  let _positioning = {
    title: "center",
    input: {
      label: "top left",
      text: "left",
      errorMessage: "top right",
    },
  };

  const _positioningSchema = `
    String title: '',
    Object input: {
      String label: '',
      String text: '',
      String errorMessage: ''
    }
  `;
  let _actions = [];

  const _elements = [];

  // CLASSES //////////////////////////////////////////////////////////////////////////////////////
  // FORM LOGIC //////////////////////////////////
  function Form({ title, positioning, body, actions, model = {} }) {
    _title = title;
    _model = model;

    if (positioning) {
      Object.keys(positioning).map((k) => {
        if (typeof positioning[k] === "string") {
          if (!_positioning[k]) {
            throw new TerminatorError(
              `Wrong property in positioning schema: "${k}" can't be used!
positioning schema: ${_positioningSchema}`
            );
          }
          if (positioning[k]) _positioning[k] = positioning[k];
        } else {
          Object.keys(positioning[k]).map((k2) => {
            if (!_positioning[k][k2]) {
              throw new TerminatorError(
                `Wrong property in positioning schema: in object "${k}" property "${k2}" can't be used!
positioning schema: ${_positioningSchema}`
              );
            }
            if (positioning[k][k2]) _positioning[k][k2] = positioning[k][k2];
          });
        }
      });
    }

    if (!body)
      throw new TerminatorError(
        `Missing property in form setup: "body" is required property`
      );
    this.body = body.map((element) =>
      element.isGroup ? new Group(element) : new Element(element)
    );

    if (!actions)
      throw new TerminatorError(
        `Missing property in form setup: "actions" is required property`
      );

    _actions = actions;
  }

  Form.prototype = {
    get title() {
      return _title;
    },

    get model() {
      const data = {};
      _elements.map((el) => (data[el.id] = el.value));
      return data;
    },

    get positioning() {
      return _positioning;
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
  const Group = function(group) {
    this.isGroup = true;
    this.title = group.title;
    this.class = `group ${group.otherClasses}`;
    this.elements = group.elements.map((el) => new Element(el));
  };

  // SINGLE ELEMENT LOGIC //////////////////////////////////
  // ERROR MIXIN
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

  // VALIDATION MIXIN
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

  // SINGLE ELEMENT
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

    const errorRequiredProperties = `Missing property in form setup: in "body" schema required properties in element object are:
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

    get positioning() {
      return _positioning.input;
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
  return new Form(title, positioning, body, actions, model);
};
