import { alertMessage, loadTemplate } from "./utils.js";
import ExternalServices from "./externalServices.js";

export default class Admin {
  constructor(outputInsertion) {
    //set to the main element of the page
    this.main = outputInsertion;
    //to hold the returned token for the request for the orders
    this.token = 0;
    //ExternalServices object to access its methods
    this.request = new ExternalServices();
  }

  async login(creds, process) {
    try {
      this.token = await this.request.loginRequest(creds);
      //   console.log(this.token);
      //run a callback function - of ShowOrders
      process();
    } catch (err) {
      let errMessage = await err.message;
      console.log(errMessage);
      alertMessage(errMessage.message, "myLogin");
    }
  }

  showLogin() {
    //create the form element & its name attribute
    let loginForm = document.createElement("form");
    loginForm.name = "siteLogin";
    //patterns for email and password if we need them later
    // email pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-]).{8,}"
    // password pattern="([A-Za-z0-9].{1,})@([A-Za-z0-9].{2,}).([a-z].{4})"
    //fill in the res of the form's HTML
    loginForm.innerHTML = `<fieldset>         
        <legend>Login</legend>
        <label class="top"
          >Email* 
          <input
            id="myEmail" 
            type="email" 
            name="email" 
            placeholder="someone@gmail.com"
            value="user@email.com"
            title="The email must follow approved email formats."
            required
            /></label>
        <label class="top"
          >Password*
          <input
            id="myPassword"
            type="text"
            name="password"
            placeholder="Bg147zxY"
            value="user1"            
            title="Password must contain at least 1 uppercase letter, 
            1 lowercase letter, 1 number, 1 special character 
            and be at least 8 characters long."
            required
          /></label>
        <button
          type="submit"       
          class="submitBtn"
          id="login"
        >
          Login
        </button>  `;
    //append the form to the page
    this.main.appendChild(loginForm);
    //grab the button for the form
    let loginBttn = document.getElementById("login");
    // console.log(loginBttn);
    //grab the value entered into the email box
    let email = document.getElementById("myEmail").value;
    // console.log(email);
    //grab the value entered into the password box
    let password = document.getElementById("myPassword").value;
    // console.log(password);
    //add a click event listener that runs the login method
    loginBttn.addEventListener(
      "click",
      this.login({ email, password }, this.showOrders.bind(this))
    );
  }

  async showOrders() {
    try {
      // console.log(this.token);
      //create a variable to hold the orders that are sent back
      let orders = await this.request.getOrders(this.token);
      // console.log(orders);
      //create the base HTML code that the template for the orders goes into
      this.main.innerHTML += `<div id="filler">
            <h2 id="order-title">Current Orders</h2>
            <div id="background">
            <table id="orders">
            <thead>
              <tr>
                <th>Id</th><th>Date</th><th>Quantity</th><th>Items</th><th>Amount</th>      
              </tr>
              <tr>
              <th></th><th></th><th></th><th></th><th></th>
              </tr>              
            </thead>            
            <tbody class="order-list"></tbody>
            </table>
            </div>
            </div>`;
      this.renderOrderList(orders);
    } catch (err) {
      let errMessage = await err.message;
      // console.log(errMessage);
      alertMessage(errMessage.message, "myLogin");
    }
  }

  async renderOrderList(list) {
    //create variable for where the order list apends to
    const orderList = document.querySelector(".order-list");
    // console.log(orderList);
    //grab the template for orders
    const orderTemplate = await loadTemplate("../partials/order-template.html");
    //!!!*IN A forEach LOOP*!!! - clone the template for each order
    list.forEach((order) => {
      // console.log(order);
      let clonedTemplateNode = orderTemplate.content.cloneNode(true);
      // console.log(clonedTemplateNode);
      //create variable to hold to total quantity and the products for an order
      //plus this resets them to zero or empty again
      let itemQuantity = 0;
      let productItems = "";
      //!!!*IN A forEach LOOP* x's 2!!! get info out of the items array
      if (order.items)
        order.items.forEach((item) => {
          itemQuantity += parseInt(item.quantity);
          productItems += `<b>(qty: ${item.quantity})</b> ${item.name}<br>`;
          console.log(itemQuantity);
          console.log(productItems);
        });
      //still - !!!*IN A forEach LOOP*!!! set values for each template clone
      //Order ID
      const orderId = clonedTemplateNode.querySelector(".order-id");
      orderId.textContent = order.id;
      //Order Date
      clonedTemplateNode.querySelector(".order-date").innerHTML = new Date(
        order.orderDate
      ).toDateString("en-US");
      //Order Quantity
      clonedTemplateNode.querySelector(
        ".order-quantity"
      ).textContent = itemQuantity;
      //Order Items
      clonedTemplateNode.querySelector(".order-items").innerHTML = productItems;
      //Order Amount
      clonedTemplateNode.querySelector(".order-amount").innerHTML =
        "$" + parseFloat(order.orderTotal).toFixed(2);
      console.log(clonedTemplateNode);
      //append template clone to the table on the page
      orderList.appendChild(clonedTemplateNode);
    });
  }
}
