<template>
	<div>
		<div class="munchkin">
			<div class="munchkin__identity">
				<div class="munchkin__identity__name">
					{{ munchkin.name }}
				</div>
				<div class="munchkin__identity__gender" @click="toggleGender">
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
						<div class="munchkin__stats__individual__container__actions">
							<fa-icon
								class="action-icon"
								:icon="['fas', 'plus']"
								@click="updateLevel(munchkin.level + 1)"
							/>
							<fa-icon
								class="action-icon"
								:icon="['fas', 'minus']"
								@click="updateLevel(munchkin.level - 1)"
							/>
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
						<div class="munchkin__stats__individual__container__actions">
							<fa-icon
								class="action-icon"
								:icon="['fas', 'plus']"
								@click="updateGear(munchkin.gear + 1)"
							/>
							<fa-icon
								class="action-icon"
								:icon="['fas', 'minus']"
								@click="updateGear(munchkin.gear - 1)"
							/>
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
						<div class="munchkin__characteristics__container__names__name">
							<fa-icon
								class="info-icon"
								v-if="munchkinRaceOne.mRace > -1"
								:icon="['fas', 'info-circle']"
								@click.stop="showDetails(munchkinRaceOne)"
							/>
							<select
								class="munchkin__characteristics__container__names__name__select"
								v-model="munchkinRaceOne"
								@change="updateRace(0)"
							>
								<option disabled selected hidden :value="munchkinRaceOne">{{
									munchkinRaceOne.name !== ""
										? munchkinRaceOne.name
										: "Select race..."
								}}</option>
								<option
									v-for="mRace in races"
									:key="`firstRace:${mRace.mRace}`"
									:value="mRace"
									>{{ mRace.name }}
								</option>
							</select>
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
							<select
								class="munchkin__characteristics__container__names__name__select"
								v-model="munchkinRaceTwo"
								@change="updateRace(1)"
							>
								<option disabled selected hidden :value="munchkinRaceTwo">{{
									munchkinRaceTwo.name !== ""
										? munchkinRaceTwo.name
										: "Select race..."
								}}</option>
								<option
									v-for="mRace in races"
									:key="`secondRace:${mRace.mRace}`"
									:value="mRace"
									>{{ mRace.name }}
								</option>
							</select>
						</div>
					</div>

					<!--  -->

					<div
						class="munchkin__characteristics__container__hb"
						@click="toggleHalfbreed"
					>
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
						<div class="munchkin__characteristics__container__names__name">
							<fa-icon
								class="info-icon"
								v-if="munchkinClassOne.mClass > -1"
								:icon="['fas', 'info-circle']"
								@click.stop="showDetails(munchkinClassOne)"
							/>
							<select
								class="munchkin__characteristics__container__names__name__select"
								v-model="munchkinClassOne"
								@change="updateClass(0)"
							>
								<option disabled selected hidden :value="munchkinClassOne">{{
									munchkinClassOne.name !== ""
										? munchkinClassOne.name
										: "Select class..."
								}}</option>
								<option
									v-for="mClass in classes"
									:key="`firstClass:${mClass.mClass}`"
									:value="mClass"
									>{{ mClass.name }}
								</option>
								<option
									v-if="munchkinClassOne.mClass > -1"
									:value="{ mClass: -1, name: '', abilities: [] }"
									>-</option
								>
							</select>
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
							<select
								class="munchkin__characteristics__container__names__name__select"
								v-model="munchkinClassTwo"
								@change="updateClass(1)"
							>
								<option disabled selected hidden :value="munchkinClassTwo">{{
									munchkinClassTwo.name !== ""
										? munchkinClassTwo.name
										: "Select class..."
								}}</option>
								<option
									v-for="mClass in classes"
									:key="`secondClass:${mClass.mClass}`"
									:value="mClass"
									>{{ mClass.name }}
								</option>
								<option
									v-if="munchkinClassTwo.mClass > -1"
									:value="{ mClass: -1, name: '', abilities: [] }"
									>-</option
								>
							</select>
						</div>
					</div>

					<!--  -->

					<div
						class="munchkin__characteristics__container__sm"
						@click="toggleSupermunchkin"
					>
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
				<div
					v-for="(description, index) in detailModal.descriptions"
					:key="index"
				>
					{{ description }}
					<br v-if="index < detailModal.descriptions.length - 1" />
					<br v-if="index < detailModal.descriptions.length - 1" />
				</div>
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
				<div
					v-for="(ability, index) in raceClassModal.abilities"
					:key="ability.name"
				>
					<h3>{{ ability.name }}</h3>
					<v-divider class="munchkin__divider" />
					<p>{{ ability.description }}</p>
					<br v-if="raceClassModal.abilities.length === 2 && index === 0" />
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

//services
import MunchkinService from "@/services/munchkinService";
import { UpdatedValue } from "@/services/munchkinService";
import { AxiosResponse } from "axios";

@Component({
	components: {
		Modal
	}
})
export default class MunchkinCardEdit extends Vue {
	private error: Error | null = null;

	private detailModal: {
		active: boolean;
		name: string;
		descriptions: string[];
	} = { active: false, name: "", descriptions: [] };

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

	get races(): MunchkinRace[] {
		//TODO abilities invullen?
		const mRaces: MunchkinRace[] = [];
		for (let i: number = 0; i < Object.keys(Race).length / 2; i++) {
			if (
				i !== this.munchkinRaceOne.mRace &&
				i !== this.munchkinRaceTwo.mRace
			) {
				const munchkinRace: MunchkinRace = {
					mRace: i,
					name: Race[i],
					abilities: []
				};
				mRaces.push(munchkinRace);
			}
		}
		return mRaces;
	}

