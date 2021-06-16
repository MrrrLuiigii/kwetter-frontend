<template>
	<div class="container">
		<fa-icon class="container__feather" :icon="['fas', 'feather-alt']" />
		<h1>What's happening?</h1>
		<p v-if="error !== ''" class="errorMsg">{{ error }}</p>
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
		<div>
			<span class="tip">
				Tip: to mention a user type <span class="highlight">@</span> followed by
				the <span class="highlight">username</span>!
			</span>
			<div class="body">
				<div
					ref="kweet-body"
					@keyup="setMentions"
					class="input-body input-primary"
				></div>
				<textarea
					@keyup="setMentions"
					v-model.trim="kweet.body"
					maxlength="140"
					class="input-body input-primary hidden-input"
					placeholder="Place a Kweet..."
				/>
				<span class="body__length">({{ kweet.body.length }}/140)</span>
			</div>
		</div>

		<button class="button-primary post-button" @click="placeKweet">
			Place Kweet
		</button>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import escape from "escape-html";

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

	setMentions(e: {
		target: { value: string; innerText: string; innerHtml: string };
	}) {
		const value = e.target.value;
		this.kweet.mentions = [];

		[...value.matchAll(/@[^\s]+/g)].forEach(mention => {
			this.kweet.mentions.push(mention[0]);
		});

		const words = value.split(" ");
		for (let i = 0; i < words.length; i++) {
			if (this.kweet.mentions.indexOf(words[i]) > -1) {
				words[
					i
				] = `<span class="mention" style="color: #bb0a21;">${words[i]}</span>`;
			} else {
				words[i] = escape(words[i]);
			}
		}
		const bodyDiv = this.$refs["kweet-body"] as HTMLElement;
		if (this.kweet.body.length) bodyDiv.innerHTML = words.join(" ");
		else bodyDiv.innerHTML = "";
	}

	placeKweet() {
		if (this.kweet.body === "")
			return (this.error = "You can not place an empty Kweet...");

		this.kweet.body.trim();
		this.kweet.body = this.kweet.body.replace(/[\r\n\v]+/g, " ");
		KweetService.postKweet(this.kweet)
			.then((res: any) => {
				this.error = "";
				this.trend = "";
				this.kweet = {
					profileId: this.$store.getters["profileModule/getProfile"].id,
					body: "",
					trends: [],
					mentions: []
				};
				const bodyDiv = this.$refs["kweet-body"] as HTMLElement;
				bodyDiv.innerHTML = "";
			})
			.catch((err: { message: string }) => {
				if (err && err.message) this.error = err.message;
			});
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

.body {
	position: relative;

	&__length {
		position: absolute;
		bottom: 1.25em;
		right: 1.25em;
		padding: 0.1em;
		background-color: color(app-gray);
		border-radius: $border-radius-small;
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
	outline: none;
	padding: 0.5em 1em 0 1em;
}

.hidden-input {
	position: absolute;
	top: 0;
	background-color: transparent;
	color: transparent;
	border-color: transparent;
	caret-color: color(app-font);
}

.highlight {
	color: color(app-accent);
}

.errorMsg {
	margin: 0;
}
</style>
