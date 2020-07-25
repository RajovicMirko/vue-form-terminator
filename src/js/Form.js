import { terminatorError } from "./error/terminatorError.js";
import { schemaValidator } from "./schemas/validator.js";

export const VueFormTerminator = function(
  title,
  positioning,
  body,
  actions,
  model
) {
  // PRIVATE VARIABLES //////////////////////////////////////////////////////////////////////////////////////
  let _title = "";

  let _model = {};

  let _positioning = {
    title: "center",
    group: {
      title: "left",
    },
    input: {
      label: "top left",
      text: "left",
      errorMessage: "top right",
      checkbox: "left",
    },
  };

  let _actions = [];

  const _elements = [];

  // HELPER OBJECTS //////////////////////////////////////////////////////////////////////////////////////
  function applyMixin(object, mixin) {
    Object.assign(object.prototype, mixin);
  }

  function setPositioning(positioning = {}) {
    // If parameter empty exit;
    if (!positioning) return;
    // Schema validation input
    schemaValidator("positioning", JSON.parse(JSON.stringify(positioning)));

    // Recursive loop for properties
    (function looper(privatePositioning, positioning) {
      Object.keys(positioning).map((k) => {
        if (typeof positioning[k] === "object") {
          looper(privatePositioning[k], positioning[k]);
        }

        if (typeof positioning[k] === "string") {
          if (positioning[k]) privatePositioning[k] = positioning[k];
        }
      });
    })(_positioning, positioning);

    // Schema validation output
    schemaValidator("positioning", _positioning);
  }

  function setBody(body = []) {
    schemaValidator("body", body);

    const errorMessage = `Missing property in form setup: "body" is required property`;
    if (!body) terminatorError(errorMessage);

    this.body = body.map((element) =>
      element.isGroup ? new Group(element) : new Element(element)
    );
  }

  function setActions(actions = []) {
    schemaValidator("actions", actions);

    const errorMessage = `Missing property in form setup: "actions" is required property`;
    if (!actions) terminatorError(errorMessage);

    _actions = actions;
  }

  // CLASSES //////////////////////////////////////////////////////////////////////////////////////
  // FORM LOGIC //////////////////////////////////
  function Form({ title, positioning, body, actions, model = {} }) {
    _title = title;
    _model = model;

    setPositioning(positioning);
    setBody.call(this, body);
    setActions(actions);
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

  Group.prototype = {
    get positioning() {
      return _positioning.group;
    },
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
    if (!id || !type) terminatorError(errorRequiredProperties);

    this.id = id;
    this.name = name;
    this.type = type;
    this.label = label;
    this.placeholder = placeholder;
    this.validations = validations || {};
    this.otherClasses = otherClasses;
    this.value = _model[id] = _model[id] || value || null;
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

      Object.keys(this.validations).map((validator) => {
        const { fn, value, message } = this.validations[validator];

        if (this[validator] || validator === "test") {
          const isError =
            validator === "test" ? fn.apply(this) : this[validator](value);

          const msg = message;
          isError ? this.addError(msg) : this.removeError(msg);
        } else {
          terminatorError(
            `At form definition, element ${this.name}, validation function ${validator} does not exists`
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
