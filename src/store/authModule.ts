import AuthVM from "@/models/auth.viewmodel";

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
		},
		logout({ commit }: any) {
			commit("SAVE_USER", null);
		}
	}
};
