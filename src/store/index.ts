import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({ encodingType: "aes", isCompression: false });

//modules
import authModule from "./authModule";
import profileModule from "./profileModule";
import kweetModule from "./kweetModule";

//defaultState
import { defaultState as authDefaultState } from "./authModule";
import { defaultState as profileDefaultState } from "./profileModule";
import { defaultState as kweetDefaultState } from "./kweetModule";

Vue.use(Vuex);

const defaultState = {
	authModule: authDefaultState,
	profileModule: profileDefaultState,
	kweetModule: kweetDefaultState
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
			Object.assign(state, defaultState);
		}
	},
	actions: {
		logout({ commit }: any) {
			commit("CLEAR_STATE");
		}
	}
});
