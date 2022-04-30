import { renderListWithTemplate } from "./utils.js";

export default class ProductList {
    constructor(dataSource, targetElement) {
        this.dataSource = dataSource;
        this.targetElement = targetElement;
    }

    async init() {
        const products = await this.dataSource.getData();
        const filteredProducts = this.filterProducts(products);
        this.render(filteredProducts, "#product-card-template", this.prepareTemplate);
    }

    filterProducts(products) {
        return products.filter((product) => {
            return product.FinalPrice != '179.99';
        });
    }

    render(products, idTargetTemplate, templateBuilder) {
        const productCardTemplate = document.querySelector(idTargetTemplate);
        const parentElement = document.querySelector(this.targetElement);
        parentElement.innerHTML = "";

        renderListWithTemplate(productCardTemplate, parentElement, products, templateBuilder);
    }

    prepareTemplate(product, productCardTemplate) {
        const preparedElement = productCardTemplate.content.cloneNode(true);

        preparedElement.querySelector('a').href +=  product.Id;
        preparedElement.querySelector('img').src = product.Image;
        preparedElement.querySelector('img').alt += product.Name;
        preparedElement.querySelector('.card__brand').textContent = product.Brand.Name;
        preparedElement.querySelector('.card__name').textContent = product.NameWithoutBrand;
        preparedElement.querySelector('.product-card__price').textContent += product.FinalPrice; 

        return preparedElement;
    }
}   