<template>
	<div class="container">
		<fa-icon class="container__feather" :icon="['fas', 'feather-alt']" />

		<div class="container__general">
			<div class="container__general__avatar">
				<img
					class="container__general__avatar__img"
					src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/user-512.png"
				/>
			</div>
			<div class="container__general__info">
				<h1>{{ profile.name }}</h1>
				<p>Web: {{ profile.web }}</p>
				<div>
					Trends:
					<span v-for="trend in profile.trends" :key="trend.id">{{
						trend.name
					}}</span>
				</div>
			</div>
		</div>
		<div class="container__bio">
			<p>Bio: {{ profile.bio }}</p>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class ProfileContainer extends Vue {
	private error: string = "";

	//TODO: type
	@Prop()
	propProfile: any;
	// propProfile: GeneralProfileInfo;

	get profile() {
		return this.propProfile;
	}
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.container {
	position: relative;
	padding: 1em;

	min-height: 20em;
	min-width: 40em;

	border: 4px solid color(app-font);
	border-radius: $border-radius;

	&__general {
		display: flex;
		margin-bottom: 1em;

		&__avatar {
			width: 8em;
			height: 8em;
			border: 4px solid color(app-font);
			border-radius: $border-radius-small;
			background-color: color(app-gray);

			&__img {
				width: 100%;
			}
		}

		&__info {
			text-align: left;
			padding: 0 1em;
		}
	}

	&__bio {
		display: flex;
		padding-top: 1em;
		border-top: 4px solid color(app-font);
	}

	&__feather {
		position: absolute;
		top: 0.5em;
		right: 0.5em;

		color: color(app-primary);
		font-size: 2em;
	}
}
</style>
