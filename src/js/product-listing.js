import ExternalServices from "./externalServices.js";
import ProductList from "./productList.js";
import { loadHeaderFooter, getParam } from "./utils.js";

const dataSource = new ExternalServices();
const listElement = document.querySelector(".product-list");
const category = getParam("category");
const dataList = new ProductList(category, dataSource, listElement);

// console.log(dataSource);




dataList.init();

// onclick="sortByPrice()"

let slider = document.getElementById("sortByPrice")
// console.log(slider)
slider.addEventListener("change", () => {
    console.log("hi")
    if (slider.checked == true){
        dataList.init(true)
        console.log("Its clicked")
    } else {
        dataList.init()
        console.log("It's unclicked")
    }
    
  });




// add the header and footer to main page
loadHeaderFooter();
