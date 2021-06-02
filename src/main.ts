import Vue from "vue";
import App from "./App.vue";
import router from "./routes/index";
import store from "./store/index";
import "./registerServiceWorker";

//timeago
import VueTimeago from "vue-timeago";

//toast
import Toasted from "vue-toasted";

//vuetify
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

//meta
import VueMeta from "vue-meta";

//font awesome
import "./icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
Vue.component("fa-icon", FontAwesomeIcon);

//env variables
import "dotenv/config";
import validateEnv from "./utils/validateEnv";

const locale = Intl.DateTimeFormat().resolvedOptions().locale
	? Intl.DateTimeFormat().resolvedOptions().locale
	: "nl";
Vue.use(VueTimeago, { locale });
Vue.use(Toasted);
Vue.use(Vuetify);
Vue.use(VueMeta, {
	refreshOnceOnNavigation: true
});

const nodeEnv: "development" | "production" =
	process.env.VUE_APP_NODE_ENV || "development";
if (nodeEnv === "development") {
	validateEnv();
}

Vue.config.productionTip = false;

// Register a global custom directive called v-focus
Vue.directive("focus", {
	inserted: function(el) {
		el.focus();
	}
});

const app = "";

if (!app) {
	new Vue({
		vuetify: new Vuetify(),
		router,
		store,
		render: h => h(App)
	}).$mount("#app");
}
