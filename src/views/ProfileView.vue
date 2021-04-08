<template>
	<div>
		<KweetContainer :propKweets="kweets" />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import KweetContainer from "@/components/Kweet/KweetContainer.vue";

@Component({ components: { KweetContainer } })
export default class ProfileView extends Vue {
	public kweets: any[] = [
		{
			profile: { username: "Username" },
			kweet:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
			trends: ["Cool", "Awesome", "Yeet", "Mooi", "Kwetter", "Kweet"]
		}
	];
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";
</style>
