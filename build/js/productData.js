var a = (o, n, t) =>
  new Promise((r, s) => {
    var d = (e) => {
        try {
          c(t.next(e));
        } catch (u) {
          s(u);
        }
      },
      f = (e) => {
        try {
          c(t.throw(e));
        } catch (u) {
          s(u);
        }
      },
      c = (e) => (e.done ? r(e.value) : Promise.resolve(e.value).then(d, f));
    c((t = t.apply(o, n)).next());
  });
const l = "http://157.201.228.93:2992/";
function h(o) {
  if (o.ok) return o.json();
  throw new Error("Bad Response");
}
export default class p {
  constructor() {}
  getData(n) {
    let t = fetch(l + `products/search/${n}`)
      .then(h)
      .then(
        (r) => (
          (t = r.Result),
          t.forEach((s) => {
            (s.Count = 0), (s.InCart = !1);
          }),
          t
        )
      );
    return console.log(t), t;
  }
  findProductById(n) {
    return a(this, null, function* () {
      let t = fetch(l + `product/${n}`)
        .then(h)
        .then((r) => ((t = r.Result), (t.Count = 0), (t.InCart = !1), t));
      return console.log(t), t;
    });
  }
}
