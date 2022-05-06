import ProductData from "./productData.js";
import ProductDetails from "./productDetails.js";
import { getParam } from "./utils.js";

const dataSource = new ProductData();
// const category = getParam("category");
const productId = getParam("product");
const product = new ProductDetails(productId, dataSource);
product.init();
