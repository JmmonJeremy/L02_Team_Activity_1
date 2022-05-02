import { getLocalStorage, setLocalStorage } from "./utils";
import {displayCart} from "./cart-superscript.js";

function getCartContents() {
  // let markup = "";
  let count = 1;
  let cartItems = getLocalStorage("so-cart");
  if (cartItems == null) {
    cartItems = [];
  } else {
    cartItems.forEach(item => {
      item.HtmlId = item.Id + count;
      console.log(item.HtmlId);
      count++;
    })
  }
  setLocalStorage("so-cart", cartItems);
  console.log(cartItems);
  const htmlItems = cartItems.map((item) => renderCartItem(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  // document.querySelector(".product-list").innerHTML = renderCartItem(cartItems);
  console.log(htmlItems);
  console.log(cartItems);
  // renderCartItem(cartItems);

  // update cart total
  displayCart(cartItems);
  // Display the total in the cart if there are items in it.
  let cart_total = document.querySelector(".cart-footer");
  if (cartItems.length > 0) {
    console.log(cartItems);
    cart_total.classList.remove("hide");
    cart_total.firstChild.innerHTML = "Total:"
    cart_total.firstChild.innerHTML = `${
      cart_total.firstChild.innerHTML
    } $${getCartTotal(cartItems)}`;
  } else {
    cart_total.classList.add("hide");
  }

  // Add a unique id to each item
  const deleteButtons = document.querySelectorAll(".card__delete");
  // Reset count to match HtmlId
  count = 1;
  deleteButtons.forEach(dButton => {
    dButton.id += count;
    console.log(dButton.id);
    count++;
  });

}

function resetCartContents() {
  let reCartItems = []
  console.log(reCartItems);  
  const deleteButtons = document.querySelectorAll(".card__delete");
  deleteButtons.forEach(dButton => {
    dButton.addEventListener("click", () =>{ 
      const removeItem = dButton.getAttribute("id")     
      console.log(removeItem);      
      let reStartItems = getLocalStorage("so-cart");
      reStartItems.forEach(item => {         
        if (item.HtmlId != removeItem) {          
          reCartItems.push(item);                   
        }                
      });
      console.log(reCartItems); 
      setLocalStorage("so-cart", reCartItems);
      getCartContents()
    });
  });

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
  return total;
}

getCartContents();
resetCartContents();
