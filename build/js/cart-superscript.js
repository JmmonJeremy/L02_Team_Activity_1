var s = (a, r, t) =>
  new Promise((i, c) => {
    var n = (e) => {
        try {
          l(t.next(e));
        } catch (o) {
          c(o);
        }
      },
      d = (e) => {
        try {
          l(t.throw(e));
        } catch (o) {
          c(o);
        }
      },
      l = (e) => (e.done ? i(e.value) : Promise.resolve(e.value).then(n, d));
    l((t = t.apply(a, r)).next());
  });
import { getLocalStorage as u } from "./utils.js";
function f(a) {
  return s(this, null, function* () {
    let r = 0;
    a.forEach((i) => {
      r += i.Count;
    });
    let t = yield document.querySelector(".cart-total-badge");
    t != null && (t.innerHTML = r),
      r > 0 ? t.classList.remove("hide") : t.classList.add("hide");
  });
}
export function displayCart() {
  return s(this, null, function* () {
    let a = u("so-cart");
    a != null && (yield f(a));
  });
}
