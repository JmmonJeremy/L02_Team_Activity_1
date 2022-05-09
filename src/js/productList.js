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
    // dataSource will return a Promise...so we can use await to resolve it
    const list = await this.dataSource.getData(this.category);
    // console.log(list);
    // filter out unwanted items
    // render the list
    this.renderList(list);
    //set the title to the current category
    document.querySelector(".products>h2").innerHTML += `: ${(
      this.category.charAt(0).toUpperCase() + this.category.slice(1)
    ).replace("-b", " B")}`;
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
    templateClone.querySelector(".card__name").innerHTML =
      product.NameWithoutBrand;
    templateClone.querySelector(".product-card__price").innerHTML +=
      product.ListPrice;
    return templateClone;
  }

}
