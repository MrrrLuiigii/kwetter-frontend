import AuthVM from "@/models/viewmodels/auth.viewmodel";

export const defaultState = {
	user: null
};

const state = {
	user: null
};

export default {
	namespaced: true,
	state,
	mutations: {
		SAVE_USER(state: any, user: AuthVM) {
			state.user = user;
		},
		LINK_PROFILE(state: any, profileId: string) {
			state.user = { ...state.user, profileId };
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
		linkProfile({ commit }: any, profileId: string) {
			commit("LINK_PROFILE", profileId);
		}
	}
};
