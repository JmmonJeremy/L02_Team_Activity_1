import { renderListWithTemplate, filterList } from "./utils.js";

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
    const list = await this.dataSource.getData();
    // filter out unwanted items
    const filteredList = filterList(list);
    // render the list
    this.renderList(filteredList);
  }

  /*original renderList method before moving the template logic to utils.js
    renderList(list) {
        // get the template
        const template = document.getElementById("product-card-template");
        // clone it once for each product in our list
        list.forEach(item => {
            const node = template.content.cloneNode(true);
            const filledTemplate = this.prepareTemplate(node, item)
        // add it to the DOM
        this.listElement.appendChild(filledTemplate);
        //});   
    }*/
  renderList(list) {
    // clear what is there if there is something
    this.listElement.innerHTML = "";
    // get the template
    const cardTemplate = document.getElementById("product-card-template");
    // create a filled in template
    renderListWithTemplate(
      cardTemplate,
      this.listElement,
      list,
      this.prepareTemplate
    );
  }

  prepareTemplate(templateClone, product) {
    templateClone.querySelector("a").href += product.Id;
    templateClone.querySelector("img").src = product.Image;
    templateClone.querySelector("img").alt += product.Name;
    templateClone.querySelector(".card__brand").innerHTML = product.Brand.Name;
    templateClone.querySelector(".card__name").innerHTML =
      product.NameWithoutBrand;
    templateClone.querySelector(".product-card__price").innerHTML =
      product.ListPrice;
    return templateClone;
  }

  /*filterList(list) {
    const filteredList = [];
    list.forEach((tent) => {
      if (tent.Id != "989CG" && tent.Id != "880RT") {
        filteredList.push(tent);
      }
    });
    return filteredList;
  }*/
}
