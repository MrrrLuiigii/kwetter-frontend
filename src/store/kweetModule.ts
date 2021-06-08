import KweetVM from "@/models/viewmodels/kweet.viewmodel";
import { LikeVM } from "@/models/viewmodels/like.viewmodel";

export const defaultState = {
	skip: 0,
	mentionSkip: 0,
	take: 10,
	count: 0,
	mentionCount: 0,
	kweets: [],
	mentionKweets: []
};

const state = {
	skip: 0,
	mentionSkip: 0,
	take: 10,
	count: 0,
	mentionCount: 0,
	kweets: [],
	mentionKweets: []
};

export default {
	namespaced: true,
	state,
	mutations: {
		RESET_PAGINATION(state: any) {
			state.skip = 0;
			state.take = 10;
			state.count = 0;
			state.kweets = [];
		},
		RESET_MENTIONPAGINATION(state: any) {
			state.mentionSkip = 0;
			state.take = 10;
			state.mentionCount = 0;
			state.mentionKweets = [];
		},
		PAGE_UP(state: any) {
			state.skip += state.take;
		},
		MENTIONPAGE_UP(state: any) {
			state.mentionSkip += state.take;
		},
		SAVE_KWEETS(state: any, data: { data: KweetVM[]; count: number }) {
			state.kweets = state.kweets.concat(data.data);
			state.count = data.count;
		},
		SAVE_MENTIONKWEETS(state: any, data: { data: KweetVM[]; count: number }) {
			state.mentionKweets = state.mentionKweets.concat(data.data);
			state.mentionCount = data.count;
		},
		SET_LIKES(state: any, data: { likes: LikeVM[]; kweetId: string }) {
			const kweet: KweetVM = state.kweets.find(
				(kweet: KweetVM) => kweet.id === data.kweetId
			);
			kweet.likes.likes = data.likes;
			kweet.likes.count = data.likes.length;
		},
		DELETE_KWEET(state: any, kweetId: string) {
			const index = state.kweets.findIndex(
				(kweet: KweetVM) => kweet.id === kweetId
			);
			if (index !== -1) {
				state.kweets = state.kweets.splice(index, 1);
				state.count -= 1;
			}
		}
	},
	getters: {
		getPagination: (state: { skip: number; take: number; count: number }) => {
			return { skip: state.skip, take: state.take, count: state.count };
		},
		getMentionPagination: (state: {
			mentionSkip: number;
			take: number;
			mentionCount: number;
		}) => {
			return {
				skip: state.mentionSkip,
				take: state.take,
				count: state.mentionCount
			};
		},
		getKweets: (state: { kweets: KweetVM[] }) => {
			return state.kweets;
		},
		getMentionKweets: (state: { mentionKweets: KweetVM[] }) => {
			return state.mentionKweets;
		}
	},
	actions: {
		resetPagination({ commit }: any) {
			commit("RESET_PAGINATION");
		},
		pageUp({ commit }: any) {
			commit("PAGE_UP");
		},
		resetMentionPagination({ commit }: any) {
			commit("RESET_MENTIONPAGINATION");
		},
		mentionPageUp({ commit }: any) {
			commit("MENTIONPAGE_UP");
		},
		saveKweets({ commit }: any, data: { data: KweetVM[]; count: number }) {
			commit("SAVE_KWEETS", data);
		},
		saveMentionKweets(
			{ commit }: any,
			data: { data: KweetVM[]; count: number }
		) {
			commit("SAVE_MENTIONKWEETS", data);
		},
		setLikes({ commit }: any, data: { likes: LikeVM[]; kweetId: string }) {
			commit("SET_LIKES", data);
		},
		deleteKweet({ commit }: any, kweetId: string) {
			commit("DELETE_KWEET", kweetId);
		}
	}
};
