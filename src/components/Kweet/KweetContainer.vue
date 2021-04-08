<template>
	<div class="kweet-container">
		<div class="kweet-container__header">
			<!-- TODO: make into actual tabs -->
			<div class="kweet-container__header__tab" inactive>
				<fa-icon
					class="kweet-container__header__tab__feather"
					:icon="['fas', 'feather-alt']"
				/>
				<div class="kweet-container__header__tab__name">@Mentions</div>
			</div>
			<div class="kweet-container__header__tab">
				<fa-icon
					class="kweet-container__header__tab__feather"
					:icon="['fas', 'feather-alt']"
				/>
				<div class="kweet-container__header__tab__name">Kweets</div>
			</div>
		</div>
		<Kweet v-for="kweet in kweets" :key="kweet.id" :propKweet="kweet" />
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

//components
import Kweet from "@/components/Kweet/Kweet.vue";

@Component({ components: { Kweet } })
export default class KweetContainer extends Vue {
	//TODO: type
	@Prop()
	propKweets: any[];

	get kweets() {
		return this.propKweets;
	}
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.kweet-container {
	position: relative;

	margin: 2em;
	padding: 1em;

	width: 42.5em;

	border: 4px solid color(app-font);
	border-radius: $border-radius;

	&__header {
		display: flex;
		justify-content: flex-end;

		margin-right: 3em;

		&__tab {
			display: flex;
			align-items: center;

			margin-left: 1em;

			font-size: 2em;
			color: color(app-primary);
		}

		&__tab[inactive] {
			color: color(app-font);
		}

		&__tab[inactive] > .kweet-container__header__tab__feather {
			color: color(app-background);
		}
	}
}
</style>
