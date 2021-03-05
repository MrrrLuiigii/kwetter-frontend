<template>
	<div>
		<div class="munchkin">
			<div class="munchkin__identity">
				<div class="munchkin__identity__name">
					{{ munchkin.name }}
				</div>
				<div class="munchkin__identity__gender">
					<fa-icon v-if="munchkin.gender === 0" :icon="['fas', 'male']" />
					<fa-icon v-else :icon="['fas', 'female']" />
				</div>
			</div>

			<!--  -->

			<v-divider class="munchkin__divider" />

			<!--  -->

			<div class="munchkin__stats">
				<div class="munchkin__stats__individual">
					<div class="munchkin__stats__individual__container">
						<div class="munchkin__stats__individual__container__value">
							<fa-icon
								class="munchkin__stats__individual__container__value__icon"
								:icon="['fas', 'graduation-cap']"
							/>
							{{ munchkin.level }}
						</div>
					</div>
					<div class="munchkin__stats__individual__container">
						<div class="munchkin__stats__individual__container__value">
							<fa-icon
								class="munchkin__stats__individual__container__value__icon"
								:icon="['fas', 'shield-alt']"
							/>
							{{ munchkin.gear }}
						</div>
					</div>
				</div>
				<div class="munchkin__stats__strength">
					<fa-icon
						class="munchkin__stats__strength__icon"
						:icon="['fas', 'fist-raised']"
					/>
					{{ munchkin.level + munchkin.gear }}
				</div>
			</div>

			<!--  -->

			<v-divider class="munchkin__divider" />

			<!--  -->

			<div class="munchkin__characteristics">
				<div class="munchkin__characteristics__container">
					<div class="munchkin__characteristics__container__names">
						<div
							v-if="munchkin.races.length === 0"
							class="munchkin__characteristics__container__names__name"
						>
							No races...
						</div>

						<!--  -->

						<div class="munchkin__characteristics__container__names__name">
							<fa-icon
								class="info-icon"
								v-if="munchkinRaceOne.mRace > -1"
								:icon="['fas', 'info-circle']"
								@click.stop="showDetails(munchkinRaceOne)"
							/>
							{{ munchkinRaceOne.name }}
						</div>

						<!--  -->

						<div
							class="munchkin__characteristics__container__names__name"
							v-if="munchkin.halfbreed"
						>
							<fa-icon
								class="info-icon"
								v-if="munchkinRaceTwo.mRace > -1"
								:icon="['fas', 'info-circle']"
								@click.stop="showDetails(munchkinRaceTwo)"
							/>
							{{ munchkinRaceTwo.name }}
						</div>
					</div>

					<!--  -->

					<div class="munchkin__characteristics__container__hb">
						<fa-icon
							class="info-icon"
							:icon="['fas', 'info-circle']"
							@click.stop="showDetails('Halfbreed')"
						/>
						<span>HB &nbsp;</span>
						<fa-icon
							class="munchkin__characteristics__container__hb__icon"
							v-if="munchkin.halfbreed"
							:icon="['fas', 'check']"
						/>
						<fa-icon v-else :icon="['fas', 'times']" />
					</div>
				</div>

				<!--  -->

				<v-divider class="munchkin__divider" />

				<!--  -->

				<div class="munchkin__characteristics__container">
					<div class="munchkin__characteristics__container__names">
						<div
							v-if="munchkin.classes.length === 0"
							class="munchkin__characteristics__container__names__name"
						>
							No classes...
						</div>

						<!--  -->

						<div class="munchkin__characteristics__container__names__name">
							<fa-icon
								class="info-icon"
								v-if="munchkinClassOne.mClass > -1"
								:icon="['fas', 'info-circle']"
								@click.stop="showDetails(munchkinClassOne)"
							/>
							{{ munchkinClassOne.name }}
						</div>

						<!--  -->

						<div
							class="munchkin__characteristics__container__names__name"
							v-if="munchkin.supermunchkin"
						>
							<fa-icon
								class="info-icon"
								v-if="munchkinClassTwo.mClass > -1"
								:icon="['fas', 'info-circle']"
								@click.stop="showDetails(munchkinClassTwo)"
							/>
							{{ munchkinClassTwo.name }}
						</div>
					</div>

					<!--  -->

					<div class="munchkin__characteristics__container__sm">
						<fa-icon
							class="info-icon"
							:icon="['fas', 'info-circle']"
							@click.stop="showDetails('Supermunchkin')"
						/>
						<span>SM &nbsp;</span>
						<fa-icon
							class="munchkin__characteristics__container__sm__icon"
							v-if="munchkin.supermunchkin"
							:icon="['fas', 'check']"
						/>
						<fa-icon v-else :icon="['fas', 'times']" />
					</div>
				</div>
			</div>
		</div>

		<Modal v-if="detailModal.active" @close="detailModal.active = false">
			<template v-slot:title>
				{{ detailModal.name }}
			</template>
			<template v-slot:body>
				{{ detailModal.description }}
			</template>
			<template v-slot:action>
				Close
			</template>
		</Modal>

		<Modal v-if="raceClassModal.active" @close="raceClassModal.active = false">
			<template v-slot:title>
				{{ raceClassModal.name }}
			</template>
			<template v-slot:body>
				<div v-for="ability in raceClassModal.abilities" :key="ability.name">
					<label>{{ ability.name }}</label>
					<p>{{ ability.description }}</p>
				</div>
			</template>
			<template v-slot:action>
				Close
			</template>
		</Modal>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

