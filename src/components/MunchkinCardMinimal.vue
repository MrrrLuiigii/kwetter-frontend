<template>
	<div class="munchkin">
		<div class="munchkin__name">
			{{ munchkin.name }}
		</div>
		<div class="munchkin__gender">
			<fa-icon v-if="munchkin.gender === 0" :icon="['fas', 'male']" />
			<fa-icon v-else :icon="['fas', 'female']" />
		</div>
	</div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Munchkin from "@/models/Munchkin";
import { Vue, Prop } from "vue-property-decorator";
import Gender from "@/models/enums/Gender";

@Component
export default class MunchkinCardMinimal extends Vue {
	@Prop()
	propMunchkin!: Munchkin;

	get munchkin(): Munchkin {
		return this.propMunchkin;
	}
}
</script>

<style lang="scss" scoped>
//TODO make scaleble
.munchkin {
	display: flex;
	justify-content: space-between;
	width: 90vw;

	margin: 0.5em;
	padding: 0.5em;
	font-size: 2em;

	background-color: color(primary);
	border: 2px solid color(font);
	border-radius: $border-radius;

	@include tablet {
		width: 50vw;
	}

	@include desktop {
		width: 30vw;
	}

	&__name {
		float: left;
	}

	&__gender {
		display: inline-block;
		vertical-align: middle;
	}
}
</style>
