import ExternalServices from "./externalServices.js";
import ProductList from "./productList.js";
import { loadHeaderFooter, getParam } from "./utils.js";

const dataSource = new ExternalServices();
const listElement = document.querySelector(".product-list");
const category = getParam("category");
let dataList = new ProductList(category, dataSource, listElement);

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


const form = document.forms["search"];
const input = form["searchInput"];
input.addEventListener("change", () => form.reset(), false);

// const form = document.forms['search'];
form.addEventListener ("submit", search, false);

function search() {
  alert(" Form Submitted");
  // let filteredDataSource = dataSource.filter()
  // console.log(filteredDataSource)
  // dataList = new ProductList(category, filteredDataSource, listElement);
}