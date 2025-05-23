import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faBurger,
  faBed,
  faShower,
  faGamepad,
} from "@fortawesome/free-solid-svg-icons";

library.add(faBurger, faGamepad, faBed, faShower);

createApp(App).mount("#app");
