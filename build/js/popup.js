const mainElement=document.querySelector("main"),section=document.createElement("section");section.setAttribute("id","callToActionForm"),section.innerHTML=popupHtml(),mainElement.prepend(section);function getLocalStorage(e){return JSON.parse(localStorage.getItem(e))}function setLocalStorage(e,t){localStorage.setItem(e,JSON.stringify(t))}let visits=getLocalStorage("numberOfVisits");visits==null&&(visits=0);const popupScreen=document.querySelector(".popup-screen");visits<=0&&(popupScreen.style.visibility="visible",populatePopup()),setLocalStorage("numberOfVisits",visits+1);function populatePopup(){document.querySelector(".close-btn").addEventListener("click",()=>{popupScreen.classList.remove("active"),popupScreen.style.visibility="hidden"}),document.querySelector("#submit-popup").addEventListener("submit",()=>{popupScreen.classList.remove("active"),popupScreen.style.visibility="hidden",alert("Thanks for subscribing!")})}function popupHtml(){return`<div class="popup-blur">
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
    </div>`}
