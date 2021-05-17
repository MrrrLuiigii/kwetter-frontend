import { FollowVM } from "@/models/viewmodels/follow.viewmodel";
import { ProfileMinVM, ProfileVM } from "@/models/viewmodels/profile.viewmodel";

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
		},
		FOLLOW(state: any, profile: ProfileMinVM) {
			const followers = state.profile.followers ? state.profile.followers : [];
			followers.push(profile);
			state.profile = {
				...state.profile,
				followers
			};
		},
		UNFOLLOW(state: any, profileId: string) {
			state.profile = {
				...state.profile,
				followers: state.profile.following.filter(
					(f: ProfileMinVM) => f.id !== profileId
				)
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
		},
		follow({ commit }: any, { follower }) {
			commit("FOLLOW", follower);
		},
		unfollow({ commit }: any, { followerId }) {
			commit("UNFOLLOW", followerId);
		}
	}
};
