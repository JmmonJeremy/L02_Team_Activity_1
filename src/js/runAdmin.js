import { loadHeaderFooter } from "./utils.js";
import Admin from "./admin.js";

loadHeaderFooter();

let main = document.querySelector("main");
// console.log(main);
let admin = new Admin(main);
admin.showLogin(main);
