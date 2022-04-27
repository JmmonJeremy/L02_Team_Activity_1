import { getLocalStorage,setLocalStorage } from "./utils";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        console.log(this.product)
        this.renderProductDetails();
        await document.getElementById("addToCart").addEventListener("click", this.addToCart.bind(this));
    }
    addToCart(id) {
        let checkout_items = [];
        let previous_products = getLocalStorage("so-cart");
        if (Array.isArray(previous_products)) {
          checkout_items = previous_products;
        } else if (previous_products != null) {
          checkout_items.push(previous_products);
        }
        checkout_items.push(this.product);
        setLocalStorage("so-cart", checkout_items);
    }
    renderProductDetails() {
        let product_details = document.querySelector(".product-detail");
        let product_title = document.querySelector(".product-detail>h3");
        let product_name = document.querySelector(".product-detail>h2");
        let product_img = document.querySelector(".product-detail>img");
        let product_price = document.querySelector(".product-card__price");
        let product_color = document.querySelector(".product__color");
        let product_description = document.querySelector(".product__description");

        product_title.innerHTML = this.product.Brand.Name;
        product_name.innerHTML = this.product.NameWithoutBrand;
        product_img.setAttribute("alt", this.product.NameWithoutBrand);
        product_img.setAttribute("src", this.product.Image)
        product_price.innerHTML = this.product.ListPrice;

        // This will need to be dynamic later
        product_color.innerHTML = this.product.Colors[0].ColorName;
        product_description.innerHTML = this.product.DescriptionHtmlSimple;

        document.getElementById("addToCart").setAttribute("data-id", this.product.Id);
    }
}




// async init() {
//     // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
//     // once we have the product details we can render out the HTML
//     // once the HTML is rendered we can add a listener to Add to Cart button
//     // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
//     document.getElementById('addToCart')
//             .addEventListener('click', this.addToCart.bind(this));
//   }