var n = (a, t, e) =>
  new Promise((o, i) => {
    var d = (r) => {
        try {
          c(e.next(r));
        } catch (s) {
          i(s);
        }
      },
      u = (r) => {
        try {
          c(e.throw(r));
        } catch (s) {
          i(s);
        }
      },
      c = (r) => (r.done ? o(r.value) : Promise.resolve(r.value).then(d, u));
    c((e = e.apply(a, t)).next());
  });
import { getLocalStorage as l, setLocalStorage as p } from "./utils.js";
import { displayCart as h } from "./cart-superscript.js";
import { loadHeaderFooter as m } from "./utils.js";
export default class g {
  constructor(t, e) {
    (this.productId = t), (this.product = {}), (this.dataSource = e);
  }
  init() {
    return n(this, null, function* () {
      (this.product = yield this.dataSource.findProductById(this.productId)),
        this.renderProductDetails();
      let t = document.getElementById("addToCart");
      t.addEventListener("click", () => {
        this.addToCart(this);
        let e = document.getElementsByClassName("cart")[0];
        e.setAttribute("id", "resize__icon");
        function o() {
          e.setAttribute("id", "cart__icon");
        }
        setTimeout(o, 4e3), (t.className = "enlarge");
        function i() {
          t.className = "resume";
        }
        setTimeout(i, 250);
      });
    });
  }
  addToCart() {
    let t = l("so-cart");
    t == null && (t = []),
      t.length != 0 &&
        t.forEach((e) => {
          e.Id == this.product.Id &&
            ((e.InCart = !0), (this.product.InCart = !0), e.Count++);
        }),
      this.product.InCart || (this.product.Count++, t.push(this.product)),
      p("so-cart", t),
      h();
  }
  renderProductDetails() {
    let t = document.querySelector(".product-detail>h3"),
      e = document.querySelector(".product-detail>h2"),
      o = document.querySelector(".product-detail>img"),
      i = document.querySelector(".price-highlight"),
      d = document.querySelector(".product-card__orginal-price"),
      u = document.querySelector(".product-card__discount"),
      c = document.querySelector(".product__color"),
      r = document.querySelector(".product__description");
    (t.innerHTML = this.product.Brand.Name),
      (e.innerHTML = this.product.NameWithoutBrand),
      o.setAttribute("alt", this.product.NameWithoutBrand),
      o.setAttribute("src", this.product.Images.PrimaryLarge),
      (d.innerHTML += this.product.SuggestedRetailPrice),
      (u.innerHTML +=
        (this.product.SuggestedRetailPrice - this.product.ListPrice).toFixed(
          2
        ) + "!!!"),
      (i.innerHTML += this.product.ListPrice),
      (c.innerHTML = this.product.Colors[0].ColorName),
      (r.innerHTML = this.product.DescriptionHtmlSimple),
      document
        .getElementById("addToCart")
        .setAttribute("data-id", this.product.Id);
  }
}
m();
