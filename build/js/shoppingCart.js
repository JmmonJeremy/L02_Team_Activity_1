var d = (n, e, t) =>
  new Promise((r, i) => {
    var l = (a) => {
        try {
          s(t.next(a));
        } catch (c) {
          i(c);
        }
      },
      o = (a) => {
        try {
          s(t.throw(a));
        } catch (c) {
          i(c);
        }
      },
      s = (a) => (a.done ? r(a.value) : Promise.resolve(a.value).then(l, o));
    s((t = t.apply(n, e)).next());
  });
import {
  getLocalStorage as u,
  renderListWithTemplate as C,
  setLocalStorage as y,
  loadTemplate as g,
} from "./utils.js";
import { displayCart as h } from "./cart-superscript.js";
export default class f {
  constructor(e, t) {
    (this.key = e), (this.listElement = t);
  }
  init() {
    return d(this, null, function* () {
      let e = yield u(this.key);
      e == null && (e = []), this.renderList(e), this.displayCartTotal(e);
    });
  }
  prepareTemplate(e, t) {
    return (
      (e.querySelector(".cart-card__image img").src = t.Images.PrimaryMedium),
      (e.querySelector(".cart-card__image img").alt += t.Name),
      (e.querySelector(".card__name").textContent = t.Name),
      (e.querySelector(".cart-card__color").textContent =
        t.Colors[0].ColorName),
      (e.querySelector(".cart-card__quantity").textContent += t.Count),
      (e.querySelector(".cart-card__price").textContent += t.FinalPrice),
      e
    );
  }
  renderList(e) {
    return d(this, null, function* () {
      this.listElement.innerHTML = "";
      const t = yield g("../partials/cart-card-template.html");
      C(t, this.listElement, e, this.prepareTemplate),
        this.deleteButton(),
        this.addQuantityBtn();
    });
  }
  deleteButton() {
    const e = document.querySelectorAll(".card__delete");
    let t = 0;
    e.forEach((r) => {
      (r.id = t),
        t++,
        r.addEventListener("click", () => {
          const i = parseInt(r.getAttribute("id"));
          let l = u(this.key);
          l[i].Count--,
            console.log(l[i]),
            l[i].Count < 1 && l.splice(i, 1),
            l.splice(i, 1),
            y(this.key, l),
            this.init(),
            h();
        });
    });
  }
  displayCartTotal(e) {
    let t = document.querySelector(".cart-footer");
    e.length > 0
      ? (t.classList.remove("hide"),
        (t.firstChild.innerHTML = "Total:"),
        (t.firstChild.innerHTML = `${
          t.firstChild.innerHTML
        } $${this.getCartTotal(e)}`))
      : t.classList.add("hide");
  }
  getCartTotal(e) {
    let t = 0,
      r = 0;
    return (
      e.forEach((i) => {
        (t = i.Count), (r += i.FinalPrice * t);
      }),
      r.toFixed(2)
    );
  }
  addQuantityBtn() {
    let e = document.querySelectorAll(".cart-card__quantity");
    e.forEach((t) => {
      let r =
          t.parentElement.previousElementSibling.previousElementSibling
            .childNodes[1].innerHTML,
        i = t.previousElementSibling,
        l = t.nextElementSibling;
      (i.onclick = () => {
        m("sub", r, this.key), this.init(), h();
      }),
        (l.onclick = () => {
          m("add", r, this.key), this.init(), h();
        });
    });
  }
}
function m(n, e, t) {
  let r = u(t);
  r.forEach((i) => {
    i.Name === e &&
      (n === "add" && (i.Count = i.Count + 1),
      n === "sub" && (i.Count = i.Count - 1));
    let l = r.filter(function (o) {
      return o.Count > 0;
    });
    y(t, l);
  });
}
