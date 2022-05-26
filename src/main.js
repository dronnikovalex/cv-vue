import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

library.add(faGithub);

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
