import Vue from "vue";
import App from "./App.vue";
import router from "./routes/index";
import store from "./store/index";
import "./registerServiceWorker";

//firebase
import firebase from "firebase/app";
import "firebase/auth";

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

//sockets
import VueSocketIOExt from "vue-socket.io-extended";
import SocketIO from "socket.io-client";

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

const SOCKET_HOST: string = process.env.VUE_APP_SOCKET_HOST;
const IO = SocketIO(SOCKET_HOST);
Vue.use(VueSocketIOExt, IO);

Vue.config.productionTip = false;

const app = "";

const configOptions = {
	apiKey: process.env.VUE_APP_FB_API_KEY,
	authDomain: process.env.VUE_APP_FB_AUTH_DOMAIN,
	databaseURL: process.env.VUE_APP_FB_DATABASE_URL,
	projectId: process.env.VUE_APP_FB_PROJECT_ID,
	storageBucket: process.env.VUE_APP_FB_STORAGE_BUCKET,
	messagingSenderId: process.env.VUE_APP_FB_MESSAGING_SENDER_ID,
	appId: process.env.VUE_APP_FB_APP_ID,
	measurementId: process.env.VUE_APP_FB_MEASUREMENT_ID
};
firebase.initializeApp(configOptions);

firebase.auth().onAuthStateChanged(() => {
	if (!app) {
		new Vue({
			vuetify: new Vuetify(),
			router,
			store,
			render: h => h(App)
		}).$mount("#app");
	}
});

//TODO minify
//TODO secure socket
//TODO improve button clicks responsiveness (maybe with enlarge animation of updated element)
//TODO settings: fatfingermode
