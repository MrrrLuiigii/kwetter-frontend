import KweetVM from "@/models/viewmodels/kweet.viewmodel";

export const state = {
	skip: 0,
	take: 10,
	count: 0,
	kweets: []
};

export default {
	namespaced: true,
	state,
	mutations: {
		SET_PAGINATION(state: any, pagination: { skip: number; take: number }) {
			state.skip = pagination.skip;
			state.take = pagination.take;
		},
		SAVE_KWEETS(state: any, data: { data: KweetVM[]; count: number }) {
			state.kweets = data.data;
			state.count = data.count;
		}
	},
	getters: {
		getPagination: (state: { skip: number; take: number }) => {
			return { skip: state.skip, take: state.take };
		},
		getKweets: (state: { kweets: KweetVM[] }) => {
			return state.kweets;
		}
	},
	actions: {
		setPagination({ commit }: any, pagination: { skip: number; take: number }) {
			commit("SET_PAGINATION", pagination);
		},
		saveKweets({ commit }: any, data: { data: KweetVM[]; count: number }) {
			commit("SAVE_KWEETS", data);
		}
	}
};
