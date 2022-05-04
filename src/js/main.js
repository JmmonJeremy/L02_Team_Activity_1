import ProductData from "./productData.js";
import ProductList from "./productList.js";
// import { getLocalStorage } from "./utils.js";
import { loadHeaderFooter } from "./utils.js";
// import { displayCart } from "./cart-superscript.js";

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const dataList = new ProductList("tents", dataSource, listElement);

//console.log(dataList);

dataList.init();

// add the header and footer to main page
loadHeaderFooter();
