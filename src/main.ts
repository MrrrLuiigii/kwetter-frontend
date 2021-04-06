import Vue from "vue";
import App from "./App.vue";
import router from "./routes/index";
import store from "./store/index";
import "./registerServiceWorker";

//toast
import Toasted from "vue-toasted";

//vuetify
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

//meta
import VueMeta from "vue-meta";

//font-awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faBars,
	faFeatherAlt,
	faSignOutAlt,
	faTimes,
	faUser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

//env variables
import "dotenv/config";
import validateEnv from "./utils/validateEnv";

Vue.use(Toasted);
Vue.use(Vuetify);
Vue.use(VueMeta, {
	refreshOnceOnNavigation: true
});

library.add(faBars, faFeatherAlt, faUser, faSignOutAlt, faTimes);
Vue.component("fa-icon", FontAwesomeIcon);

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
