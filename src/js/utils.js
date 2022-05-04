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
export function renderWithTemplate(
  template,
  parentElement,
  data,
  callback
) {
  // clone the template
    let node = template.content.cloneNode(true);
    // if there is a callback, call it on the node and the data
    if(callback){
      node = callback(node, data);
    }
    // add it to the DOM
    parentElement.appendChild(node);
}

function convertToText(res) {
  if (res.ok) {
    return res.text();
  } else {
    throw new Error("Bad Response");
  }
}

export async function loadTemplate(path){
  const html = await fetch(path).then(convertToText)
  const template = document.createElement("template");
  template.innerHTML = html;
  return template;
};

export function loadHeaderFooter() {
  const headerTemplate = loadTemplate("../partials/header.html");
  const footerTemplate = loadTemplate("../partials/footer.html");
  
  const header = document.querySelector("#main-header");
  const footer = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, header);
  renderWithTemplate(footerTemplate, footer);
}