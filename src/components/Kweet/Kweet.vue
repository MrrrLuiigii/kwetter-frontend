<template>
	<div class="kweet-container">
		<div class="profile">
			{{/*TODO: photo */}}
			{{/*TODO: posted ... ago */}}
		</div>

		<hr class="horizontal-divider" />

		<div class="kweet">
			<h1 class="kweet__username">{{ kweet.profile.username }}</h1>
			<div></div>
			<div class="trends"></div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Kweet extends Vue {
	//TODO: type
	@Prop()
	propKweet: any;

	get kweet() {
		return { profile: { username: "Username" } };
	}
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.kweet-container {
	display: flex;
	width: 45em;
	height: 15em;

	margin: 0.5em;
	padding: 1em;

	border-radius: $border-radius;
	background-color: color(app-gray);
}

.profile {
	display: flex;
	width: 20%;
}

.horizontal-divider {
	height: 13em;
	width: 0.25em;
	background-color: color(app-font);
	border: none;
}

.kweet {
	display: flex;
	width: 70%;
	padding: 0 0.5em;
}
</style>
