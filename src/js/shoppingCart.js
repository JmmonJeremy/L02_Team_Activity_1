import {
  getLocalStorage,
  renderListWithTemplate,
  setLocalStorage,
  loadTemplate,
} from "./utils";
// import { displayCart } from "./cart-superscript.js";

export default class ShoppingCart {
  constructor(key, listElement) {
    this.key = key;
    this.listElement = listElement;
  }

  async init() {
    const list = getLocalStorage(this.key);
    this.renderList(list);
    this.displayCartTotal(list);
    // this.deleteButton();

  }

  prepareTemplate(template, product) {
    template.querySelector(".cart-card__image img").src = product.Image;
    template.querySelector(".cart-card__image img").alt += product.Name;
    template.querySelector(".card__name").textContent = product.Name;
    template.querySelector(".cart-card__color").textContent =
      product.Colors[0].ColorName;
    template.querySelector(".cart-card__price").textContent +=
      product.FinalPrice;
    return template;
  }

  async renderList(list) {
    this.listElement.innerHTML = "";
    const template = await loadTemplate("../partials/cart-card-template.html");
    // const template = document.getElementById("cart-card-template");
    renderListWithTemplate(
      template,
      this.listElement,
      list,
      this.prepareTemplate
    );
    this.deleteButton();
  }
  deleteButton() {
    const deleteButtons = document.querySelectorAll(".card__delete");
    let count = 1;
    deleteButtons.forEach((dButton) => {
      dButton.id += count;
      console.log(dButton)
    
      count++;
      dButton.addEventListener("click", () => {
        // identify the id of the product that was clicked
        const removeItem = dButton.getAttribute("id");
        // call the resetCartContents function to delete the matching ID
        this.resetCartContents(removeItem);
        // console.log(removeItem);
      });
    });
  }

    resetCartContents(removeItem) {
      // List to render without removed product
      let reCartItems = [];
      //console.log(reCartItems);
      // Get current list from local storage and push items not removed to new list
      let reStartItems = getLocalStorage(this.key);
      reStartItems.forEach((product) => {
        if (product.HtmlId != removeItem) {
          reCartItems.push(product);
        }
      });
      console.log(reCartItems);
      // reset local storage to the new list
      setLocalStorage("so-cart", reCartItems);

      // !!!RESET PAGE SO YOU CAN DELETE ANOTHER ITEM!!!
      // document.location.reload(true)
    }
  
  displayCartTotal(cartItems) {
    let cart_total = document.querySelector(".cart-footer");
    if (cartItems.length > 0) {
      cart_total.classList.remove("hide");
      // Update the total when item is removed
      cart_total.firstChild.innerHTML = "Total:";
      cart_total.firstChild.innerHTML = `${
      cart_total.firstChild.innerHTML
    } $${this.getCartTotal(cartItems)}`;
    } else {
      cart_total.classList.add("hide");
    }
  }
  getCartTotal(cart) {
    let total = 0.0;
    cart.forEach((element) => {
      total += element.FinalPrice;
    });
    return total.toFixed(2);
  }
}

// function getCartContents() {
//   // let markup = "";
//   let count = 1;
//   let cartItems = getLocalStorage("so-cart");
//   if (cartItems == null) {
//     cartItems = [];
//   } else {
//     // Add Html category to each item object to match the HTML id
//     cartItems.forEach((item) => {
//       item.HtmlId = item.Id + count;
//       //console.log(item.HtmlId);
//       count++;
//     });
//   }

// Put those item objects with the HtmlId category in the local storage
//   setLocalStorage("so-cart", cartItems);
//console.log(cartItems);
// Render the HTML to the page
//   const htmlItems = cartItems.map((item) => renderCartItem(item));
//   document.querySelector(".product-list").innerHTML = htmlItems.join("");
//console.log(htmlItems);
//console.log(cartItems);
// update cart total when item is removed

// displayCart(cartItems);

// Display the total in the cart if there are items in it.
// let cart_total = document.querySelector(".cart-footer");
// if (cartItems.length > 0) {
//   //console.log(cartItems);
//   cart_total.classList.remove("hide");
//   // Update the total when item is removed
//   cart_total.firstChild.innerHTML = "Total:";
//   cart_total.firstChild.innerHTML = `${
//     cart_total.firstChild.innerHTML
//   } $${getCartTotal(cartItems)}`;
// } else {
//   cart_total.classList.add("hide");
// }
// Add a unique id to each item
// const ButtonId = document.querySelectorAll(".card__delete");
// // Reset count to match HtmlId
// let count = 1;
// ButtonId.forEach((dButton) => {
//   dButton.id += count;
//   //console.log(dButton.id);
//   count++;
// });

// function resetCartContents(removeItem) {
//   // List to render without removed product
//   let reCartItems = [];
//   //console.log(reCartItems);
//   // Get current list from local storage and push items not removed to new list
//   let reStartItems = getLocalStorage("so-cart");
//   reStartItems.forEach((product) => {
//     if (product.HtmlId != removeItem) {
//       reCartItems.push(product);
//     }
//   });
  //console.log(reCartItems);
  // reset local storage to the new list
//   setLocalStorage("so-cart", reCartItems);
//   // render HTML
//   //   getCartContents();
//   // !!!RESET PAGE SO YOU CAN DELETE ANOTHER ITEM!!!
//   document.location.reload(true);
// }

// function renderCartItem(item) {
//   const newItem = `<li class="cart-card divider">
//   <div data-id="${item.Id}">
//     <img class="card__delete" id="${item.Id}"
//     src="../images/delete_icon.svg"
//     alt="delete icon with a red x and the word remove"
//     />
//   </div>
//   <a href="#" class="cart-card__image">
//     <img
//       src="${item.Image}"
//       alt="${item.Name}"
//     />
//   </a>
//   <a href="#">
//     <h2 class="card__name">${item.Name}</h2>
//   </a>
//   <p class="cart-card__color">${item.Colors[0].ColorName}</p>
//   <p class="cart-card__quantity">qty: 1</p>
//   <p class="cart-card__price">$${item.FinalPrice}</p>
// </li>`;
//   // console.log(newItem);
//   return newItem;
// }

// function getCartTotal(cart) {
//   let total = 0.0;
//   cart.forEach((element) => {
//     total += element.FinalPrice;
//   });
//   return total.toFixed(2);
// }

// getCartContents();

// SET AN EVENT LISTER FOR EACH PRODUCT ITEM
