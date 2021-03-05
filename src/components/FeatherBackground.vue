<template>
	<div class="feather-container">
		<fa-icon class="feather feather-no-stroke" :icon="['fas', 'feather-alt']" />
		<fa-icon class="feather feather-stroke" :icon="['fas', 'feather-alt']" />
		<div class="background"></div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class FeatherBackground extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.feather-container {
	position: absolute;
	top: 0;
	left: 0;

	z-index: 0;
}

.background {
	position: absolute;
	left: 0;
	top: 0;

	width: 0;
	height: 0;
	border-top: 100vh solid color(app-primary);
	border-right: 100vh solid transparent;
}

.feather {
	font-size: 100vh;
	color: color(app-primary);

	text-shadow: 0 0 3px #000;

	position: absolute;
	left: 0;
}

.feather-stroke path {
	stroke: color(app-background);
	stroke-width: 35px;
}

.feather-stroke {
	z-index: 1;
}

.feather-no-stroke {
	z-index: 2;
}
</style>
