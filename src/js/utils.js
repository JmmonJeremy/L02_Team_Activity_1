import { displayCart } from "./cart-superscript.js";

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
// get the parameter
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}
// make a template that can be used to render lists
export function renderListWithTemplate(
  template,
  parentElement,
  list,
  callback
) {
  // clone it once for each product in our list
  list.forEach((item) => {
    const node = template.content.cloneNode(true);
    const filledTemplate = callback(node, item);
    // add it to the DOM
    parentElement.appendChild(filledTemplate);
  });
}

export function renderWithTemplate(template, parentElement, data, callback) {
  // clone the template
  let node = template.content.cloneNode(true);
  // if there is a callback, call it on the node and the data
  if (callback) {
    node = callback(node, data);
  }
  // add it to the DOM
  parentElement.appendChild(node);
}

function convertToText(res) {
  try {
    if (res.ok) {
      return res.text();
    } else {
      throw new Error("Bad Response");
    }
  } catch (e) {
    console.log(e);
  }
}

export async function loadTemplate(path) {
  const html = await fetch(path).then(convertToText);
  //console.log(html)
  const template = document.createElement("template");
  template.innerHTML = html;
  return template;
}

export async function loadHeaderFooter(isHomePath) {
  let headerTemplate;
  let footerTemplate;

  // Ternary operator AKA: Elvis operator. The code works like an 'if statement'
  // to determine the path for the homepage. This is necessary because the homepage
  // has a different relative path from all of the other pages.
  headerTemplate = await loadTemplate(
    (isHomePath ? "." : "..") +
      "/partials/" +
      (isHomePath ? "home-" : "") +
      "header.html"
  );
  footerTemplate = await loadTemplate(
    (isHomePath ? "." : "..") + "/partials/footer.html"
  );

  const header = document.querySelector("#main-header");
  const footer = document.querySelector("#main-footer");

  // console.log(headerTemplate, header)
  renderWithTemplate(headerTemplate, header);
  renderWithTemplate(footerTemplate, footer);
  displayCart();
}

export function filterList(list) {
  const filteredList = [];
  list.forEach((tent) => {
    if (tent.Id != "989CG" && tent.Id != "880RT") {
      filteredList.push(tent);
    }
  });
  return filteredList;
}

export function alertMessage(message, scroll=true){
  //create element to hold the alert
  let alert = document.createElement("div");
  let span = document.createElement("span");
  //add class to style it
  alert.class="alert" 
  span.class="closebtn"
  //remove the alert when x is clicked
  span.onclick="this.parentElement.style.display='none';"
  span.innerHTML="&times;"
  //scrolls user to top
  if(scroll)
    window.scrollTo(0,0);
  //show the message
  alert.appendChild(span);
  alert.innerHTML = message; 

  return alert;
}
