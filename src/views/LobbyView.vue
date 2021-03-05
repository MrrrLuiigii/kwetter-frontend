<template>
	<div>
		<Navigation />
		<PageTitle title="Lobbies" />
		<div v-if="error">
			{{ error.message }}
		</div>
		<div class="lobbies" v-if="getLobbies.length > 0">
			<div v-for="lobby in getLobbies" :key="lobby.id">
				<LobbyCard :propLobby="lobby" />
			</div>
		</div>
		<div class="info-message" v-if="getLobbies.length === 0">
			There are no munchkins playing at the moment...
		</div>
		<button class="addLobbyButton squareButton" @click="addLobby">
			<fa-icon class="fa-icon" :icon="['fas', 'plus']" />
		</button>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navigation from "@/components/Navigation.vue";
import PageTitle from "@/components/PageTitle.vue";
import LobbyCard from "@/components/LobbyCard.vue";
import Lobby from "@/models/Lobby";
import Axios, { AxiosResponse } from "axios";
import User from "@/models/User";
import Error from "@/models/Error";
import LobbyService from "@/services/lobbyService";
import LobbyStatus from "@/models/enums/LobbyStatus";

@Component({
	components: {
		Navigation,
		PageTitle,
		LobbyCard
	},
	sockets: {
		addLobby(error: Error, lobby: Lobby) {
			if (!error) {
				const lobbies: Lobby[] = this.$store.getters.getLobbies;
				lobbies.push(lobby);
				this.$store.dispatch("saveLobbies", lobbies);
			}
		},
		joinLobby(error: Error, lobby: Lobby) {
			if (!error) {
				this.$store.dispatch("updateLobby", lobby);
			}
		},
		leaveLobby(error: Error, lobby: Lobby) {
			if (!error) {
				this.$store.dispatch("updateLobby", lobby);
			}
		},
		deleteLobby(error: Error, lobby: Lobby) {
			if (!error) {
				this.$store.dispatch("deleteLobby", lobby);
			}
		}
	}
})
export default class LobbyView extends Vue {
	private error: Error | null = null;

	created() {
		const url: string = "lobbies";
		LobbyService.getLobbies().then((res: AxiosResponse) => {
			if (res) {
				if (res.status === 200) {
					const lobbies: Lobby[] = res.data;
					this.$store.dispatch("saveLobbies", lobbies);
				}
			}
		});
	}

	get getLobbies(): Lobby[] {
		let lobbies: Lobby[] = this.$store.getters.getLobbies;
		if (!lobbies) {
			lobbies = [];
		}
		return lobbies.filter((l: Lobby) => l.status !== LobbyStatus.Finished);
	}

	addLobby(): void {
		const user: User = this.$store.getters.getLoggedInUser;
		LobbyService.addLobby(user).then((res: AxiosResponse) => {
			if (res) {
				if (res.status === 200) {
					this.error = null;
					const lobby: Lobby = res.data;
					this.$socket.client.emit("addLobby", lobby);
					this.$store.dispatch("saveLobby", lobby);
					this.$router.replace("game");
				} else {
					this.error = res.data;
				}
			}
		});
	}

	showToast() {
		this.$toasted.show("Yeeett", {
			position: "bottom-right",
			duration: 2500
		});
	}
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.addLobbyButton {
	position: absolute;
	bottom: 1em;
	right: 1em;
}

.lobbies {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-content: flex-start;

	height: 75vh;
	overflow-y: auto;

	&__info {
		padding: 20%;
	}

	@include smallScreen {
		height: 70vh;
	}

	@include largeScreen {
		height: 80vh;
	}
}

.info-message {
	height: 65vh;
	margin: 1em;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-content: center;
}
</style>
