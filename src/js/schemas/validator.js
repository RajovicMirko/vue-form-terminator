import { terminatorError } from "@js/error/terminatorError.js";
import Ajv from "ajv";
import positioning from "./positioning.json";
import body from "./body.json";

const schemas = {
  positioning,
  body,
};

export function schemaValidator(schema, data) {
  const ajv = new Ajv();
  const valid = ajv.validate(schemas[schema], data);

  if (!valid) terminatorError(ajv.errorsText());
}
