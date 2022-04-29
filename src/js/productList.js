import ProductData from "./productData";

export default class ProductList {
    constructor(category, htmlElement){
        this.category = category;
        this.htmlElement = htmlElement;
        this.dataSource = {};
        // this.list = {};
    }
    async init(){
        this.dataSource = await new ProductData(this.category).getData();
        console.log(this.dataSource);
    }
    populateCards(){}
    displayCards(){}
}