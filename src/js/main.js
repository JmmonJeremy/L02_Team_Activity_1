import { loadHeaderFooter } from "./utils.js";

// add the header and footer to main page
loadHeaderFooter();

function newsLetter() {
  document.addEventListener("DOMContentLoaded", () => {
    document
      .getElementById("news-signup")
      .addEventListener("submit", handleForm);
  });
}

function handleForm(ev) {
  ev.preventDefault(); //stop the page reloading
  let newsLetterForm = ev.target;
  let fd = new FormData(newsLetterForm);
  let json = convertFD2JSON(fd);

  // Put in a real url here
  let url = "http://localhost:3000/";
  let header = new Headers();
  header.append("Content-type", "application/json");
  let req = new Request(url, {
    headers: header,
    body: json,
    method: "POST",
  });

  console.log(req.json());
  alert("Thanks for subscribing!");
  newsLetterForm.reset();

  // Send the request to the server.
  // fetch(req)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log("Response from server");
  //     console.log(data);
  //   })
  //   .catch(console.warn);
}

function convertFD2JSON(formData) {
  let obj = {};
  for (let key of formData.keys()) {
    obj[key] = formData.get(key);
  }
  return JSON.stringify(obj);
}

newsLetter();
