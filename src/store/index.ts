import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({ encodingType: "aes", isCompression: false });

//modules
import authModule from "./authModule";
import profileModule from "./profileModule";
import kweetModule from "./kweetModule";

//state
import { state as authState } from "./authModule";
import { state as profileState } from "./profileModule";
import { state as kweetState } from "./kweetModule";

Vue.use(Vuex);

const defaultState = {
	authModule: authState,
	profileModule: profileState,
	kweetModule: kweetState
};

export default new Vuex.Store({
	state: defaultState,
	plugins: [
		createPersistedState({
			storage: {
				getItem: key => ls.get(key),
				setItem: (key, value) => ls.set(key, value),
				removeItem: key => ls.remove(key)
			}
		})
	],
	modules: { authModule, profileModule, kweetModule },
	mutations: {
		CLEAR_STATE(state: any) {
			const newState = { authModule: {}, profileModule: {} };
			Object.keys(authState).forEach(key => {
				newState["authModule"][key] = null;
			});
			Object.keys(profileState).forEach(key => {
				newState["profileModule"][key] = null;
			});
			Object.keys(kweetState).forEach(key => {
				newState["kweetModule"][key] = null;
			});
			Object.assign(state, newState);
		}
	},
	actions: {
		logout({ commit }: any) {
			commit("CLEAR_STATE");
		}
	}
});
