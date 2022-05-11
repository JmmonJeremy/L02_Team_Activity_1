import { loadHeaderFooter } from "./utils.js";
import CheckoutProcess from "./checkoutProcess.js";

loadHeaderFooter();
// teacher has "so-cart" and ".checkout-summary"(the class name for the summary fieldset) as arugments
let register = new CheckoutProcess();
register.init();

document
  .getElementById("zip")
  .addEventListener("blur", register.additionsTotal.bind(register));
// listen for the submit button

document
  .getElementById("checkedout")
  .addEventListener("DOMContentLoaded", (ev) => {
    ev.preventDefault();
    register.checkout();
  });
