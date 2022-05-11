// used for checkout/index.html
import { getLocalStorage } from "./utils.js";

export default class CheckoutProcess {
    constructor() {
        this.itemsCount = 0;
        this.itemsCost = 0;
        this.cartItems = [];
        this.shipping = 0;
        this.tax = 0;
        this.grandTotal = 0;
    }
   
    itemsSubtotal() {      
        this.cartItems = getLocalStorage("so-cart");
        this.cartItems.forEach(item => {
            this.itemsCount += item.Count;
            this.itemsCost += item.FinalPrice * item.Count;
        });
        document.getElementById("subtotal").innerText = this.itemsCount;
        document.getElementById("itemsBalance").innerHTML = this.itemsCost.toFixed(2);
    }
    
    additionsTotal() {       
        this.shipping = 10 + (this.itemsCount * 2);
        this.tax =  this.itemsCost * .06;
        this.grandTotal = this.itemsCost + this.shipping + this.tax;      
        document.getElementById("shippingBalance").innerText = "$" + this.shipping.toFixed(2);
        document.getElementById("taxBalance").textContent = "$" + this.tax.toFixed(2);
        document.getElementById("totalBalance").innerHTML = "$" + this.grandTotal.toFixed(2);
    }

}