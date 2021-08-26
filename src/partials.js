import Handlebars from "handlebars/dist/handlebars.runtime";
import button from "../src/partials/base/button.hbs";
import input from "../src/partials/base/input.hbs";
import heading from "../src/partials/base/heading.hbs";

export function registerPartials() {
  Handlebars.registerPartial("button", button);
  Handlebars.registerPartial("input", input);
  Handlebars.registerPartial("heading", heading);
}
