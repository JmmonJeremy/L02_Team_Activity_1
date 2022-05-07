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
    const list = getLocalStorage(this.key);
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
    let count = 0;
    deleteButtons.forEach((dButton) => {
      dButton.id = count;
      count++;
      dButton.addEventListener("click", () => {
        // identify the id of the product that was clicked
        const itemId = parseInt(dButton.getAttribute("id"));
        let list = getLocalStorage(this.key);
        list.splice(itemId, 1);
        setLocalStorage(this.key, list);
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
    this.addQuantityBtn()
  }

  getCartTotal(cart) {
    let total = 0.0;
    cart.forEach((element) => {
      total += element.FinalPrice;
    });
    return total.toFixed(2);
  }


  // These functions will add functionality to the page that will allow 
  // the cart items to be increased and decreased by clicking. If the 
  // cart doesn't have any items of that type in it, then it should 
  // stay on the page until it is refreshed.
  addQuantityBtn(){
    let total = document.querySelector(".total-items")
    console.log(total)
    let deductBtnList = document.getElementsByClassName("minus1");
    let addBtnList = document.getElementsByClassName("add1");

    for (let deductBtn of deductBtnList) {
      deductBtn.onclick = () => {
        let currentInputBox = deductBtn.nextElementSibling;
        currentInputBox.value = parseInt(currentInputBox.value - 1);
        // also remove from the local storage
      }
    }

    for (let addBtn of addBtnList) {
      addBtn.onclick = () => {
        let currentInputBox = addBtn.previousElementSibling;
        currentInputBox.value = parseInt(currentInputBox.value + 1)
        // add another item to local storage
      }
    }
  }

}
