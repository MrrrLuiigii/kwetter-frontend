<template>
	<div class="logo">
		<img class="logo__icon" alt="MunchKing Logo" src="@/assets/logo.svg" />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Logo extends Vue {}
</script>

<style lang="scss" scoped>
.logo {
	width: 100vw;
	margin: 4em 0;
	line-height: 3em;

	@include smallScreen {
		margin: 2em 0;
	}

	&__icon {
		height: 20vh;
		margin-bottom: -1.5em;
	}
}
</style>
