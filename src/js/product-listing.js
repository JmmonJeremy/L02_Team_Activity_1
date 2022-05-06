import ProductData from "./productData.js";
import ProductList from "./productList.js";
// import { getLocalStorage } from "./utils.js";
import { loadHeaderFooter, getParam } from "./utils.js";
// import { displayCart } from "./cart-superscript.js";
const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");
const category = getParam("category");
const dataList = new ProductList(category, dataSource, listElement);

document.querySelector(".products>h2").innerHTML += `: ${(
  category.charAt(0).toUpperCase() + category.slice(1)
).replace("-b", " B")}`;

// myList.init();

dataList.init();

// add the header and footer to main page
loadHeaderFooter();