	get classes(): MunchkinClass[] {
		//TODO abilities invullen?
		const mClasses: MunchkinClass[] = [];
		for (let i: number = 0; i < Object.keys(Class).length / 2; i++) {
			if (
				i !== this.munchkinClassOne.mClass &&
				i !== this.munchkinClassTwo.mClass
			) {
				const munchkinClass: MunchkinClass = {
					mClass: i,
					name: Class[i],
					abilities: []
				};
				mClasses.push(munchkinClass);
			}
		}
		return mClasses;
	}

	updateLevel(level: number): void {
		if (level > 0 && level <= 10) {
			const updatedValue: UpdatedValue = UpdatedValue.Level;
			const munchkin: Munchkin = { ...this.munchkin };
			munchkin.level = level;
			this.updateMunchkin(munchkin, updatedValue);
		}
	}
	updateGear(gear: number): void {
		if (gear >= 0) {
			const updatedValue: UpdatedValue = UpdatedValue.Gear;
			const munchkin: Munchkin = { ...this.munchkin };
			munchkin.gear = gear;
			this.updateMunchkin(munchkin, updatedValue);
		}
	}
	toggleGender(): void {
		const updatedValue: UpdatedValue = UpdatedValue.Gender;
		const munchkin: Munchkin = { ...this.munchkin };
		if (munchkin.gender === 0) {
			munchkin.gender = 1;
		} else {
			munchkin.gender = 0;
		}
		this.updateMunchkin(munchkin, updatedValue);
	}
	toggleHalfbreed(): void {
		if (
			this.munchkin.races.length === 0 ||
			(!this.munchkin.halfbreed && this.munchkinRaceOne.mRace === Race.Human)
		) {
			//TODO show toast with reason
			return;
		}
		const updatedValue: UpdatedValue = UpdatedValue.Halfbreed;
		const munchkin: Munchkin = { ...this.munchkin };
		munchkin.halfbreed = !munchkin.halfbreed;
		this.updateMunchkin(munchkin, updatedValue);
	}
	updateRace(index: number): void {
		const newRace: Race =
			index === 0 ? this.munchkinRaceOne.mRace : this.munchkinRaceTwo.mRace;
		MunchkinService.updateMunchkinRace(this.munchkin, index, newRace).then(
			(res: AxiosResponse) => {
				if (!!res && res.status === 200) {
					this.error = null;
					this.munchkin = res.data;
					this.$socket.client.emit("updateMunchkin", this.lobby, this.munchkin);
				}
			}
		);
	}
	toggleSupermunchkin(): void {
		if (this.munchkin.classes.length === 0) {
			//TODO show toast with reason
			return;
		}
		const updatedValue: UpdatedValue = UpdatedValue.Supermunchkin;
		const munchkin: Munchkin = { ...this.munchkin };
		munchkin.supermunchkin = !munchkin.supermunchkin;
		this.updateMunchkin(munchkin, updatedValue);
	}
	updateClass(index: number): void {
		const newClass: Class | -1 =
			index === 0 ? this.munchkinClassOne.mClass : this.munchkinClassTwo.mClass;
		if (newClass === -1) {
			return this.deleteClass(index);
		}
		MunchkinService.updateMunchkinClass(this.munchkin, index, newClass).then(
			(res: AxiosResponse) => {
				if (!!res && res.status === 200) {
					this.error = null;
					this.munchkin = res.data;
					this.$socket.client.emit("updateMunchkin", this.lobby, this.munchkin);
				}
			}
		);
	}
	deleteClass(index: number): void {
		MunchkinService.deleteMunchkinClass(this.munchkin, index).then(
			(res: AxiosResponse) => {
				if (!!res && res.status === 200) {
					this.error = null;
					this.munchkin = res.data;
					this.$socket.client.emit("updateMunchkin", this.lobby, this.munchkin);
				}
			}
		);
	}

	updateMunchkin(munchkin: Munchkin, updatedValue: UpdatedValue): void {
		MunchkinService.updateMunchkin(munchkin, updatedValue).then(
			(res: AxiosResponse) => {
				if (!!res && res.status === 200) {
					this.error = null;
					this.munchkin = res.data;
					this.$socket.client.emit("updateMunchkin", this.lobby, this.munchkin);
				} else {
					this.error = res.data;
				}
			}
		);
	}

	showDetails(value: any) {
		if (value === "Halfbreed" || value === "Supermunchkin") {
			this.detailModal.name = value;
			if (value === "Halfbreed") {
				this.detailModal.descriptions = [
					"You may have two race cards, and have all the advantages and disadvantages of each.",
					"Or you may have one race card and have all of its advantages and none of its disadvantages (for example, monsters that hate elves will have no bonus against a half-elf).",
					"Lose this card if you lose your race cards."
				];
			} else {
				this.detailModal.descriptions = [
					"You may have two class cards, and have all of the advantages and disadvantages of each.",
					"Or you may have one class card and have all of its advantages and none of its disadvantages (for example, monsters that hate clerics will have no bonus against a super cleric).",
					"Lose this card if you lose all your class cards."
				];
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

.action-icon {
	//TODO add fatfingermode in settings
	font-size: 1.5em;
	margin: 0 0.2em;
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

				&__actions {
					display: flex;
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
