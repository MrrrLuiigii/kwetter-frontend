<template>
	<div>
		<Navigation propBackLocation="game" />
		<PageTitle title="Battle" />

		<div class="monsters">
			<div
				class="monsters__container"
				v-for="monster in battle.monsters"
				:key="monster.id"
			>
				<BattleMonsterCard
					:propMonster="monster"
					@deleteMonster="deleteMonster"
				/>
			</div>
			<button class="squareButton">
				<fa-icon class="fa-icon dice-icon" :icon="['fas', 'plus']" />
			</button>
		</div>

		<button>delete</button>

		<br />
		<br />
		<br />

		<div>monster power:</div>
		<div>crown winner</div>
		<div>munchkin power:</div>

		<br />
		<br />
		<br />

		<div>
			{{ battle.munchkins }}
		</div>

		<button>plus</button>
		<button>delete</button>

		<button>finish battle</button>
	</div>
</template>

<script lang="ts">
//packages
import { Component, Vue } from "vue-property-decorator";
import Axios, { AxiosResponse } from "axios";

//components
import Navigation from "@/components/Navigation.vue";
import PageTitle from "@/components/PageTitle.vue";
import BattleMonsterCard from "@/components/BattleMonsterCard.vue";

//models
import Battle from "@/models/Battle";
import Lobby from "@/models/Lobby";
import Munchkin from "@/models/Munchkin";

//enums

//services
import BattleService from "@/services/battleService";

@Component({
	components: {
		Navigation,
		PageTitle,
		BattleMonsterCard
	}
})
export default class BattleView extends Vue {
	private error: Error | null = null;

	get munchkin(): Munchkin {
		const username: string = this.$store.getters.getLoggedInUser.username;
		return this.lobby.munchkins.find(m => m.name === username) as Munchkin;
	}

	get lobby(): Lobby {
		return this.$store.getters.getLobby;
	}

	get battle(): Battle {
		const battle: Battle = this.$store.getters.getBattle;
		battle.monsters = [
			{ id: 1, level: 1, modifier: 1 },
			{ id: 2, level: 1, modifier: 1 },
			{ id: 3, level: 1, modifier: 1 }
		];
		return battle;
	}

	deleteMonster(id: number) {
		console.log(id);
	}

	created() {
		const url: string = "battles";

		BattleService.getActiveBattle(this.lobby, this.munchkin, true).then(
			(res: AxiosResponse) => {
				if (res) {
					if (res.status === 200) {
						const battle: Battle = res.data;
						this.$store.dispatch("saveBattle", battle);
					}
				}
			}
		);
	}
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.monsters {
	display: flex;
	justify-content: flex-start;
	align-items: center;

	width: 95vw;
	margin: 2.5vw;

	overflow-y: auto;
}
</style>
