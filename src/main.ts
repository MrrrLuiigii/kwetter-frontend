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
	faMale,
	faFemale,
	faBars,
	faSignOutAlt,
	faPlus,
	faMinus,
	faCheck,
	faTimes,
	faFistRaised,
	faShieldAlt,
	faGraduationCap,
	faInfo,
	faInfoCircle,
	faDiceOne,
	faDiceTwo,
	faDiceThree,
	faDiceFour,
	faDiceFive,
	faDiceSix,
	faDice,
	faTrashAlt,
	faPlay,
	faArrowLeft,
	faTrophy,
	faFlagCheckered
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

//env variables
import "dotenv/config";
import validateEnv from "./utils/validateEnv";

Vue.use(Toasted);
Vue.use(Vuetify);
Vue.use(VueMeta, {
	refreshOnceOnNavigation: true
});

library.add(
	faMale,
	faFemale,
	faBars,
	faSignOutAlt,
	faPlus,
	faMinus,
	faCheck,
	faTimes,
	faFistRaised,
	faShieldAlt,
	faGraduationCap,
	faInfo,
	faInfoCircle,
	faDice,
	faDiceOne,
	faDiceTwo,
	faDiceThree,
	faDiceFour,
	faDiceFive,
	faDiceSix,
	faTrashAlt,
	faPlay,
	faArrowLeft,
	faTrophy,
	faFlagCheckered,
	faGoogle
);
Vue.component("fa-icon", FontAwesomeIcon);

const nodeEnv: "development" | "production" =
	process.env.VUE_APP_NODE_ENV || "development";
if (nodeEnv === "development") {
	validateEnv();
}

Vue.config.productionTip = false;

const app = "";

if (!app) {
	new Vue({
		vuetify: new Vuetify(),
		router,
		store,
		render: h => h(App)
	}).$mount("#app");
}
