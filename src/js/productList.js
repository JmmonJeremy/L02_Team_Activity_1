import ProductData from "./productData.js";
import { renderListWithTemplate } from "./utils.js";

export default class ProductList {
  constructor(category, listElement, dataSource) {
    this.category = category;
    this.listElement = listElement;
    this.dataSource = dataSource;
  }
  async init() {
    const list = await this.dataSource.getData();
    const filteredList = this.filterTents(list);
    // console.log(filteredList);
    this.renderList(filteredList);
  }
  renderList(data) {
    const template = document.querySelector("#product-card-template");
    renderListWithTemplate(
      template,
      this.listElement,
      data,
      this.prepareTemplate
    );
  }
  prepareTemplate(clone, product) {
    const link = clone.querySelector(".product-card>a");
    const image = clone.querySelector(".product-card>a>img");
    const brand = clone.querySelector(".card__brand");
    const name = clone.querySelector(".card__name");
    const price = clone.querySelector(".product-card__price");

    link.setAttribute("href", link.getAttribute("href") + product.Id);
    image.setAttribute("src", product.Image);
    image.setAttribute(
      "alt",
      image.getAttribute("alt") + product.NameWithoutBrand
    );
    brand.innerHTML = product.Brand.Name;
    name.innerHTML = product.NameWithoutBrand;
    price.innerHTML = price.innerHTML + product.FinalPrice;
    return clone;
  }
  filterTents(data) {
    let tentList = [];
    data.forEach((item) => {
      const img = new Image();
      img.src = item.Image;
      if (img.complete) {
        tentList.push(item);
      }
    });
    return tentList;
  }
}
