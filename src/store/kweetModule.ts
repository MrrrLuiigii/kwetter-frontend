import KweetVM from "@/models/viewmodels/kweet.viewmodel";
import { LikeVM } from "@/models/viewmodels/like.viewmodel";

export const defaultState = {
	skip: 0,
	take: 10,
	count: 0,
	kweets: []
};

const state = {
	skip: 0,
	take: 10,
	count: 0,
	kweets: []
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
		PAGE_UP(state: any) {
			state.skip += state.take;
		},
		SAVE_KWEETS(state: any, data: { data: KweetVM[]; count: number }) {
			state.kweets = state.kweets.concat(data.data);
			state.count = data.count;
		},
		SET_LIKES(state: any, data: { likes: LikeVM[]; kweetId: string }) {
			const kweet: KweetVM = state.kweets.find(
				(kweet: KweetVM) => kweet.id === data.kweetId
			);
			kweet.likes.likes = data.likes;
			kweet.likes.count = data.likes.length;
		}
	},
	getters: {
		getPagination: (state: { skip: number; take: number; count: number }) => {
			return { skip: state.skip, take: state.take, count: state.count };
		},
		getKweets: (state: { kweets: KweetVM[] }) => {
			return state.kweets;
		}
	},
	actions: {
		resetPagination({ commit }: any) {
			commit("RESET_PAGINATION");
		},
		pageUp({ commit }: any) {
			commit("PAGE_UP");
		},
		saveKweets({ commit }: any, data: { data: KweetVM[]; count: number }) {
			commit("SAVE_KWEETS", data);
		},
		setLikes({ commit }: any, data: { likes: LikeVM[]; kweetId: string }) {
			commit("SET_LIKES", data);
		}
	}
};
