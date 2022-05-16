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

document.getElementById("checkedout").addEventListener("click", (ev) => {
  ev.preventDefault();
  let orderForm = document.forms[0];
  let statusCheck = orderForm.checkValidity();
  orderForm.reportValidity();
  if (statusCheck) {
    register.checkout();
  }
});
