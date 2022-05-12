var c = (n, e, r) =>
  new Promise((i, l) => {
    var o = (t) => {
        try {
          a(r.next(t));
        } catch (s) {
          l(s);
        }
      },
      d = (t) => {
        try {
          a(r.throw(t));
        } catch (s) {
          l(s);
        }
      },
      a = (t) => (t.done ? i(t.value) : Promise.resolve(t.value).then(o, d));
    a((r = r.apply(n, e)).next());
  });
import {
  loadTemplate as h,
  renderListWithTemplate as m,
  filterList as u,
} from "./utils.js";
export default class y {
  constructor(e, r, i) {
    (this.category = e), (this.dataSource = r), (this.listElement = i);
  }
  init() {
    return c(this, null, function* () {
      const e = yield this.dataSource.getData(this.category);
      console.log(e);
      const r = u(e);
      this.renderList(e),
        (document.querySelector(".products>h2").innerHTML += `: ${(
          this.category.charAt(0).toUpperCase() + this.category.slice(1)
        ).replace("-b", " B")}`);
    });
  }
  renderList(e) {
    return c(this, null, function* () {
      this.listElement.innerHTML = "";
      const r = yield h("../partials/product-card-template.html");
      m(r, this.listElement, e, this.prepareTemplate);
    });
  }
  prepareTemplate(e, r) {
    return (
      (e.querySelector("a").href += r.Id),
      (e.querySelector("img").src = r.Images.PrimaryMedium),
      (e.querySelector("img").alt += r.Name),
      (e.querySelector(".card__brand").innerHTML = r.Brand.Name),
      (e.querySelector(".card__name").innerHTML = r.NameWithoutBrand),
      (e.querySelector(".product-card__price").innerHTML += r.ListPrice),
      e
    );
  }
}
