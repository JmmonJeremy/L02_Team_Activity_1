const baseURL = "http://157.201.228.93:2992/";

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

// // or should we do it this way?
// async function getProductsDataAwait() {
//   products = await fetch("../json/tents.json").then(convertToJson);
// }

export default class ExternalServices {
  constructor() {}
  // get product data
  getData(category) {
    let products = fetch(baseURL + `products/search/${category}`)
      .then(convertToJson)
      .then((data) => {
        products = data.Result;
        products.forEach((product) => {
          product.Count = 0;
          product.InCart = false;
        });
        return products;
      });
    console.log(products);
    return products;
  }

  async findProductById(id) {
    let product = fetch(baseURL + `product/${id}`)
      .then(convertToJson)
      .then((data) => {
        product = data.Result;
        product.Count = 0;
        product.InCart = false;
        return product;
      });
    console.log(product);
    return product;
  }

  async checkout(formInfo) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formInfo),
    };
    return await fetch(baseURL + "checkout/", options).then(convertToJson);
  }
}
