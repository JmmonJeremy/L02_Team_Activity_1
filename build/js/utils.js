var d = (t, e, o) =>
  new Promise((r, n) => {
    var c = (a) => {
        try {
          l(o.next(a));
        } catch (s) {
          n(s);
        }
      },
      i = (a) => {
        try {
          l(o.throw(a));
        } catch (s) {
          n(s);
        }
      },
      l = (a) => (a.done ? r(a.value) : Promise.resolve(a.value).then(c, i));
    l((o = o.apply(t, e)).next());
  });
import { displayCart as p } from "./cart-superscript.js";
export function qs(t, e = document) {
  return e.querySelector(t);
}
export function getLocalStorage(t) {
  return JSON.parse(localStorage.getItem(t));
}
export function setLocalStorage(t, e) {
  localStorage.setItem(t, JSON.stringify(e));
}
export function setClick(t, e) {
  qs(t).addEventListener("touchend", (o) => {
    o.preventDefault(), e();
  }),
    qs(t).addEventListener("click", e);
}
export function getParam(t) {
  const e = window.location.search,
    o = new URLSearchParams(e),
    r = o.get(t);
  return r;
}
export function renderListWithTemplate(t, e, o, r) {
  o.forEach((n) => {
    const c = t.content.cloneNode(!0),
      i = r(c, n);
    e.appendChild(i);
  });
}
export function renderWithTemplate(t, e, o, r) {
  let n = t.content.cloneNode(!0);
  r && (n = r(n, o)), e.appendChild(n);
}
function u(t) {
  try {
    if (t.ok) return t.text();
    throw new Error("Bad Response");
  } catch (e) {
    console.log(e);
  }
}
export function loadTemplate(t) {
  return d(this, null, function* () {
    const e = yield fetch(t).then(u);
    console.log(e);
    const o = document.createElement("template");
    return (o.innerHTML = e), o;
  });
}
export function loadHeaderFooter(t) {
  return d(this, null, function* () {
    let e, o;
    t
      ? ((e = yield loadTemplate("./partials/home-header.html")),
        (o = yield loadTemplate("./partials/footer.html")))
      : ((e = yield loadTemplate("../partials/header.html")),
        (o = yield loadTemplate("../partials/footer.html")));
    const r = document.querySelector("#main-header"),
      n = document.querySelector("#main-footer");
    renderWithTemplate(e, r), renderWithTemplate(o, n), p();
  });
}
export function filterList(t) {
  const e = [];
  return (
    t.forEach((o) => {
      o.Id != "989CG" && o.Id != "880RT" && e.push(o);
    }),
    e
  );
}
