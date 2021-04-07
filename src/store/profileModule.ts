import ProfileVM from "@/models/viewmodels/profile.viewmodel";

export default {
	// namespaced: true,
	state: {
		profile: null
	},
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
