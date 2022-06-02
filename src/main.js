import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faVk } from "@fortawesome/free-brands-svg-icons";
import { faHSquare } from "@fortawesome/free-solid-svg-icons";

library.add(faGithub, faVk, faHSquare);

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app') 
