import { getLocalStorage } from "./utils.js";

async function renderCartSuperscript(cart) {
  let total = cart.length;
  // let cart_image = document.querySelector(".cart>a");
  let badge = await document.querySelector(".cart-total-badge");
  // console.log(badge)
  if (badge != null) {
    badge.innerHTML = total;
  }
  // else {
  // badge = document.createElement("span");
  // badge.setAttribute("class", "cart-total-badge");
  // cart_image.insertBefore(badge, cart_image.firstChild);
  // badge.innerHTML = total;
  // }

  if (total > 0) {
    badge.classList.remove("hide");
  } else {
    badge.classList.add("hide");
  }
}
export async function displayCart() {
  let cartItems = getLocalStorage("so-cart");
  if (cartItems != null) {
    await renderCartSuperscript(cartItems);
  }
}
