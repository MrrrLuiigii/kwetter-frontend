<template>
	<div class="welcome-back">
		<h1>Welcome Back <br />{{ username }}!</h1>
		<router-link :to="{ name: 'Home' }">
			<fa-icon class="feather" :icon="['fas', 'feather-alt']" />
			Proceed to the home page!
		</router-link>
		<div class="welcome-back__img">
			<img
				class="welcome-back__img"
				src="../../assets/images/chat-balloons.svg"
				alt="Chat balloons"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import FeatherBackground from "@/components/FeatherBackground.vue";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({ components: { FeatherBackground } })
export default class WelcomeBack extends Vue {
	@Prop()
	username!: string;
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.welcome-back {
	display: flex;
	flex-direction: column;
	width: 40vw;
	text-align: left;
	&__img {
		width: 75%;
		margin-left: 15%;
	}
}

.welcome-back h1 {
	font-size: 4vw;
}

.welcome-back a {
	text-decoration: none;
	color: color(app-primary);
	font-size: 1.5vw;
}

.feather {
	transform: rotate(45deg);
}
</style>
