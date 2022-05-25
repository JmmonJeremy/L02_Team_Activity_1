const mainElement = document.querySelector("main");
const section = document.createElement("section");

section.setAttribute("id", "callToActionForm");
section.innerHTML = popupHtml();
mainElement.prepend(section);

// Functions from util.js becuase they are not in a module
function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Check how many visits the user has made and store a new one for every visit.
let visits = getLocalStorage("numberOfVisits");
if (visits == null) {
  visits = 0;
}

const popupScreen = document.querySelector(".popup-screen");

if (visits <= 0) {
  popupScreen.style.visibility = "visible";
  populatePopup();
}

setLocalStorage("numberOfVisits", visits + 1);

function populatePopup() {
  // Close the popup Screen
  document.querySelector(".close-btn").addEventListener("click", () => {
    popupScreen.classList.remove("active");
    popupScreen.style.visibility = "hidden";
  });

  document.querySelector("#submit-popup").addEventListener("submit", () => {
    popupScreen.classList.remove("active");
    popupScreen.style.visibility = "hidden";
    alert("Thanks for subscribing!");
  });
}

function popupHtml() {
  return `<div class="popup-blur">
      <div class="popup-screen">
        <div class="popup-box">
          <button class="close-btn">X</button>
          <h2>Don't Forget to Subscribe!</h2>
          <form name="news-signup" id="news-signup">
            <div class="newsletter-container">
              <div class="newsletter-fields">
                <input
                  type="text"
                  autofocus
                  placeholder="Name"
                  name="name"
                  maxlength="50"
                  required
                />
                <input
                  type="email"
                  autofocus
                  placeholder="Email"
                  name="email"
                  maxlength="50"
                  required
                />
              </div>
              <div>
                <button id="submit-popup">Subscribe</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>`;
}
