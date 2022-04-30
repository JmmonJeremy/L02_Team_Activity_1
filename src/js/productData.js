function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

// or should we do it this way?
// async function getProductsDataAwait() {
//   products = await fetch("../json/tents.json").then(convertToJson);
// }

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }
  // get product data
  getData() {
    // const data = null
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }

  getCategory() {
    return this.category;
  }
  
  //   // Async version of the getData function
  //   async getData1() {
  //     let thing =  await fetch(this.path)
  //     let data = convertToJson(thing)
  //     return data
  //   }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}
