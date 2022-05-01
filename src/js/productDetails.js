import { getLocalStorage, setLocalStorage } from "./utils";
import { displayCart } from "./cart-superscript.js";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
      // code to add items to the cart
      let addButt = document.getElementById("addToCart");
      addButt.addEventListener("click", () => {
      this.addToCart(this);     
      // code to animate the cart when added to
      let getPicDiv = document.getElementsByClassName("cart")[0]
      getPicDiv.setAttribute("id", "resize__icon")
      function delayedEnding () { 
        getPicDiv.setAttribute("id", "cart__icon")
      } 
      setTimeout(delayedEnding, 4000); 
      // code to make the add to cart button animated     
      addButt.className = "enlarge";
      function buttBack () { 
        addButt.className = "resume";
      } 
       setTimeout(buttBack, 250);
    });
     
      //getPic.classList.toggle("respond");      
      //let delayedEnding = getPic.classList.toggle("respond");
      //setTimeout(delayedEnding, 5000);
  }
  addToCart() {
    let checkout_items = [];
    let previous_products = getLocalStorage("so-cart");
    if (Array.isArray(previous_products)) {
      checkout_items = previous_products;
    } else if (previous_products != null) {
      checkout_items.push(previous_products);
    }
    checkout_items.push(this.product);
    setLocalStorage("so-cart", checkout_items);
    displayCart();
  }
  renderProductDetails() {
    let product_title = document.querySelector(".product-detail>h3");
    let product_name = document.querySelector(".product-detail>h2");
    let product_img = document.querySelector(".product-detail>img");
    let product_price = document.querySelector(".product-card__price");
    let product_color = document.querySelector(".product__color");
    let product_description = document.querySelector(".product__description");

    product_title.innerHTML = this.product.Brand.Name;
    product_name.innerHTML = this.product.NameWithoutBrand;
    product_img.setAttribute("alt", this.product.NameWithoutBrand);
    product_img.setAttribute("src", this.product.Image);
    product_price.innerHTML = this.product.ListPrice;

    // This will need to be dynamic later
    product_color.innerHTML = this.product.Colors[0].ColorName;
    product_description.innerHTML = this.product.DescriptionHtmlSimple;

    document
      .getElementById("addToCart")
      .setAttribute("data-id", this.product.Id);
  }
}
