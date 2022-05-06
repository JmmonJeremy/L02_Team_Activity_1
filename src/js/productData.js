const baseURL = "http://157.201.228.93:2992/"

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


export default class ProductData {
  
  constructor() {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }
  // get product data
  getData(category) {
    return fetch(baseURL + `products/search/${category}`)
      .then(convertToJson).then((data) => data.Result);
    // return fetch(this.path)
    //   .then(convertToJson)
    //   .then((data) => data);
  }

  //   // Async version of the getData function
  //   async getData1() {
  //     let thing =  await fetch(this.path)
  //     let data = convertToJson(thing)
  //     return data
  //   }

  async findProductById(id) {
    return fetch(baseURL + `product/${id}`)
      .then(convertToJson).then((data) => data.Result);
  }
}
