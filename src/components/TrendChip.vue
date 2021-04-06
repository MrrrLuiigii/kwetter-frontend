<template>
	<div class="chip">
		<div>{{ propChipName }}</div>
		<div class="chip__remove" @click="removeChip">
			<fa-icon :icon="['fas', 'times']" />
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class TrendChip extends Vue {
	@Prop()
	propChipName: string;

	removeChip() {
		this.$emit("trendRemoved", this.propChipName);
	}
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.chip {
	margin: 0.25em;

	&__remove {
		cursor: pointer;
	}
}
</style>
