import Handlebars from "handlebars/dist/handlebars.runtime";

export function registerHelpers() {
  Handlebars.registerHelper("getClass", function (someClass, postfix, classes) {
    return classes[someClass + postfix];
  });
  Handlebars.registerHelper("glueClasses", function (...array) {
    const result = array.reduce(function (accumulator, elem) {
      return typeof elem === "string" ? accumulator + ` ${elem}` : accumulator;
    }, "");
    return result;
  });
}