//components
import Modal from "@/components/Modal.vue";

//models
import Lobby from "@/models/Lobby";
import Munchkin from "@/models/Munchkin";
import Ability from "@/models/Ability";
import MunchkinRace from "@/models/MunchkinRace";
import MunchkinClass from "@/models/MunchkinClass";

//enums
import Gender from "@/models/enums/Gender";
import Class from "@/models/enums/Class";
import Race from "@/models/enums/Race";

@Component({
	components: {
		Modal
	}
})
export default class MunchkinCard extends Vue {
	private detailModal: {
		active: boolean;
		name: string;
		description: string;
	} = { active: false, name: "", description: "" };

	private raceClassModal: {
		active: boolean;
		name: string;
		abilities: Ability[];
	} = { active: false, name: "", abilities: [] };

	@Prop()
	propMunchkin!: Munchkin;

	get lobby(): Lobby {
		return this.$store.getters.getLobby;
	}

	get munchkin(): Munchkin {
		return this.lobby.munchkins.find(
			(m: Munchkin) => m.id === this.propMunchkin.id
		) as Munchkin;
	}

	set munchkin(munchkin: Munchkin) {
		this.$store.dispatch("updateMunchkin", { lobby: this.lobby, munchkin });
	}

	get munchkinRaceOne(): MunchkinRace {
		return this.munchkin.races[0]
			? this.munchkin.races[0]
			: { mRace: -1, name: "", abilities: [] };
	}
	set munchkinRaceOne(munchkinRace: MunchkinRace) {
		const munchkin: Munchkin = { ...this.munchkin };
		munchkin.races[0] = munchkinRace;
		this.munchkin = munchkin;
	}

	get munchkinRaceTwo(): MunchkinRace {
		return this.munchkin.races[1]
			? this.munchkin.races[1]
			: { mRace: -1, name: "", abilities: [] };
	}
	set munchkinRaceTwo(munchkinRace: MunchkinRace) {
		const munchkin: Munchkin = { ...this.munchkin };
		munchkin.races[1] = munchkinRace;
		this.munchkin = munchkin;
	}

	get munchkinClassOne(): MunchkinClass {
		return this.munchkin.classes[0]
			? this.munchkin.classes[0]
			: { mClass: -1, name: "", abilities: [] };
	}
	set munchkinClassOne(munckinClass: MunchkinClass) {
		const munchkin: Munchkin = { ...this.munchkin };
		munchkin.classes[0] = munckinClass;
		this.munchkin = munchkin;
	}

	get munchkinClassTwo(): MunchkinClass {
		return this.munchkin.classes[1]
			? this.munchkin.classes[1]
			: { mClass: -1, name: "", abilities: [] };
	}
	set munchkinClassTwo(munchkinClass: MunchkinClass) {
		const munchkin: Munchkin = { ...this.munchkin };
		munchkin.classes[1] = munchkinClass;
		this.munchkin = munchkin;
	}

	showDetails(value: any) {
		if (value === "Halfbreed" || value === "Supermunchkin") {
			this.detailModal.name = value;
			if (value === "Halfbreed") {
				this.detailModal.description = "";
			} else {
				this.detailModal.description = "";
			}
			this.detailModal.active = true;
		} else {
			this.raceClassModal.name = value.name;
			this.raceClassModal.abilities = value.abilities;
			this.raceClassModal.active = true;
		}
	}
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.info-icon {
	margin-right: 0.4em;
}

.munchkin {
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

	&__identity {
		display: flex;
		justify-content: space-evenly;
		margin-top: 0.75em;

		&__name {
			font-size: 2em;
		}

		&__gender {
			font-size: 2em;
		}
	}

	&__stats {
		display: flex;
		align-items: center;
		justify-content: space-between;

		&__individual {
			flex: 3;
			display: flex;
			flex-direction: column;

			padding-left: 1em;

			&__container {
				display: flex;
				justify-content: space-between;

				&__value {
					&__icon {
						margin-right: 0.5em;
					}
				}
			}
		}

		&__strength {
			flex: 2;
			padding: 0.4em 0.5em 0 0;
			font-size: 2em;
			display: flex;
			justify-content: flex-end;

			&__icon {
				margin-right: 0.25em;
			}
		}
	}

	&__characteristics {
		display: flex;
		flex-direction: column;

		&__container {
			display: flex;
			justify-content: space-between;
			padding: 0 1em;

			&__names {
				display: flex;
				flex-direction: column;

				&__name {
					display: flex;
					justify-content: flex-start;
					align-items: center;
				}
			}
		}
	}
}
</style>
