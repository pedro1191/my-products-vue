import { createApp } from 'vue';
import {
  faBars,
  faMinus,
  faPlus,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import VueGtag from 'vue-gtag';

library.add(
  faBars,
  faFacebookF,
  faInstagram,
  faMinus,
  faPlus,
  faSpinner,
  faTwitter
);

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(store)
  .use(router)
  .use(VueGtag, {
    config: { id: 'G-63LY7WVZ1P' },
  })
  .mount('#app');
