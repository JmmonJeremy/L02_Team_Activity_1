import { renderListWithTemplate } from "./utils.js";

export default class ProductList {
    constructor(dataSource, targetElement) {
        this.dataSource = dataSource;
        this.targetElement = targetElement;
    }

    async init() {
        const products = await this.dataSource.getData();
        this.render(products, "#product-card-template", this.prepareTemplate);
    }


    render(products, idTargetTemplate, templateBuilder) {
        const productCardTemplate = document.querySelector(idTargetTemplate);
        const listerElement = document.querySelector(this.targetElement);
        listerElement.innerHTML = "";

        products.forEach( product => {
            const listItem = templateBuilder(product, productCardTemplate);
            listerElement.appendChild(listItem);
        });
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