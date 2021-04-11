import AuthVM from "@/models/viewmodels/auth.viewmodel";

export default {
	// namespaced: true,
	state: {
		user: null
	},
	mutations: {
		SAVE_USER(state: any, user: AuthVM) {
			state.user = user;
		}
	},
	getters: {
		getUser: (state: { user: AuthVM }) => {
			return state.user;
		}
	},
	actions: {
		saveUser({ commit }: any, user: AuthVM) {
			commit("SAVE_USER", user);
		}
	}
};
