<template>
	<div class="container">
		<div class="container__header">
			<div
				v-if="!isFeed && $route.name !== 'ManageProfile'"
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
		<div v-if="tab === 1 && kweets.length === 0">No Kweets yet...</div>
		<div v-if="tab === 0 && mentionKweets.length === 0">No mentions yet...</div>
		<div v-else-if="tab === 0" class="container__items">
			<Kweet
				v-for="(kweet, index) in mentionKweets"
				:key="kweet.id"
				:kweet="kweet"
				@deleted="() => mentionKweets.splice(index, 1)"
			/>
			<infinite-loading
				v-if="moreMentionPages"
				@infinite="getMoreMentionKweets"
			></infinite-loading>
			<div v-else-if="mentionKweets.length > 0">No more mentions...</div>
		</div>
		<div v-if="tab === 1" class="container__items">
			<Kweet
				v-for="(kweet, index) in kweets"
				:key="kweet.id"
				:kweet="kweet"
				@deleted="() => kweets.splice(index, 1)"
			/>
			<infinite-loading
				v-if="morePages"
				@infinite="getMoreKweets"
			></infinite-loading>
			<div v-else-if="kweets.length > 0">No more Kweets...</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import InfiniteLoading from "vue-infinite-loading";

//models
import Kweet from "@/components/Kweet/Kweet.vue";

//services
import KweetService from "@/services/kweetService";

@Component({ components: { Kweet, InfiniteLoading } })
export default class KweetContainer extends Vue {
	private error: string = "";

	@Prop()
	profileId: string;

	@Prop({ default: false })
	isFeed: boolean;

	private tab: number = 1;
	changeTab(index: number) {
		this.tab = index;
	}

	get kweets() {
		return this.$store.getters["kweetModule/getKweets"];
	}

	get mentionKweets() {
		return this.$store.getters["kweetModule/getMentionKweets"];
	}

	get morePages() {
		const pagination: { skip: number; count: number } = this.$store.getters[
			"kweetModule/getPagination"
		];
		return pagination.count > pagination.skip;
	}

	get moreMentionPages() {
		const pagination: { skip: number; count: number } = this.$store.getters[
			"kweetModule/getMentionPagination"
		];
		return pagination.count > pagination.skip;
	}

	created() {
		if (this.isFeed) {
			this.getInitialMentionKweets();
			return this.getInitialFeed();
		}
		this.getInitialKweets();
	}

	getInitialKweets(id?: string) {
		this.$store.dispatch("kweetModule/resetPagination");
		KweetService.getKweetsByProfileId(id ? id : this.profileId)
			.then((res: any) => {
				this.error = "";
			})
			.catch((err: { message: string }) => {
				if (err && err.message) this.error = err.message;
			});
	}

	getInitialMentionKweets(id?: string) {
		this.$store.dispatch("kweetModule/resetMentionPagination");
		//TODO: get kweets by mention
		// KweetService.getKweetsByProfileId(id ? id : this.profileId)
		// 	.then((res: any) => {
		// 		this.error = "";
		// 	})
		// 	.catch((err: { message: string }) => {
		// 		if (err && err.message) this.error = err.message;
		// 	});
	}

	getMoreKweets($state: { complete: () => void; loaded: () => void }) {
		const profileId: string = this.$route.params.id
			? this.$route.params.id
			: this.profileId;
		this.$store.dispatch("kweetModule/pageUp");
		if (!this.morePages) $state.complete();
		else {
			KweetService.getKweetsByProfileId(profileId)
				.then(() => {
					this.error = "";
					$state.loaded();
				})
				.catch((err: { message: string }) => {
					if (err && err.message) this.error = err.message;
				});
		}
	}

	getMoreMentionKweets($state: { complete: () => void; loaded: () => void }) {
		const profileId: string = this.$route.params.id
			? this.$route.params.id
			: this.profileId;
		this.$store.dispatch("kweetModule/mentionPageUp");
		if (!this.moreMentionPages) $state.complete();
		//TODO: get kweets by mention
		else {
			// KweetService.getKweetsByProfileId(profileId)
			// 	.then(() => {
			// 		this.error = "";
			// 		$state.loaded();
			// 	})
			// 	.catch((err: { message: string }) => {
			// 		if (err && err.message) this.error = err.message;
			// 	});
		}
	}

	getInitialFeed(id?: string) {
		this.$store.dispatch("kweetModule/resetPagination");
		KweetService.getFeedByProfileId(id ? id : this.profileId)
			.then((res: any) => {
				this.error = "";
			})
			.catch((err: { message: string }) => {
				if (err && err.message) this.error = err.message;
			});
	}

	getMoreFeed($state: { complete: () => void; loaded: () => void }) {
		const profileId: string = this.$route.params.id
			? this.$route.params.id
			: this.profileId;
		this.$store.dispatch("kweetModule/pageUp");
		if (!this.morePages) $state.complete();
		else {
			KweetService.getFeedByProfileId(profileId)
				.then(() => {
					this.error = "";
					$state.loaded();
				})
				.catch((err: { message: string }) => {
					if (err && err.message) this.error = err.message;
				});
		}
	}

	@Watch("$route.params.id")
	onPropertyChanged(value: string) {
		if (!this.isFeed) this.getInitialKweets(value);
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
