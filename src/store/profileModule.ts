import { FollowVM } from "@/models/viewmodels/follow.viewmodel";
import { ProfileVM } from "@/models/viewmodels/profile.viewmodel";

export const defaultState = {
	profile: null
};

const state = {
	profile: null
};

export default {
	namespaced: true,
	state,
	mutations: {
		SAVE_PROFILE(state: any, profile: ProfileVM) {
			state.profile = profile;
		},
		SAVE_FOLLOWS(state: any, follows: FollowVM) {
			state.profile = {
				...state.profile,
				following: follows.following,
				followers: follows.followers
			};
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
		},
		saveFollows({ commit }: any, follows: FollowVM) {
			commit("SAVE_FOLLOWS", follows);
		}
	}
};
