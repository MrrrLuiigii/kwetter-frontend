<template>
	<div class="container">
		<fa-icon class="container__feather" :icon="['fas', 'feather-alt']" />
		<h1>What's happening?</h1>
		<div class="trends">
			<p class="noTrendsMsg" v-if="kweet.trends.length === 0">
				You have not linked any trends yet...
			</p>
			<div v-else class="trends__trendContainer">
				<TrendChip
					@trendRemoved="removeTrend"
					v-for="trend in kweet.trends"
					:key="trend"
					:propChipName="trend"
				/>
			</div>
			<input
				v-if="kweet.trends.length < 5"
				v-model.trim="trend"
				@keypress.enter="addTrend"
				class="input-primary"
				type="text"
				placeholder="Trend..."
			/>
		</div>
		<textarea
			v-model.trim="kweet.body"
			class="input-body input-primary"
			placeholder="Place a Kweet..."
		/>
		<button class="button-primary" @click="placeKweet">Place Kweet</button>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

//components
import TrendChip from "@/components/TrendChip.vue";

//services
import KweetService from "@/services/kweetService";

//models
import { PostKweetRequest } from "@/models/dto/kweet.dto";

@Component({ components: { TrendChip } })
export default class PostKweet extends Vue {
	private error: string = "";

	private trend: string = "";

	private kweet: PostKweetRequest = {
		profileId: this.$store.getters["profileModule/getProfile"].id,
		body: "",
		trends: [],
		mentions: []
	};

	addTrend() {
		const trend = this.trend.toLowerCase();

		if (this.kweet.trends.length >= 5)
			return (this.error = "You can not have more than 5 trends...");
		if (trend.indexOf(" ") >= 0)
			return (this.error = "Trend can not contain whitespaces...");
		if (this.kweet.trends.includes(trend))
			return (this.error = "You can not have duplicate trends...");

		this.kweet.trends.push(trend);
		if (this.kweet.trends.length >= 5)
			document.querySelector("textarea").focus();

		this.trend = "";
		this.error = "";
	}

	removeTrend(trend: string) {
		this.kweet.trends = this.kweet.trends.filter(t => t !== trend);
	}

	placeKweet() {
		if (this.kweet.body === "")
			return (this.error = "You can not place an empty Kweet...");

		KweetService.postKweet(this.kweet)
			.then((res: any) => {
				this.error = "";
			})
			.catch((err: { message: string }) => {
				this.error = err.message;
			});

		this.kweet = {
			profileId: this.$store.getters["profileModule/getProfile"].id,
			body: "",
			trends: [],
			mentions: []
		};
		this.trend = "";
	}
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.container {
	display: flex;
	flex-direction: column;
	position: relative;
	padding: 1em;
	border: 4px solid color(app-font);
	border-radius: $border-radius;
	height: calc(42vh - 4px);
	text-align: left;
	gap: 1em;

	&__feather {
		position: absolute;
		top: 0.5em;
		right: 0.5em;
		color: color(app-primary);
		font-size: 2em;
	}
}

.trends {
	&__trendContainer {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		width: 100%;
	}
}

.input-primary {
	width: 100%;
}

.noTrendsMsg {
	margin: 0.25em;
}

.input-body {
	height: 7.5em;
}
</style>
