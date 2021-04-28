<template>
	<div class="kweet-card">
		<div class="profile">
			<div class="profile__frame">
				<img
					class="profile__frame__img"
					src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/user-512.png"
				/>
			</div>
			<div class="profile__date">{{ createdAt }}</div>
		</div>

		<hr class="horizontal-divider" />

		<div class="kweet">
			<h2 class="kweet__username">{{ kweet.profile.username }}</h2>
			<p class="kweet__text">
				{{ kweet.body }}
			</p>
			<div class="kweet__trends">
				<span
					class="kweet__trends__trend"
					v-for="trend in kweet.trends"
					:key="trend.id"
					>#{{ trend.name }}</span
				>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

//components
import TrendChip from "@/components/TrendChip.vue";

@Component({ components: { TrendChip } })
export default class Kweet extends Vue {
	//TODO: type
	@Prop()
	propKweet: any;

	get kweet() {
		return this.propKweet;
	}

	get createdAt() {
		const createdAt: string = this.propKweet.createdAt;
		const dateArray = new Date(createdAt).toLocaleString().split(", ");
		return [dateArray[1], dateArray[0]].join(" ");
	}
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.kweet-card {
	display: flex;
	width: 100%;
	min-width: 30em;
	height: 12em;
	padding: 1em;
	border-radius: $border-radius;
	background-color: color(app-gray);
}

.profile {
	display: flex;
	width: 7.6em;
	position: relative;

	&__frame {
		display: flex;

		background-color: color(app-background);
		border-radius: $border-radius-small;

		width: 90%;
		height: 6.84em;

		position: relative;

		&__img {
			position: absolute;
			top: 0;
			width: 100%;
		}
	}

	&__date {
		font-size: 0.75em;
		text-align: right;
		margin-right: 1em;

		position: absolute;
		bottom: 0;
	}
}

.horizontal-divider {
	height: 10em;
	width: 0.25em;
	background-color: color(app-font);
	border: none;
}

.kweet {
	display: flex;
	flex-direction: column;
	position: relative;

	text-align: left;
	width: 80%;
	padding: 0 1em;

	&__trends {
		display: flex;
		position: absolute;
		bottom: 0;

		width: calc(100% - 2em);
		overflow-x: auto;
		overflow-y: hidden;

		&__trend {
			color: color(app-accent);
			margin: 0.25em 0.5em;
		}
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
