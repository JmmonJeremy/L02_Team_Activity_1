import ProductData from "./productData.js";
import {getParam} from "./utils.js";

const dataSource = new ProductData("tents");

const productId = getParam("product");

console.log(dataSource.findProductById(productId));
                

// let products = [];
let checkout_items = [];
// function convertToJson(res) {
//   if (res.ok) {
//     return res.json();
//   } else {
//     throw new Error("Bad Response");
//   }
// }

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// get tents data
// function getProductsData() {
//   fetch("../json/tents.json")
//     .then(convertToJson)
//     .then((data) => {
//       products = data;
//     });
// }
// or should we do it this way?
// async function getProductsDataAwait() {
//   products = await fetch("../json/tents.json").then(convertToJson);
// }

// add to cart button event handler
function addToCart(e) {
  let previous_products = getLocalStorage("so-cart");
  if (Array.isArray(previous_products)) {
    checkout_items = previous_products;
  } else if (previous_products != null) {
    checkout_items.push(previous_products);
  }
  //console.log(previous_products)
  //console.log(e.target.dataset.id)
  


  // const products = new ProductData("tents");
  // const product = products.findProductById(e);


  // console.log(products.getData1())
  // console.log(products.getData());

  // // product = products.find((item) => item.Id === e.target.dataset.id);
  // checkout_items.push(product);
  // //console.log(previous_products);
  setLocalStorage("so-cart", checkout_items);
}

// getProductsData();
// add listener to Add to Cart button
document.getElementById("addToCart").addEventListener("click", addToCart);
