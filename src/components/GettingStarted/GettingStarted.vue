<template>
	<div class="getting-started">
		<h1>Getting Started</h1>
		<p>Sign up today!</p>
		<div class="getting-started__img">
			<img
				class="getting-started__img"
				src="../../assets/images/chat-balloons.svg"
				alt="Chat balloons"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import FeatherBackground from "@/components/FeatherBackground.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({ components: { FeatherBackground } })
export default class GettingStarted extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.getting-started {
	display: flex;
	flex-direction: column;
	width: 40vw;
	text-align: left;
	&__img {
		width: 75%;
		margin-left: 15%;
	}
}

.getting-started h1 {
	font-size: 4vw;
}

.getting-started p {
	font-size: 2vw;
}
</style>
