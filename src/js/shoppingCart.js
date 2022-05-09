//used for the cart page
import {
  getLocalStorage,
  renderListWithTemplate,
  setLocalStorage,
  loadTemplate,
} from "./utils";
import { displayCart } from "./cart-superscript.js";

export default class ShoppingCart {
  constructor(key, listElement) {
    this.key = key;
    this.listElement = listElement;
  }

  async init() {
    let list = await getLocalStorage(this.key);
    // Correct error for list equaling null when localStorage in empty
    if (list == null) {
      list = [];
    }
    //console.log(list);
    this.renderList(list);
    this.displayCartTotal(list);
  }

  prepareTemplate(template, product) {
    template.querySelector(".cart-card__image img").src =
      product.Images.PrimaryMedium;
    template.querySelector(".cart-card__image img").alt += product.Name;
    template.querySelector(".card__name").textContent = product.Name;
    template.querySelector(".cart-card__color").textContent =
      product.Colors[0].ColorName;
    template.querySelector(".cart-card__quantity").textContent += product.Count;
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
    //create a variable connected to all the products delete buttons
    const deleteButtons = document.querySelectorAll(".card__delete");
    //set or reset count to 0
    let count = 0;
    //for every button
    deleteButtons.forEach((dButton) => {
      //give the button a unique id starting with 0 in HTML
      //this id is equal to the order of the items in the list
      dButton.id = count;
      //increase count by one each time
      count++;
      //when button is clicked
      dButton.addEventListener("click", () => {
        //identify the id of the product that was clicked by the button id
        const itemId = parseInt(dButton.getAttribute("id"));
        //create a list that is equal to what is in localStorage
        let list = getLocalStorage(this.key);
        //decrease the Count in the object of the list identified
        list[itemId].Count--;
        console.log(list[itemId]);
        //if the Count is below 1, remove it from the list
        if (list[itemId].Count < 1) {
          list.splice(itemId, 1);
        }
        //reset the local storage to this list
        setLocalStorage(this.key, list);
        //rerender the page
        this.init();
        // update the superscript
        displayCart();
      });
    });
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
    let quantity = 0;
    let total = 0.0;
    cart.forEach((element) => {
      quantity = element.Count;
      total += element.FinalPrice * quantity;
    });
    return total.toFixed(2);
  }
}
