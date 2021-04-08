<template>
	<div class="kweet-card">
		<div class="profile">
			{{/*TODO: photo */}}
			{{/*TODO: posted ... ago */}}
		</div>

		<hr class="horizontal-divider" />

		<div class="kweet">
			<h2 class="kweet__username">{{ kweet.profile.username }}</h2>
			<p class="kweet__text">
				{{ kweet.kweet }}
			</p>
			<div class="kweet__trends">
				<span
					class="kweet__trends__trend"
					v-for="trend in kweet.trends"
					:key="trend"
					>#{{ trend }}</span
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
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.kweet-card {
	display: flex;
	width: 40em;
	height: 12em;

	// margin: 0.25em;
	padding: 1em;

	border-radius: $border-radius;
	background-color: color(app-gray);
}

.profile {
	display: flex;
	width: 20%;
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
</style>
