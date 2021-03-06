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
    this.postedComments = document.getElementById("posted-comments");
    this.commentsList = [];
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    //console.log(this.product);
    //console.log(this.product.Count);

    this.renderProductDetails();

    // Put the path into the breadcrumbs
    document.querySelector(".product-breadcrumb").innerHTML = `${
      this.product.Category.charAt(0).toUpperCase() +
      this.product.Category.slice(1)
    }`;
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

    //run the code for placing comments
    this.addProductComment();
  }

  addProductComment() {
    //code to add a comment
    //get the element for the permanently added comments
    const addComment = document.querySelector("#comment-section");
    //get the element for the place to type in a comment & create entry space
    const liveComment = document.createElement("div");
    liveComment.id = "comment-bttn-box";
    liveComment.innerHTML = `&nbsp;<span id="red-x"
     >X</span><b id="comment-label">&nbsp; Add Comment: </b>&nbsp;
     <p class="comment-line" contenteditable="true"></p>
     <button type='button' id='postComment'>Post</button>
     <button type='button' id='deleteComment'>Clear</button>
     `;
    //set a temporary value for thes variables
    let deleteBttn = "No button yet";
    let clearBttn = "No button yet";
    let postBttn = "No button yet";
    let commentLine = "No comment line yet";
    //add the comment entry space when the button is clicked
    const commentBttn = document.getElementById("comment");
    commentBttn.addEventListener("click", () => {
      addComment.appendChild(liveComment);
      //scroll to the bottom where the entry space is after clicking the button
      window.scrollTo(0, document.body.scrollHeight);
      //if there are no comments, do not show the added orange line
      if (this.postedComments.childElementCount == 0) {
        this.postedComments.className = "noLine";
      }
      //grab the delet button element
      deleteBttn = document.getElementById("red-x");
      //delete the entry space if they click the red x in a box
      deleteBttn.addEventListener("click", () => {
        liveComment.remove();
      });
      //grab the comment line element
      commentLine = document.querySelector(".comment-line");
      //grab the clear button element
      clearBttn = document.getElementById("deleteComment");
      //clear the entry if the clear button is clicked
      clearBttn.addEventListener("click", () => {
        commentLine.innerHTML = "";
      });
      //grab the element for the post button
      postBttn = document.getElementById("postComment");
      //post the comment permenantly (to local storage) if the click the post button
      postBttn.addEventListener("click", () => {
        //do not post empty comments
        if (commentLine.innerText !== "") {
          //set variable equal to the text of the post
          let post = commentLine.innerText;
          //set a variable equal to the comment number
          let commentNumber =
            "<B>&nbsp; Comment #" +
            (parseInt(this.postedComments.childElementCount) + 1) +
            ": </b>";
          //combine the comment number with the comment
          let finisedPost = commentNumber.concat(post);
          //add to the comment list on the page
          this.postedComments.innerHTML += `<p>${finisedPost}</p>`;
          //empty the input field for comments
          commentLine.innerHTML = "";
          //remove the comment entry field
          liveComment.remove();
          //add a line over the comments
          this.postedComments.className = "topLine";
          //grab the the products name from the element on the page
          const commentedProduct = document.querySelector("h2.divider")
            .innerHTML;
          //set a variable equal to the local storage
          let storageTest = getLocalStorage(
            "comments for: " + commentedProduct
          );
          //if the local storage is a list then set this.commentsList equal to it
          if (Array.isArray(storageTest)) {
            this.commentsList = storageTest;
          }
          //push the comment into a partially full or empty list
          this.commentsList.push(finisedPost);
          //set the loca storage equal to the new list of comments
          setLocalStorage(
            "comments for: " + commentedProduct,
            this.commentsList
          );
        }
      });
    });
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
      // if product is in the cart already change boolean to true & add 1 to the count
      checkoutItems.forEach((item) => {
        if (item.Id == this.product.Id) {
          //change the products InCart boolean to true for both items
          item.InCart = true;
          this.product.InCart = true;
          //add one to the count of the product object in the list
          item.Count++;
        }
      });
    }
    //if the item is not in the cart
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
    this.renderProductImages(this.product.Images);
    product_description.innerHTML += this.product.DescriptionHtmlSimple;

    document
      .getElementById("addToCart")
      .setAttribute("data-id", this.product.Id);

    const commentedProduct = document.querySelector("h2.divider").innerHTML;
    let storageTest = getLocalStorage("comments for: " + commentedProduct);
    if (Array.isArray(storageTest)) {
      this.commentsList = storageTest;
      this.postedComments.className = "topLine";
    }
    this.commentsList.forEach((comment) => {
      this.postedComments.innerHTML += `<p>${comment}</p>`;
    });
  }

  async renderProductImages(images) {
    let imgElement = document.querySelector("img#product-img");
    let imgCarrousel = document.querySelector(".carousel__viewport");

    if (images.ExtraImages == null) {
      imgCarrousel.parentNode.style.display = "none";
      imgElement.setAttribute("alt", this.product.NameWithoutBrand);
      imgElement.setAttribute("src", this.product.Images.PrimaryLarge);
      return;
    }

    imgElement.style.display = "none";

    const carrouselTemplate = await loadTemplate(
      "../partials/product-img-carrousel-template.html"
    );

    const firstImage = {
      Title: images.NameWithoutBrand,
      Src: images.PrimaryLarge,
    };
    let listExtra = [firstImage].concat(images.ExtraImages);
    renderListWithTemplate(
      carrouselTemplate,
      imgCarrousel,
      listExtra,
      this.prepareImages
    );
  }

  prepareImages(templateClone, image) {
    // console.log(color);
    const product_img = templateClone.querySelector("img");
    const aPrev = templateClone.querySelector("a.carousel__prev");
    // console.log(aPrev);
    const aNext = templateClone.querySelector("a.carousel__next");
    const liList = document.querySelectorAll(".carousel__viewport li");
    const liCounter = liList.length + 1;

    const domElement = templateClone.querySelector("#carousel__slide_0");

    domElement.setAttribute("id", `carousel__slide${liCounter}`);
    aPrev.href = `#carousel__slide${liCounter - 1}`;
    aNext.href = "#carousel__slide1";

    product_img.src = image.Src;
    product_img.alt = image.Title;

    if (1 == liCounter) return templateClone;

    liList[0].querySelector(
      ".carousel__slide a.carousel__prev"
    ).href = `#carousel__slide${liCounter}`;
    liList[liCounter - 2].querySelector(
      ".carousel__slide a.carousel__next"
    ).href = `#carousel__slide${liCounter}`;

    return templateClone;
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
    const color_img = templateClone.querySelector("img");
    color_img.src = color.ColorChipImageSrc;
    color_img.alt = color.ColorName;

    color_img.onclick = () => {
      let product_img = document.querySelector("img#product-img");
      product_img.src = color.ColorPreviewImageSrc;
    };

    return templateClone;
  }

  addComment() {
    const insertionSpot = document.querySelector(".product-detail");
  }
}

loadHeaderFooter();
