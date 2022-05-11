import { loadHeaderFooter } from "./utils.js";
import CheckoutProcess from "./checkoutProcess.js";

loadHeaderFooter();
let register = new CheckoutProcess();
register.itemsSubtotal();
register.additionsTotal();