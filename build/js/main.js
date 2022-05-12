import { loadHeaderFooter as d } from "./utils.js";
d(!0);
function a() {
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("news-signup").addEventListener("submit", i);
  });
}
function i(e) {
  e.preventDefault();
  let t = e.target,
    n = new FormData(t),
    r = u(n),
    s = "http://localhost:3000/",
    o = new Headers();
  o.append("Content-type", "application/json");
  let l = new Request(s, { headers: o, body: r, method: "POST" });
  console.log(l.json()), alert("Thanks for subscribing!"), t.reset();
}
function u(e) {
  let t = {};
  for (let n of e.keys()) t[n] = e.get(n);
  return JSON.stringify(t);
}
a();
