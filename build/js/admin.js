var d=(h,e,r)=>new Promise((s,t)=>{var i=a=>{try{n(r.next(a))}catch(l){t(l)}},o=a=>{try{n(r.throw(a))}catch(l){t(l)}},n=a=>a.done?s(a.value):Promise.resolve(a.value).then(i,o);n((r=r.apply(h,e)).next())});import{alertMessage as m,loadTemplate as c,removeAllAlerts as u}from"./utils.js";import g from"./externalServices.js";export default class p{constructor(e){this.main=e,this.token=null,this.request=new g}login(e,r){return d(this,null,function*(){try{this.token=yield this.request.loginRequest(e),r()}catch(s){let t=yield s.message;m(t.message,"myLogin")}})}showLogin(){this.main.innerHTML=y();let e=document.getElementById("login");e.addEventListener("click",()=>{u();let r=document.getElementById("myEmail").value,s=document.getElementById("myPassword").value;this.login({email:r,password:s},this.showOrders.bind(this))})}showOrders(){return d(this,null,function*(){try{let e=yield this.request.getOrders(this.token);this.main.innerHTML=`<h2 id="admin-title">Site Administration Page</h2>
      <div id="filler">
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
            </div>`,this.renderOrderList(e)}catch(e){let r=yield e.message;m(r.message,"myLogin")}})}renderOrderList(e){return d(this,null,function*(){const r=document.querySelector(".order-list"),s=yield c("../partials/order-template.html");//!!!*IN A forEach LOOP*!!! - clone the template for each order
e.forEach(t=>{try{if(t.items.length&&!isNaN(parseFloat(t.orderTotal))&&t.orderTotal>0){let i=s.content.cloneNode(!0),o=0,n="";//!!!*IN A forEach LOOP* x's 2!!! get info out of the items array
t.items&&t.items.forEach(l=>{o+=parseInt(l.quantity),n+=`<b>(qty: ${l.quantity})</b> ${l.name}<br>`});const a=i.querySelector(".order-id");a.textContent=t.id,i.querySelector(".order-date").innerHTML=new Date(t.orderDate).toDateString("en-US"),i.querySelector(".order-quantity").textContent=o,i.querySelector(".order-items").innerHTML=n,i.querySelector(".order-amount").innerHTML="$"+parseFloat(t.orderTotal).toFixed(2),r.appendChild(i)}}catch(i){m(i.message,"myLogin")}})})}}function y(){return`<h2 id="admin-title">Site Administration Page</h2>
  <div id="siteLogin">
  <fieldset>         
        <legend>Login</legend>
        <label class="top"
          >Email* 
          <input
            id="myEmail" 
            type="email" 
            name="email" 
            placeholder="someone@gmail.com"            
            title="The email must follow approved email formats."
            required
            /></label>
        <label class="top"
          >Password*
          <input
            id="myPassword"
            type="password"
            name="password"
            placeholder="password"                       
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
        </button>
        </fieldset>
        </div>`}
