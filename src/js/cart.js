import { loadHeaderFooter } from "./utils.js";
import ShoppingCart from "./shoppingCart.js";

loadHeaderFooter();

const cart = new ShoppingCart(
  "so-cart",
  document.querySelector(".product-list")
);
cart.init();