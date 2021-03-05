<template>
	<div class="inputContainer">
		<fa-icon :icon="['fas', 'minus']" @click="changeValue(-1)" />
		<input
			id="input"
			class="inputContainer__input"
			type="number"
			:min="propMin"
			:max="propMax"
			:step="propStep"
			:value="value"
			@change="e => changeValue(parseInt(e.target.value), true)"
		/>
		<fa-icon :icon="['fas', 'plus']" @click="changeValue(1)" />
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class NumberInput extends Vue {
	private inputValue: number = 1;

	constructor() {
		super();
		this.inputValue = this.propValue;
	}

	@Prop()
	propValue!: number;

	@Prop()
	propMin!: number;

	@Prop()
	propMax!: number;

	@Prop()
	propStep!: number;

	get value(): number {
		return this.inputValue;
	}

	set value(value: number) {
		this.inputValue = value;
	}

	changeValue(value: number, absolute: boolean = false) {
		if (isNaN(value)) return;
		if (absolute) {
			if (this.propMin && value < this.propMin) return;
			if (this.propMax && value > this.propMin) return;
			this.value = +value;
			this.$emit("valueChanged", this.value);
			return;
		}

		// TODO: on invalid input value -> overwrite user input and display origional value again

		let modifier: number;
		if (value === -1) modifier = this.propStep ? this.propStep : -1;
		else modifier = this.propStep ? this.propStep : 1;

		const newValue: number = this.value + modifier;

		if (
			(this.propMin && newValue < this.propMin) ||
			(this.propMax && newValue > this.propMax)
		)
			return;
		this.value = newValue;
		this.$emit("valueChanged", this.value);
	}
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.inputContainer {
	display: flex;
	align-items: center;

	&__input {
		width: 3em;

		text-align: center;
		padding: 0.2em 0.1em 0;
		margin: 0 0.25em;

		outline: none;
	}
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

/* Firefox */
input[type="number"] {
	-moz-appearance: textfield;
}
</style>
