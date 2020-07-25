import { terminatorError } from "@js/error/terminatorError.js";
import Ajv from "ajv";
import positioning from "./positioning.json";
import body from "./body.json";
import actions from "./actions.json";

const schemas = {
  positioning,
  body,
  actions,
};

export function schemaValidator(schema, data) {
  const ajv = new Ajv();
  const valid = ajv.validate(schemas[schema], data);

  if (!valid) {
    const errorsParams = ajv.errors.map((error) => error.params);
    const errorMessage = `
    ${ajv.errorsText()}:
    ${JSON.stringify(errorsParams, null, 2)}`;

    terminatorError(errorMessage.replace("data", schema));
  }
}
