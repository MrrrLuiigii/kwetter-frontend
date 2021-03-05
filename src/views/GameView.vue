<template>
	<div>
		<Navigation propBackLocation="lobby" />
		<div v-if="active">
			<PageTitle title="Game" />
			<div class="munchkins">
				<div
					class="munchkins__container"
					v-for="munchkin in munchkins"
					:key="munchkin.id"
				>
					<MunchkinCardEdit
						v-if="munchkin.name === user.username"
						:propMunchkin="munchkin"
					/>
					<MunchkinCard v-else :propMunchkin="munchkin" />
				</div>
			</div>
		</div>
		<div v-else-if="inLobby">
			<PageTitle title="Lobby" />
			<div class="munchkins">
				<div
					class="munchkins__container"
					v-for="munchkin in munchkins"
					:key="munchkin.id"
				>
					<MunchkinCardMinimal :propMunchkin="munchkin" />
				</div>
			</div>
		</div>
		<div v-else>
			Sorry, this game is finished already... Visit history to have a look.
		</div>

		<div class="lobbyActions">
			<div v-if="inLobby">
				<button
					class="squareButton lobbyActions__action"
					v-if="lobbyOwner"
					@click="leaveLobby"
				>
					<fa-icon class="fa-icon" :icon="['fas', 'trash-alt']" />
				</button>
				<button
					class="squareButton lobbyActions__action"
					v-else
					@click="leaveLobby"
				>
					<fa-icon class="fa-icon" :icon="['fas', 'sign-out-alt']" />
				</button>
			</div>
			<div v-if="inLobby && lobbyOwner">
				<button class="squareButton lobbyActions__action" @click="startGame">
					<fa-icon class="fa-icon" :icon="['fas', 'play']" />
				</button>
			</div>
			<div v-if="active">
				<Dice class="lobbyActions__action" />
				<button
					class="squareButton lobbyActions__action"
					@click="$router.replace('battle')"
				>
					<fa-icon class="fa-icon" :icon="['fas', 'fist-raised']" />
				</button>
			</div>

			<div v-if="winner">
				<button class="squareButton lobbyActions__action" @click="finishGame">
					<fa-icon class="fa-icon" :icon="['fas', 'trophy']" />
				</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Navigation from "@/components/Navigation.vue";
import MunchkinCardEdit from "@/components/MunchkinCardEdit.vue";
import MunchkinCard from "@/components/MunchkinCard.vue";
import MunchkinCardMinimal from "@/components/MunchkinCardMinimal.vue";
import PageTitle from "@/components/PageTitle.vue";
import Dice from "@/components/Dice.vue";
import User from "@/models/User";
import Lobby from "@/models/Lobby";
import Munchkin from "@/models/Munchkin";
import Error from "@/models/Error";
import JoinLobby from "../models/dto/JoinLobby";
import AxiosHandler from "../utils/axiosRequestHandler";
import { AxiosResponse } from "axios";
import LobbyStatus from "../models/enums/LobbyStatus";

@Component({
	components: {
		Navigation,
		MunchkinCardMinimal,
		MunchkinCardEdit,
		MunchkinCard,
		PageTitle,
		Dice
	},
	sockets: {
		joinLobby(error: Error, lobby: Lobby) {
			if (!error) {
				this.$store.dispatch("saveLobby", lobby);
			}
		},
		updateMunchkin(error: Error, lobby: Lobby, munchkin: Munchkin) {
			if (!error) {
				this.$store.dispatch("updateMunchkin", { lobby, munchkin });
			}
		},
		updateLobby(error: Error, lobby: Lobby) {
			if (!error) {
				this.$store.dispatch("saveLobby", lobby);
			}
		},
		leaveLobby(error: Error, lobby: Lobby) {
			if (!error) {
				this.$store.dispatch("saveLobby", lobby);
			}
		},
		deleteLobby(error: Error, lobby: Lobby) {
			if (!error) {
				this.$store.dispatch("deleteLobby", lobby);
				this.$router.replace("lobby");
			}
		},
		finishLobby(error: Error, lobby: Lobby) {
			if (!error) {
				this.$store.dispatch("saveLobby", lobby);
				this.$router.replace("history");
			}
		}
	}
})
export default class GameView extends Vue {
	private error: Error | null = null;

	get user(): User {
		return this.$store.getters.getLoggedInUser;
	}

	get lobby(): Lobby {
		return this.$store.getters.getLobby;
	}

	get munchkins(): Munchkin[] {
		return this.lobby.munchkins;
	}

	get lobbyOwner(): boolean {
		if (this.user.username === this.lobby.owner.name) {
			return true;
		}
		return false;
	}

	get inLobby(): boolean {
		return this.lobby.status === LobbyStatus.InLobby ? true : false;
	}

	get active(): boolean {
		return this.lobby.status === LobbyStatus.Active ? true : false;
	}

	get winner(): boolean {
		return (
			this.lobby.munchkins.findIndex((m: Munchkin) => m.level === 10) !== -1
		);
	}

	startGame(): void {
		this.putStartGame().then((res: AxiosResponse) => {
			if (res) {
				if (res.status === 200) {
					const lobby: Lobby = res.data;
					this.$socket.client.emit("updateLobby", lobby);
					this.$store.dispatch("saveLobby", lobby);
				} else {
					this.error = res.data;
				}
			}
		});
	}

	finishGame(): void {
		this.putFinishGame().then((res: AxiosResponse) => {
			if (res) {
				if (!!res.status && res.status === 200) {
					const lobby: Lobby = res.data;
					this.$socket.client.emit("finishLobby", lobby);
					this.$store.dispatch("saveLobby", lobby);
					this.$router.replace("history");
				} else {
					this.error = res.data;
				}
			}
		});
	}

	putStartGame() {
		this.error = null;
		const url: string = "lobbies/startgame";
		return AxiosHandler.put(url, this.lobby).then((res: AxiosResponse) => {
			return res;
		});
	}

	putFinishGame() {
		this.error = null;
		const url: string = "lobbies/finishgame";
		return AxiosHandler.put(url, this.lobby).then((res: AxiosResponse) => {
			return res;
		});
	}

	leaveLobby(): void {
		const user: User = this.user;
		const joinLobby: JoinLobby = {
			lobby: this.lobby,
			user: user
		};

		this.putLeaveLobby(joinLobby).then((res: AxiosResponse) => {
			if (res) {
				if (res.status === 200) {
					const lobby: Lobby = res.data;
					if (lobby.munchkins.length === 0) {
						this.$socket.client.emit("deleteLobby", lobby);
					} else {
						this.$socket.client.emit("leaveLobby", lobby);
					}
					this.$store.dispatch("saveLobby", lobby);
					this.$router.replace("lobby");
				} else {
					this.error = res.data;
				}
			}
		});
	}

	putLeaveLobby(joinLobby: JoinLobby) {
		this.error = null;
		const url: string = "lobbies/leave";
		return AxiosHandler.put(url, joinLobby).then((res: AxiosResponse) => {
			return res;
		});
	}
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.munchkins {
	display: flex;
	justify-content: center;
	align-content: flex-start;
	flex-wrap: wrap;

	height: 75vh;
	overflow-y: auto;

	@include smallScreen {
		height: 70vh;
	}

	@include largeScreen {
		height: 80vh;
	}
}

.lobbyActions {
	display: flex;

	position: absolute;
	bottom: 1em;
	right: 1em;

	&__action {
		margin-left: 0.5em;
	}
}
</style>
