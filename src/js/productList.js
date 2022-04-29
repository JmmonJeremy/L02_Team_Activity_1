import ProductData from "./productData";

export default class ProductList {
  constructor(category, listElement, dataSource) {
    this.category = category;
    this.listElement = listElement;
    // console.log(listElement)
    this.dataSource = {};
    // this.list = {};
  }
  async init() {
    this.dataSource = await new ProductData(this.category).getData();
    // const list = await this.dataSource.getData();
    // console.log(this.dataSource);
    await this.renderList(this.dataSource);
  }
  renderList(data) {
    const template = document.querySelector("#product-card-template");

    data.forEach((product) => {
      const clone = template.content.cloneNode(true);
      const hydratedTemplate = this.prepareTemplate(clone, product);
      this.listElement.appendChild(hydratedTemplate);
    });
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
}
