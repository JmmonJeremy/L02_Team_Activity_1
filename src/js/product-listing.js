import ExternalServices from "./externalServices.js";
import ProductList from "./productList.js";
import {
  loadHeaderFooter,
  getParam
} from "./utils.js";

const dataSource = new ExternalServices();
const listElement = document.querySelector(".product-list");
const category = getParam("category");
let dataList = new ProductList(category, dataSource, listElement);

dataList.init();



// Wait for slider to be clicked to change the arranged data
let slider = document.getElementById("sortByPrice");
slider.addEventListener("change", () => {
  const search = document.querySelector("#searchBar")
  search.value = ""
  if (slider.checked == true) {
    dataList.init(true);
  } else {
    dataList.init();
  }
});

function searchBar() {
  const search = document.querySelector("#searchBar")
  search.placeholder = `Search for ${category}`;
  search.addEventListener("search", () => {
    let results = document.querySelector(".product-list")

    let userSearch = search.value.toLowerCase();
    let li = results.getElementsByTagName("li")
    for (let i = 0; i < li.length; i++) {
      if (li[i].classList.contains("hide")) {
        li[i].classList.remove("hide");
      }
      let productName = li[i].getElementsByTagName("h2")[0].textContent.toLocaleLowerCase()
      let brandName = li[i].getElementsByTagName("h3")[0].textContent.toLocaleLowerCase()

      if (!productName.includes(userSearch) &&
        !brandName.includes(userSearch)
      ) {
        li[i].classList.add("hide")
      }
    }
  });
}


// add the header and footer to main page
loadHeaderFooter();
// Add the search bar event listener
searchBar();
