import { loadHeaderFooter } from "./utils.js";
import CheckoutProcess from "./checkoutProcess.js";

loadHeaderFooter();
let register = new CheckoutProcess();
register.init();

document.getElementById("zip").addEventListener("blur", register.additionsTotal.bind(register));
// listen for the submit button
document.getElementById("checkedout").addEventListener("click", (ev) => {
    ev.preventDefault();
    register.checkout();
})
