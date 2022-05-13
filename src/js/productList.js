//Used for product-listing pages
import { loadTemplate, renderListWithTemplate, filterList } from "./utils.js";

export default class ProductList {
  constructor(category, dataSource, listElement) {
    // passing in this infor makes the class as reusable as possible
    // being able to define these things when we use the class will make it very flexible
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    //dataSource will return a Promise...so we can use await to resolve it
    const list = await this.dataSource.getData(this.category);
    console.log(list);
    //filter out unwanted items
    const filteredList = filterList(list);    
    //set the title to the current category
    document.querySelector(".products>h2").innerHTML += `: ${(
      this.category.charAt(0).toUpperCase() + this.category.slice(1)
    ).replace("-b", " B")}`;
    //render the list
    this.renderList(list)
    //run the quick display modal with detail button 
    .then (html => this.runModal())
  }

  async renderList(list) {
    this.listElement.innerHTML = "";
    const cardTemplate = await loadTemplate(
      "../partials/product-card-template.html"
    );
    renderListWithTemplate(
      cardTemplate,
      this.listElement,
      list,
      this.prepareTemplate
    );
  }

  prepareTemplate(templateClone, product) {
    templateClone.querySelector("a").href += product.Id;
    templateClone.querySelector("img").src = product.Images.PrimaryMedium;
    templateClone.querySelector("img").alt += product.Name;
    templateClone.querySelector(".card__brand").innerHTML = product.Brand.Name;
    templateClone.querySelector(".card__name").innerHTML = product.NameWithoutBrand;
    templateClone.querySelector(".product-card__price").innerHTML += product.ListPrice;
    //code for the modal pop-up of product details from detail button
    templateClone.querySelector(".product-detail>h3").innerHTML = product.Brand.Name;
    templateClone.querySelector(".product-detail>h2").innerHTML = product.NameWithoutBrand;
    templateClone.querySelector(".product-detail>img").alt = product.NameWithoutBrand;
    templateClone.querySelector(".product-detail>img").src = product.Images.PrimaryLarge;
    templateClone.querySelector(".discount-flag").alt = "discount flag star";
    templateClone.querySelector(".discount-flag").src = "../images/discount.svg";
    templateClone.querySelector(".flag-percent").innerHTML = 100 - Math.ceil(((product.ListPrice / product.SuggestedRetailPrice)) * 100);
    templateClone.querySelector(".product-card__orginal-price").innerHTML += product.SuggestedRetailPrice.toFixed(2);
    templateClone.querySelector(".product-card__discount").innerHTML += (product.SuggestedRetailPrice - product.ListPrice).toFixed(2) + "!!!";
    templateClone.querySelector(".price-highlight").innerHTML += product.FinalPrice;
    templateClone.querySelector(".product__color").innerHTML += product.Colors[0].ColorName;
    templateClone.querySelector(".product__description").innerHTML += product.DescriptionHtmlSimple;
    return templateClone;
  }

  runModal() {
    //create variable for the div holding the modal HTML content
    let modal;
    //creat a variblae to hold the list of all modals on the page
    let modals = document.querySelectorAll(".modal") 
    //set counter to label the data-id for matching the div to the button  
    let modalCnt = 0;
    //cycle through each div & set the data-id so it can be used for matching
    modals.forEach(div => {
      div.setAttribute("data-id", "match" + modalCnt)
      //advand the count for unique labeling
      modalCnt++     
    })  
    //create a list of all the detail buttons on the page
    let btns = document.querySelectorAll(".details-btn")   
    // // When the user clicks on the button, open the modal
    //set counter to label the id & data-id for matching the div to the button
    let btnCnt = 0
    //cycle through each button & set the id & data-id so it can be matched up
    btns.forEach(btn => { 
      //set a unique id for each button   
      btn.id = "details-btn" + btnCnt;
      //set a data-id matching the data-id of the modal div
      btn.setAttribute("data-id", "match" + btnCnt);
      //set a variable for the button that was pushed    
      let clickedBtn = document.getElementById("details-btn" + btnCnt)
      //open the modal div when the user clicks on the button
      clickedBtn.onclick = function() {         
      modals.forEach(card => {
        //match the clicked button to the modal that goes with it
        if (card.getAttribute("data-id") == clickedBtn.getAttribute("data-id")) {
          //store the modal div that matches the button in a variable
          modal = card;
        }       
      })
      //display the div modal that matches the clicked button     
      modal.style.display = "block";     
      }
      //advance the count for unique labeling           
      btnCnt++
    })
    //create a list of all the spans around the "X" used to close the page
    let spans = document.querySelectorAll(".close");

    //cycle through all the <span> (x)'s on the page  
    spans.forEach(span => {     
        //close the modal when the user clicks on <span> (x)
        span.onclick = function() {  
        modal.style.display = "none";
        }     
    })
    //close the modal when the user clicks anywhere outside of the modal   
    window.onclick = function(event) {    
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }    
  }
}


