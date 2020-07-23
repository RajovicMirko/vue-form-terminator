export function generateSchemaFromObject(obj) {
  const result = {};
  (function looper(res, object) {
    Object.entries(object).map((entrie) => {
      if (typeof entrie[1] === "object") {
        const key = entrie[0];
        res[key] = {};
        looper(res[key], entrie[1]);
      }

      if (typeof entrie[1] !== "object") {
        res[entrie[0]] = typeof entrie[1];
      }
    });
  })(result, obj);

  let resultStr = String(JSON.stringify(result, null, 2));
  return resultStr.replace('"0":', "");
}
