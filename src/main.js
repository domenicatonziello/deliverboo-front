import { createApp } from "vue";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.vue";
import { router } from "./routes/";

// IMPORT FONTAWESOME
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";

import {
  faMagnifyingGlass,
  faCartShopping,
  faPhone,
  faTruckFast,
  faLocationDot,
  faCircleCheck
} from "@fortawesome/free-solid-svg-icons";
// import { faYoutube, faTwitch, faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';

library.add(faStar, farStar, faMagnifyingGlass, faCartShopping, faPhone, faTruckFast, faLocationDot, faCircleCheck);

const app = createApp(App);
app.use(router);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
