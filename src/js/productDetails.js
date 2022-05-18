//used for the product-details.html page
import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.js";
import { displayCart } from "./cart-superscript.js";
import {
  loadHeaderFooter,
  loadTemplate,
  renderListWithTemplate,
} from "./utils.js";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    // console.log(this.product);
    //console.log(this.product.Count);
    this.renderProductDetails();

    // Put the path into the breadcrumbs
    document.querySelector(".product-breadcrumb")
      .innerHTML = `${this.product.Category.charAt(0).toUpperCase() + this.product.Category.slice(1)}`
      let hrefPath = `../product-listing?category=${this.product.Category}`;
    document.querySelector(".product-breadcrumb").href = hrefPath;
    // product-listing?category=hammocks

    // code to add items to the cart
    let addButt = document.getElementById("addToCart");
    addButt.addEventListener("click", () => {
      this.addToCart(this);
      // code to animate the cart when added to
      let getPicDiv = document.getElementsByClassName("cart")[0];
      getPicDiv.setAttribute("id", "resize__icon");
      function delayedEnding() {
        getPicDiv.setAttribute("id", "cart__icon");
      }
      setTimeout(delayedEnding, 4000);
      // code to make the add to cart button animated 
      addButt.className = "enlarge";
      function buttBack() {
        addButt.className = "resume";
      }
      setTimeout(buttBack, 250);
    });

    //code to add a comment
    const insertCommentElement = document.querySelector("#comment-section");
    const liveComment = document.createElement("div");
    liveComment.className = "comment-line"
    liveComment.innerHTML = 
    `<input>><p/> id=button-box><button type='button' id='postComment'>Post</button>
    <button type='button' id='deleteComment'>Delete</button></div>
    `;
    const commentBttn = document.getElementById("comment");
    commentBttn.addEventListener("click", () => {     
      insertCommentElement.appendChild(liveComment);
    })
  }

  addToCart() {
    // set a list equal to the local storage
    let checkoutItems = getLocalStorage("so-cart");
    // set checkoutItems equal to previousProducts
    if (checkoutItems == null) {
      checkoutItems = [];
    }
    // if cart is not empty do the following
    if (checkoutItems.length != 0) {
      //console.log("list length over 0: " + checkoutItems.length);
      // if product is in the cart already change boolean to true & add 1 to the count
      checkoutItems.forEach((item) => {
        if (item.Id == this.product.Id) {
          //change the products InCart boolean to true for both items
          item.InCart = true;
          this.product.InCart = true;
          //console.log("List item's InCart boolean = " + item.InCart);
          //console.log("There is a match for " + this.product.Id + ": " + this.product.InCart);
          //add one to the count of the product object in the list
          item.Count++;
        }
      });
    }
    //if the item is not in the cart
    //console.log("Is there a match for " + this.product.Id + ": " + this.product.InCart);
    if (!this.product.InCart) {
      //add 1 to the count of the product being added
      this.product.Count++;
      //add the item to the list of products
      checkoutItems.push(this.product);
    }
    //set the local storage equal to the new list
    setLocalStorage("so-cart", checkoutItems);
    //display the page with any changes
    displayCart();
    //display an alert to let the user know an item was added to the cart
    alertMessage("Item added to Cart! ", "added-item");
  }

  renderProductDetails() {
    let product_title = document.querySelector(".product-detail>h3");
    let product_name = document.querySelector(".product-detail>h2");
    let product_img = document.querySelector(".product-detail>img");
    let discount_flag = document.querySelector(".discount-flag");
    let discount_percent = document.querySelector(".flag-percent");
    let product_price = document.querySelector(".price-highlight");
    let product_original_price = document.querySelector(
      ".product-card__orginal-price"
    );
    let product_discount = document.querySelector(".product-card__discount");
    let product_color = document.querySelector(".color__pick");
    let product_description = document.querySelector(".product__description");

    product_title.innerHTML = this.product.Brand.Name;
    product_name.innerHTML = this.product.NameWithoutBrand;
    product_img.setAttribute("alt", this.product.NameWithoutBrand);
    product_img.setAttribute("src", this.product.Images.PrimaryLarge);
    discount_flag.alt = "discount flag star";
    discount_flag.src = "../images/discount.svg";
    discount_percent.innerHTML =
      100 -
      Math.ceil(
        (this.product.ListPrice / this.product.SuggestedRetailPrice) * 100
      );
    product_original_price.innerHTML += this.product.SuggestedRetailPrice.toFixed(
      2
    );
    product_discount.innerHTML +=
      (this.product.SuggestedRetailPrice - this.product.ListPrice).toFixed(2) +
      "!!!";
    product_price.innerHTML += this.product.ListPrice;

    // This will need to be dynamic later
    this.renderProductColors(this.product.Colors, product_color);
    product_description.innerHTML += this.product.DescriptionHtmlSimple;

    document
      .getElementById("addToCart")
      .setAttribute("data-id", this.product.Id);
  }

  async renderProductColors(list, listElement) {
    listElement.innerHTML = "";
    const colorTemplate = await loadTemplate(
      "../partials/product-color-item-template.html"
    );
    renderListWithTemplate(
      colorTemplate,
      listElement,
      list,
      this.prepareTemplate
    );
  }

  prepareTemplate(templateClone, color) {
    // console.log(color);
    const color_img = templateClone.querySelector("img");
    color_img.src = color.ColorChipImageSrc;
    color_img.alt = color.ColorName;

    color_img.onclick = () => {
      let product_img = document.querySelector(".product-detail>img");
      product_img.src = color.ColorPreviewImageSrc;
    };

    return templateClone;
  }

  addComment() {
    const insertionSpot = document.querySelector(".product-detail");
    console.log(insertionSpot);  
  }
}



loadHeaderFooter();
