import { getLocalStorage, setLocalStorage, filterList } from "./utils";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    this.countList = [];
  }
  async init() {
    // Create a starting list for counting multiple purchases of the same item  
    let startList = await this.dataSource.getData();
    //console.log(startList);
    // redude list to only the tents we are selling
    this.countList = filterList(startList);
    //console.log(this.countList);   
    // Find the specific item that was clicked on
    this.product = await this.dataSource.findProductById(this.productId);
    // Show the product page and add item to the cart
    this.renderProductDetails();
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }
  addToCart() {
    // set list equal to the list of tents with a quantity of 0
    let checkoutItems = this.countList;
    //console.log(checkoutItems);
    // set a list equal to the local storage
    let previousProducts = getLocalStorage("so-cart");    
   // add any count to the quantity of the local storage list  
    if (previousProducts != null && previousProducts.length > 0){
      checkoutItems = previousProducts;
      //console.log(previousProducts);
      previousProducts.forEach(product => {        
          if (product.Count > 0) {
            checkoutItems.forEach(item => {
              if (product.Id == item.Id) {
                item.Count = product.Count;
              }
            })       
            }       
      }); 
    }  
    // Then add one to the quantity of the selected tent  
    checkoutItems.forEach(item => {
      if (item.Id == this.product.Id) {
        item.Count += 1;       
        }  
    }); 
    //console.log(checkoutItems);
    // Reset the local storage to the new quanty value   
    setLocalStorage("so-cart", checkoutItems);
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
