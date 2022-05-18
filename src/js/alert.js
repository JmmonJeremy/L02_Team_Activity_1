import { getLocalStorage } from "./utils";


export default class Alert {
    
    constructor(message, status, alertOrder) {
        this.message = message;
        this.status = status;
        this.alertOrder = alertOrder;
      }
    
    displayAlerts() {
        
        // Loop through alert .json and display all the alert inside
        fetch("../json/alerts.json")
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            data.forEach(element => {
               let alert = messageSection(element.message, element.status)
               // DOM appendChild(alert)
               alert.splice(xButton, 1);
            });
        })
    }

    createAlert(message, status) {
        
        // Take parameters to create alert and put it on the alerts .json
        //this.mainElement.innerHTML = messageSection();
        // create json object, write that object / append it to the alerts.json

    }

    deleteAlert() {
        // it will delete one alert.json when clicked
        const xButton = document.querySelector(".closeAlert");
        
        xButton.addEventListener("click", () => {
            let alert = getLocalStorage(this.alertOrder);

            alert.splice(xButton, 1);
        })
        // when X on the alert is clicked, remove it from the page and delete it from the 
        // alert.json file

    }
    
}

function messageSection(message, status) {
    return `<div class="${status}">
    <a class="closeAlert"></a>
    <p>${message}</p>
  </div>`;
  }