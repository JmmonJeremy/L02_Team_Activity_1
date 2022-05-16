// used for checkout/index.html
import {
  getLocalStorage,
  setLocalStorage,
  alertMessage,
  removeAllAlerts,
} from "./utils.js";
import ExternalServices from "./externalServices.js";

const services = new ExternalServices();
// takes a form element and returns an object where the key is the "name" of the form input.
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
  // convert the list of products from localStorage to the simpler form required for the checkout process.
  //Array.map would be perfect for this.
  const formProductInfo = items.map((item) => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: item.Count,
  }));
  return formProductInfo;
}

export default class CheckoutProcess {
  // Currently not using this.cart or this.formElement, but included id needed later
  constructor(cart, formElement) {
    this.cart = cart;
    this.formElement = formElement;
    this.itemsCount = 0;
    this.itemsCost = 0;
    this.cartItems = [];
    this.shipping = 0;
    this.tax = 0;
    this.grandTotal = 0;
  }

  init() {
    this.cartItems = getLocalStorage("so-cart");
    this.itemsSubtotal();
  }

  itemsSubtotal() {
    this.cartItems.forEach((item) => {
      this.itemsCount += item.Count;
      //console.log(this.itemsCount);
      this.itemsCost += item.FinalPrice * item.Count;
    });
    document.getElementById("subtotal").innerText = this.itemsCount;
    document.getElementById("itemsBalance").innerHTML = this.itemsCost.toFixed(
      2
    );
  }

  additionsTotal() {
    this.shipping = 10 + this.itemsCount * 2;
    this.tax = this.itemsCost * 0.06;
    this.grandTotal = this.itemsCost + this.shipping + this.tax;
    document.getElementById("shippingBalance").innerText =
      "$" + this.shipping.toFixed(2);
    document.getElementById("taxBalance").textContent =
      "$" + this.tax.toFixed(2);
    document.getElementById("totalBalance").innerHTML =
      "$" + this.grandTotal.toFixed(2);
  }

  async checkout() {
    // const orderRequest = document.getElementById("orderForm")
    const orderRequest = document.forms["checkout"];
    const jsonObject = formDataToJSON(orderRequest);
    // add other data from the form to the jsonObject
    jsonObject.orderDate = new Date();
    jsonObject.orderTotal = this.grandTotal;
    jsonObject.shipping = this.shipping;
    jsonObject.tax = this.tax;
    jsonObject.items = packageItems(this.cartItems);
    // console.log(jsonObject);
    // call the checkout method in our ExternalServices module and send it our data object.
    try {
      const res = await services.checkout(jsonObject);
      // console.log(res);
      setLocalStorage("so-cart", []);
      window.location.href = "checkedout.html";
    } catch (err) {
      // get rid of any preexisting alerts.
      removeAllAlerts();
      //wait for promise to be fulfilled
      let errMessage = await err.message;
      for (let message in errMessage) {
        alertMessage(errMessage[message], "main-header");
      }
      // console.log(err);

    }
  }
}
