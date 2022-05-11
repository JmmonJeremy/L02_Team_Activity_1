import t from "./productData.js";
import o from "./productList.js";
import { loadHeaderFooter as r, getParam as e } from "./utils.js";
const a = new t(),
  c = document.querySelector(".product-list"),
  s = e("category"),
  i = new o(s, a, c);
i.init(), r();
