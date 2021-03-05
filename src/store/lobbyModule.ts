import Lobby from "@/models/Lobby";
import Munchkin from "@/models/Munchkin";

export default {
	// namespaced: true,
	state: {
		lobbies: null,
		lobby: null
	},
	mutations: {
		SAVE_LOBBIES(state: any, lobbies: Lobby[]) {
			state.lobbies = lobbies;
		},
		UPDATE_LOBBY(state: any, lobby: Lobby) {
			const index: number = state.lobbies.findIndex(
				(l: Lobby) => l.id === lobby.id
			);
			if (index !== -1) {
				state.lobbies.splice(index, 1, lobby);
			}
		},
		DELETE_LOBBY(state: any, lobby: Lobby) {
			const index: number = state.lobbies.findIndex(
				(l: Lobby) => l.id === lobby.id
			);
			if (index !== -1) {
				state.lobbies.splice(index, 1);
			}
		},
		SAVE_LOBBY(state: any, lobby: Lobby) {
			state.lobby = lobby;
		},
		UPDATE_MUNCHKIN(state: any, munchkin: Munchkin) {
			const index: number = state.lobby.munchkins.findIndex(
				(m: Munchkin) => m.id === munchkin.id
			);
			if (index !== -1) {
				state.lobby.munchkins.splice(index, 1, munchkin);
			}
		}
	},
	getters: {
		getLobbies: (state: { lobbies: Lobby[] }) => {
			return state.lobbies;
		},
		getLobby: (state: { lobby: Lobby }) => {
			return state.lobby;
		}
	},
	actions: {
		saveLobbies({ commit }: any, lobbies: Lobby[]) {
			commit("SAVE_LOBBIES", lobbies);
		},
		updateLobby({ commit }: any, lobby: Lobby) {
			commit("UPDATE_LOBBY", lobby);
		},
		saveLobby({ commit }: any, lobby: Lobby) {
			commit("SAVE_LOBBY", lobby);
			commit("UPDATE_LOBBY", lobby);
		},
		deleteLobby({ commit }: any, lobby: Lobby) {
			commit("SAVE_LOBBY", null);
			commit("DELETE_LOBBY", lobby);
		},
		updateMunchkin(
			{ commit }: any,
			{ lobby, munchkin }: { lobby: Lobby; munchkin: Munchkin }
		) {
			commit("UPDATE_MUNCHKIN", munchkin);
			commit("UPDATE_LOBBY", lobby);
		}
	}
};
