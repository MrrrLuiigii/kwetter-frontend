<template>
	<div class="container">
		<div class="container__header">
			<div
				class="container__header__tab"
				@click="changeTab(0)"
				:inactive="tab === 1"
			>
				<fa-icon
					class="container__header__tab__feather"
					:icon="['fas', 'feather-alt']"
				/>
				<div class="container__header__tab__name">@Mentions</div>
			</div>
			<div
				class="container__header__tab"
				@click="changeTab(1)"
				:inactive="tab === 0"
			>
				<fa-icon
					class="container__header__tab__feather"
					:icon="['fas', 'feather-alt']"
				/>
				<div class="container__header__tab__name">Kweets</div>
			</div>
		</div>
		<div v-if="kweets.length === 0">No Kweets yet...</div>
		<div v-else-if="tab === 0" class="container__items">
			<!-- TODO: show kweets where profile got mentioned -->
			<Kweet v-for="kweet in kweets" :key="kweet.id" :propKweet="kweet" />
		</div>
		<div v-if="tab === 1" class="container__items">
			<Kweet v-for="kweet in kweets" :key="kweet.id" :propKweet="kweet" />
		</div>
		<infinite-loading @infinite="getMoreKweets"></infinite-loading>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import InfiniteLoading from "vue-infinite-loading";

//components
import Kweet from "@/components/Kweet/Kweet.vue";

@Component({ components: { Kweet, InfiniteLoading } })
export default class KweetContainer extends Vue {
	//TODO: type
	@Prop()
	propKweets: any[];

	private tab: number = 1;
	changeTab(index: number) {
		this.tab = index;
	}

	get kweets() {
		return this.propKweets;
	}

	get mentionKweets() {
		return this.propKweets;
	}

	getMoreKweets($state) {
		console.log($state);
		// TODO load more
	}
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.container {
	position: relative;
	padding: 1em;
	border: 4px solid color(app-font);
	border-radius: $border-radius;
	height: 85vh;

	&__header {
		display: flex;
		justify-content: flex-end;

		&__tab {
			display: flex;
			align-items: center;
			margin-left: 1em;
			font-size: 2em;
			color: color(app-primary);
			cursor: pointer;
		}

		&__tab[inactive] {
			color: color(app-font);
		}

		&__tab[inactive] > .container__header__tab__feather {
			color: color(app-background);
		}
	}

	&__items {
		padding-right: 0.5em;
		display: flex;
		flex-direction: column;
		height: calc(99% - 2em);
		overflow-y: auto;
		gap: 1em;
	}

	&__feather {
		position: absolute;
		top: 0.5em;
		right: 0.5em;
		color: color(app-primary);
		font-size: 2em;
	}
}

::-webkit-scrollbar {
	width: 10px;
	height: 10px;
}
::-webkit-scrollbar-track {
	background-color: color(app-background);
	border-radius: 7px 0 7px 7px;
}
::-webkit-scrollbar-thumb {
	background-color: color(app-primary);
	border: 2px solid color(app-font);

	border-radius: 7px 0 7px 7px;
}
</style>
