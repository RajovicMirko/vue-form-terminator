class TerminatorError extends Error {
  constructor(message) {
    super(message);
    this.name = "vue-form-terminator";
  }
}
