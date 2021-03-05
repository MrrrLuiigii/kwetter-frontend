<template>
	<button class="diceButton squareButton" @click="rollDice">
		<fa-icon
			class="fa-icon dice-icon"
			:class="{ clicked: dice.clicked }"
			:icon="['fas', dice.icon]"
		/>
	</button>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Dice extends Vue {
	private dice: {
		value: number;
		icon: string;
		clicked: boolean;
	};

	private activeCount: number;

	constructor() {
		super();
		this.dice = {
			value: 0,
			icon: "dice",
			clicked: false
		};
		this.activeCount = 0;
	}

	rollDice() {
		this.activeCount += 1;
		this.dice.value = Math.floor(Math.random() * 6 + 1);
		this.dice.clicked = true;

		switch (this.dice.value) {
			case 1:
				this.dice.icon = "dice-one";
				break;
			case 2:
				this.dice.icon = "dice-two";
				break;
			case 3:
				this.dice.icon = "dice-three";
				break;
			case 4:
				this.dice.icon = "dice-four";
				break;
			case 5:
				this.dice.icon = "dice-five";
				break;
			case 6:
				this.dice.icon = "dice-six";
				break;
			default:
				this.dice.icon = "dice";
				break;
		}
		this.resetDice();
	}

	resetDice() {
		setTimeout(() => {
			this.dice.clicked = false;
		}, 250);

		setTimeout(() => {
			this.activeCount -= 1;
			this.dice = {
				value: 0,
				icon: this.activeCount === 0 ? "dice" : this.dice.icon,
				clicked: this.dice.clicked
			};
		}, 10000);
	}
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.dice-icon {
	transition: transform 0.5s linear;
	transform: scale(1);
}

.clicked {
	transform: scale(0.5);
}
</style>
