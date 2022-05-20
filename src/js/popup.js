const mainElement = document.querySelector("main")
const section = document.createElement("section")

section.setAttribute("id", "callToActionForm")
section.innerHTML = popupHtml()
mainElement.prepend(section);

const popupScreen = document.querySelector(".popup-screen");
const popupBlur = document.querySelector(".popup-blur");
const closebtn = document.querySelector(".close-btn");




// Functions from util.js becuase they are not in a module
function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Check how many visits the user has made and store a new one for every visit.
let visits =  getLocalStorage("numberOfVisits");
if (visits == null) {
  visits = 0;
}

if (visits <= 0) {
  popupScreen.style.visibility = "visible"
  populatePopup
} 

setLocalStorage("numberOfVisits", visits + 1)

// if (visits < 1) {
//   // Hide the popup screen if the cookie in not expired.
//   // popupScreen.style.display = "none";
//   // popupScreen.style.display = "flex";
//   popupScreen.style.visibility = "visible"
//   populatePopup()
// } else {
//   popupScreen.style.visibility = "hidden"
// }


async function populatePopup() {
  // Popup Screen in 10 seconds after the page is loaded
  await window.addEventListener("load", () => {
    setTimeout(() => {
      popupScreen.classList.add("active");
    }, 10000);
    setTimeout(() => {
      popupBlur.classList.add("active");
    }, 10000);
  });

  // Close the popup Screen
  await closebtn.addEventListener("click", () => {
    popupScreen.classList.remove("active");
    // section.remove()
    // popupScreen.style.visibility = "hidden"
  });
}


function popupHtml() {
  return `<div class="popup-blur">
      <div class="popup-screen">
        <div class="popup-box">
          <i class="close-btn">X</i>
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
                <button id="submit">Subscribe</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>`
}
