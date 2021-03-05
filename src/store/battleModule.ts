import Battle from "@/models/Battle";

export default {
	// namespaced: true,
	state: {
		battle: null
	},
	mutations: {
		SAVE_BATTLE(state: any, battle: Battle) {
			state.battle = battle;
		}
	},
	getters: {
		getBattle: (state: { battle: Battle }) => {
			return state.battle;
		}
	},
	actions: {
		saveBattle({ commit }: any, battle: Battle) {
			commit("SAVE_BATTLE", battle);
		}
	}
};
