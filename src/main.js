import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import InstantSearch from "vue-instantsearch/vue3/es";
import "instantsearch.css/themes/algolia-min.css";
import vue3GoogleLogin from "vue3-google-login";
const gauthOption = {
  clientId: import.meta.env.VITE_GG_CLIENT_ID,
};

createApp(App)
  .use(InstantSearch)
  .use(vue3GoogleLogin, gauthOption)
  .mount("#app");
