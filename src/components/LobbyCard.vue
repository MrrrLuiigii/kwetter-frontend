<template>
	<div v-if="!!loggedInUser" class="lobby">
		<div class="lobby__owner">
			{{ lobby.owner.name }}
		</div>

		<!--  -->

		<v-divider class="lobby__divider" />

		<!--  -->

		<div class="lobby__munchkins">
			<div class="lobby__munchkins__header">
				<div class="lobby__munchkins__header__tag">
					Munchkins
				</div>

				<!--  -->

				<div class="lobby__munchkins__header__munchkinCount">
					({{ numberOfMunchkins }}/6)
				</div>
			</div>

			<!--  -->

			<div class="lobby__munchkins__participating">
				<div
					v-for="munchkin in lobby.munchkins"
					:key="munchkin.id"
					class="lobby__munchkins__participating__name"
				>
					{{ munchkin.name }}
				</div>
			</div>
		</div>

		<!--  -->

		<v-divider class="lobby__divider" />

		<!--  -->

		<div class="lobby__footer">
			<div class="lobby__footer__datetime">
				<div class="lobby_footer_datetime__date">
					{{ lobbyDate }}
				</div>

				<!--  -->

				<div class="lobby_footer_datetime__time">
					{{ lobbyTime }}
				</div>
			</div>

			<!--  -->

			<div class="lobby__footer__actions">
				<div v-if="inLobby" class="underlineAccent">
					<button @click="resumeLobby">RESUME</button>
				</div>
				<div v-else class="underlineAccent">
					<button @click="joinLobby">JOIN</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Lobby from "@/models/Lobby";
import User from "@/models/User";
import Munchkin from "@/models/Munchkin";
import JoinLobby from "@/models/dto/JoinLobby";
import AxiosHandler from "@/utils/axiosRequestHandler";
import { AxiosResponse } from "axios";
import { Route } from "vue-router";

@Component
export default class LobbyCard extends Vue {
	private error: Error | null = null;

	@Prop()
	propLobby!: Lobby;

	get loggedInUser(): User {
		return this.$store.getters.getLoggedInUser;
	}

	get lobby(): Lobby {
		return this.$store.getters.getLobbies.find(
			(l: Lobby) => l.id === this.propLobby.id
		) as Lobby;
	}

	get lobbyDate(): String {
		const createdAt: Date = new Date(this.lobby.createdAt);

		let day: string = createdAt.getDate().toString();
		day.length === 1 ? (day = `0${day}`) : ``;
		let month: string = (createdAt.getMonth() + 1).toString();
		month.length === 1 ? (month = `0${month}`) : ``;
		const year: number = createdAt.getFullYear();

		return `${day}-${month}-${year}`;
	}

	get lobbyTime(): string {
		const createdAt: Date = new Date(this.lobby.createdAt);

		let hours: string = createdAt.getHours().toString();
		hours.length === 1 ? (hours = `0${hours}`) : ``;
		let minutes: string = createdAt.getMinutes().toString();
		minutes.length === 1 ? (minutes = `0${minutes}`) : ``;

		return `${hours} : ${minutes}`;
	}

	get numberOfMunchkins(): number {
		return this.lobby.munchkins.length;
	}

	get inLobby(): boolean {
		let inLobby: boolean = false;
		const user: User = this.loggedInUser;
		this.lobby.munchkins.forEach((m: Munchkin) => {
			if (m.name === user.username) {
				inLobby = true;
			}
		});
		return inLobby;
	}

	resumeLobby(): void {
		this.$store.dispatch("saveLobby", this.lobby);
		this.$router.replace("game");
	}

	joinLobby(): void {
		const user: User = this.loggedInUser;
		const joinLobby: JoinLobby = {
			lobby: this.propLobby,
			user: user
		};

		this.postJoinLobby(joinLobby).then((res: AxiosResponse) => {
			if (res) {
				if (res.status === 200) {
					const lobby: Lobby = res.data;
					this.$socket.client.emit("joinLobby", lobby);
					this.$store.dispatch("saveLobby", lobby);
					this.$router.replace("game");
				} else {
					this.error = res.data;
				}
			}
		});
	}

	postJoinLobby(joinLobby: JoinLobby) {
		this.error = null;
		const url: string = "lobbies/join";
		return AxiosHandler.post(url, joinLobby).then((res: AxiosResponse) => {
			return res;
		});
	}
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.lobby {
	display: flex;
	flex-direction: column;
	width: 90vw;

	margin: 0.5em;

	min-width: 15em;
	max-width: 20em;

	background-color: color(primary);
	border: 2px solid color(font);
	border-radius: $border-radius;

	&__divider {
		background-color: color(font);
		margin: 0.2em 1em;
	}

	&__owner {
		font-size: 2em;
		padding: 0.5em 0 0 0;
	}

	&__munchkins {
		display: flex;
		flex-direction: column;
		padding: 0 1em;

		&__header {
			display: flex;
			justify-content: space-between;

			&__tag {
				font-size: 1.5em;
			}

			&__munchkinCount {
				align-self: center;
			}
		}

		&__participating {
			display: flex;
			flex-direction: column;
			text-align: left;

			&__name::before {
				content: "";
				background-image: url("../assets/icon_dark.svg");
				background-repeat: no-repeat;
				background-size: 2em 1em;
				display: inline-block;
				height: 1em;
				width: 2em;
			}
		}
	}

	&__footer {
		display: flex;
		justify-content: space-between;
		padding: 0.5em 1em;

		&__datetime {
			display: flex;
			flex-direction: column;
			text-align: left;
		}

		&__actions {
			align-self: center;
		}
	}
}
</style>
