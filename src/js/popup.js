const popupScreen = document.querySelector(".popup-screen");
const popupBox = document.querySelector(".popup-box");
const popupBlur = document.querySelector(".popup-blur");
const closebtn = document.querySelector(".close-btn");
const websiteCookie = document.cookie.indexOf("SleepOutside=");


// Popup Screen in 10 seconds after the page is loaded
window.addEventListener("load", () => {
    setTimeout(() => {
        popupScreen.classList.add("active");
    }, 10000);
    setTimeout(() => {
        popupBlur.classList.add("active");
    }, 10000);
});



// Close the popup Screen
closebtn.addEventListener("click", () => {
    popupScreen.classList.remove("active");

    document.cookie = "SleepOutside=Website; max-age=" + 24 * 60 * 60;
});

if(websiteCookie != -1){
    // Hide the popup screen if the cookie in not expired.
    popupScreen.style.display = "none";
} else {
    // Show the popup screen if the cookie is expired.
    popupScreen.style.display = "flex";
}