import ExternalServices from "./externalServices.js";
import ProductList from "./productList.js";
import { loadHeaderFooter, getParam } from "./utils.js";

const dataSource = new ExternalServices();
const listElement = document.querySelector(".product-list");
const category = getParam("category");
const dataList = new ProductList(category, dataSource, listElement);

dataList.init();

// Wait for slider to be clicked to change the arranged data
let slider = document.getElementById("sortByPrice");
slider.addEventListener("change", () => {
  if (slider.checked == true) {
    dataList.init(true);
  } else {
    dataList.init();
  }
});

// add the header and footer to main page
loadHeaderFooter();
