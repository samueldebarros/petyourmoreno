import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faBurger,
  faBed,
  faShower,
  faGamepad,
  faLemon,
  faSoap,
  faHand,
  faCoins,
  faStore,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faBurger,
  faGamepad,
  faBed,
  faShower,
  faLemon,
  faSoap,
  faHand,
  faCoins,
  faStore
);

createApp(App).mount("#app");
