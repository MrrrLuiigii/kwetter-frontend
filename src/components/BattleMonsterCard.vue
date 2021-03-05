<template>
	<div class="monster">
		<div class="squareButtonSmall deleteButton" @click="deleteMonster">
			<fa-icon class="closeIcon" :icon="['fas', 'times']" />
		</div>
		<div class="monster__level">
			<div>Level:</div>
			<div>
				<NumberInput
					:propValue="monster.level"
					:propMin="1"
					@valueChanged="levelChanged"
				/>
			</div>
		</div>
		<div class="monster__modifier">
			<div>Modifier:</div>
			<NumberInput
				:propValue="monster.modifier"
				@valueChanged="modifierChanged"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

//components
import NumberInput from "@/components/inputs/NumberInput.vue";

//models
import Monster from "@/models/Monster";

@Component({ components: { NumberInput } })
export default class BattleMonsterCard extends Vue {
	@Prop()
	propMonster!: Monster;

	get monster(): Monster {
		return this.propMonster;
	}

	levelChanged(level: number) {
		console.log(level);
	}

	modifierChanged(modifier: number) {
		console.log(modifier);
	}

	deleteMonster() {
		this.$emit("deleteMonster", this.monster.id);
	}
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.deleteButton {
	position: absolute;
	right: -0.3em;
	top: -0.3em;
}

.closeIcon {
	font-size: 0.75em;
	margin: 0 0 0.15em 0;
}

.monster {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	margin: 0.5em;
	padding: 0.5em;
	width: 7.5em;

	background-color: color(primary);
	border: 2px solid color(font);
	border-radius: $border-radius;

	&__level {
		margin: 0 0 1em 0;
	}
}
</style>
