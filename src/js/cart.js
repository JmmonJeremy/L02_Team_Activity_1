function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function getCartContents() {
  // let markup = "";
  let cartItems = getLocalStorage("so-cart");
  if (cartItems == null) {
    cartItems = [];
  }
  //console.log(cartItems);
  const htmlItems = cartItems.map((item) => renderCartItem(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  // document.querySelector(".product-list").innerHTML = renderCartItem(cartItems);

  // console.log(cartItems)
  // renderCartItem(cartItems);

  // Display the total in the cart if there are items in it.
  let cart_total = document.querySelector(".cart-footer");
  if (cartItems.length > 0) {
    // console.log(cartItems);
    cart_total.classList.remove("hide");
    cart_total.firstChild.innerHTML = `${
      cart_total.firstChild.innerHTML
    } $${getCartTotal(cartItems)}`;
  } else {
    cart_total.classList.add("hide");
  }
}

function renderCartItem(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
  // console.log(newItem);
  return newItem;
}

function getCartTotal(cart) {
  let total = 0.0;
  cart.forEach((element) => {
    total += element.FinalPrice;
  });
  return total;
}

getCartContents();
