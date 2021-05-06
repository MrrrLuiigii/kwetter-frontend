import { ProfileVM } from "@/models/viewmodels/profile.viewmodel";

export const defaultState = {
	profile: null
};

const state = {
	profile: null
};

export default {
	// namespaced: true,
	state,
	mutations: {
		SAVE_PROFILE(state: any, profile: ProfileVM) {
			state.profile = profile;
		}
	},
	getters: {
		getProfile: (state: { profile: ProfileVM }) => {
			return state.profile;
		}
	},
	actions: {
		saveProfile({ commit }: any, profile: ProfileVM) {
			commit("SAVE_PROFILE", profile);
		}
	}
};
