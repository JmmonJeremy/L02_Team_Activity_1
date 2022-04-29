import ProductData from "./productData.js";
import ProductList from "./productList.js";

const productData = new ProductData("tents");
const productCards = document.querySelector(".product-list");

// Remove all of the current cards in the list.
while (productCards.firstChild) {
  productCards.removeChild(productCards.firstChild);
}

const productList = new ProductList("tents", productCards, productData);

productList.init();
// productList.renderList();
