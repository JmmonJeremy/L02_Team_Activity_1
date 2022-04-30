import ProductData from "./productData"
import ProductList from "./productList"

const categoryName = "tents";
const listElementId = '.product-list'
const dataSource = new ProductData(categoryName);
const productWrapper = new ProductList(dataSource, listElementId);

productWrapper.init();
