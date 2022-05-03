import { getLocalStorage, setLocalStorage } from "./utils.js";
import { displayCart } from "./cart-superscript.js";

function getCartContents() {
  // let markup = "";
  let count = 1;
  let cartItems = getLocalStorage("so-cart");
  if (cartItems == null) {
    cartItems = [];
  } else {
    // Add Html category to each item object to match the HTML id
    cartItems.forEach((item) => {
      item.HtmlId = item.Id + count;
      //console.log(item.HtmlId);
      count++;
    });
  }
  // Put those item objects with the HtmlId category in the local storage
  setLocalStorage("so-cart", cartItems);
  //console.log(cartItems);
  // Render the HTML to the page
  const htmlItems = cartItems.map((item) => renderCartItem(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  //console.log(htmlItems);
  //console.log(cartItems);
  // update cart total when item is removed

  displayCart(cartItems);
  // Display the total in the cart if there are items in it.
  let cart_total = document.querySelector(".cart-footer");
  if (cartItems.length > 0) {
    //console.log(cartItems);
    cart_total.classList.remove("hide");
    // Update the total when item is removed
    cart_total.firstChild.innerHTML = "Total:";
    cart_total.firstChild.innerHTML = `${
      cart_total.firstChild.innerHTML
    } $${getCartTotal(cartItems)}`;
  } else {
    cart_total.classList.add("hide");
  }
  // Add a unique id to each item
  const ButtonId = document.querySelectorAll(".card__delete");
  // Reset count to match HtmlId
  count = 1;
  ButtonId.forEach((dButton) => {
    dButton.id += count;
    //console.log(dButton.id);
    count++;
  });
}

function resetCartContents(removeItem) {
  // List to render without removed product
  let reCartItems = [];
  //console.log(reCartItems);
  // Get current list from local storage and push items not removed to new list
  let reStartItems = getLocalStorage("so-cart");
  reStartItems.forEach((product) => {
    if (product.HtmlId != removeItem) {
      reCartItems.push(product);
    }
  });
  //console.log(reCartItems);
  // reset local storage to the new list
  setLocalStorage("so-cart", reCartItems);
  // render HTML
  getCartContents();
  // !!!RESET PAGE SO YOU CAN DELETE ANOTHER ITEM!!!
  document.location.reload(true);
}

function renderCartItem(item) {
  const newItem = `<li class="cart-card divider">
  <div data-id="${item.Id}">
    <img class="card__delete" id="${item.Id}" 
    src="../images/delete_icon.svg"
    alt="delete icon with a red x and the word remove"
    />
  </div>
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
  // console.log(newItem);
  return newItem;
}

function getCartTotal(cart) {
  let total = 0.0;
  cart.forEach((element) => {
    total += element.FinalPrice;
  });
  return total.toFixed(2);
}

getCartContents();
// SET AN EVENT LISTER FOR EACH PRODUCT ITEM
const deleteButtons = document.querySelectorAll(".card__delete");
deleteButtons.forEach((dButton) => {
  dButton.addEventListener("click", () => {
    // identify the id of the product that was clicked
    const removeItem = dButton.getAttribute("id");
    //console.log(removeItem);
    // call the resetCartContents function to delete the matching ID
    resetCartContents(removeItem);
  });
});
