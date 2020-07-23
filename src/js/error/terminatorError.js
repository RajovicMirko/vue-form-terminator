export class TerminatorError extends Error {
  constructor(message) {
    super(message);
    this.name = "vue-form-terminator";
  }
}

export function terminatorError(message) {
  throw new TerminatorError(message);
}
