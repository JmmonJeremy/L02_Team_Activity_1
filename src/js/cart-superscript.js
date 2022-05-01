import { getLocalStorage } from "./utils.js";

function renderCartSuperscript(cart) {
  let total = cart.length;
  let cart_image = document.querySelector(".cart>a");
  let badge = document.querySelector(".cart-total-badge");
  if (badge != null) {
    badge.innerHTML = total;
  } else {
    badge = document.createElement("span");
    badge.setAttribute("class", "cart-total-badge");
    cart_image.insertBefore(badge, cart_image.firstChild);
    badge.innerHTML = total;
  }
}
export function displayCart() {
  let cartItems = getLocalStorage("so-cart");
  if (cartItems != null) {
    renderCartSuperscript(cartItems);
  }
}

// get the current cart total when the page loads.
// This is also called in the productDetails class so it updates whenever something is added to the cart.
let currentCart = getLocalStorage("so-cart");
displayCart(currentCart);
