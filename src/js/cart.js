import { getLocalStorage, setLocalStorage } from "./utils";

function getCartContents() {
  // let markup = "";
  // pull in a list from the local storage
  let startItems = getLocalStorage("so-cart");
  //console.log(startItems);
  // put in an array if cart is empty to avoid error of null reading
  if (startItems == null) {
    startItems = [];    
  }
  // create a new list to hold only the items with a quantity above 0
  let cartItems = []
  startItems.forEach((item, index) => {    
    //console.log("index: " + index);
    //console.log(item.Count);
    if (item.Count > 0) {
      cartItems.push(item);              
    }
  })
  // Put the HTML together and display it
  displayHTML(cartItems); 
}
// delete items when clicked to remove
function resetCartContents() {
  let reCartItems = []
  console.log(reCartItems);  
  const deleteButtons = document.querySelectorAll(".card__delete");
  deleteButtons.forEach(dButton => {
    dButton.addEventListener("click", () =>{      
      console.log(dButton.getAttribute("id"));   
      let reStartItems = getLocalStorage("so-cart");
      reStartItems.forEach(item => {         
        if (item.Id == dButton.getAttribute("id")) {
          console.log(item.Id); 
          item.Count -= 1;
          console.log(item.Count);          
        }        
      })

      setLocalStorage("so-cart", reStartItems);
      //let reStartItems = getLocalStorage("so-cart"); 
      console.log(reStartItems);     
      
      reStartItems.forEach((item, index) => {    
        if (item.Count > 0) {
          reCartItems.push(item);              
        }        
      })
      console.log(reCartItems);
        });
       
      
      }); 
     // console.log(reCartItems);
     // if (typeof reCartItems !== "undefined") 
     // displayHTML(reCartItems);
   // let tent880RR = document.getElementById("880RR");
   // tent880RR.addEventListener("click", () =>{
    //  displayHTML(reCartItems)});
   // console.log(tent880RR);
   // let tent985RF = document.getElementById("985RF");
   // tent985RF.addEventListener("click", () =>{
    //  displayHTML(reCartItems)});
    //let tent985PR = document.getElementById("985PR");
   // let tent344YJ = document.getElementById("344YJ");

  
  deleteButtons.forEach(dButton => {
    dButton.addEventListener("click", () =>{ 
      console.log(reCartItems); 
      document.querySelector(".product-list").innerHTML = ""; 
      displayHTML(reCartItems); 
      const redoHtmlItems = reCartItems.map((item) => renderCartItem(item));
      console.log(redoHtmlItems);    
      document.querySelector(".product-list").innerHTML = redoHtmlItems.join("");
      
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
  <p class="cart-card__quantity">qty: ${item.Count}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
  //console.log(newItem);
  return newItem;
}

function displayHTML(list) {
  let htmlItems = list.map((item) => renderCartItem(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

getCartContents();
resetCartContents();


