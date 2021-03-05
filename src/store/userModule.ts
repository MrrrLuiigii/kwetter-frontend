import User from "@/models/User";

export default {
	// namespaced: true,
	state: {
		firebaseUser: null,
		loggedInUser: null
	},
	mutations: {
		SAVE_FIREBASE_USER(state: any, firebaseUser: any) {
			state.firebaseUser = firebaseUser;
		},
		SAVE_LOGGED_IN_USER(state: any, loggedInUser: User) {
			state.loggedInUser = loggedInUser;
		}
	},
	getters: {
		getFirebaseUser: (state: { firebaseUser: any }) => {
			return state.firebaseUser;
		},
		getLoggedInUser: (state: { loggedInUser: User }) => {
			return state.loggedInUser;
		}
	},
	actions: {
		saveFirebaseUser({ commit }: any, firebaseUser: any) {
			commit("SAVE_FIREBASE_USER", firebaseUser);
		},
		saveLoggedInUser({ commit }: any, loggedInUser: User) {
			commit("SAVE_LOGGED_IN_USER", loggedInUser);
		},
		logout({ commit }: any) {
			commit("SAVE_FIREBASE_USER", null);
			commit("SAVE_LOGGED_IN_USER", null);
		}
	}
};
