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
				<h1>{{ profile.username }}</h1>
				<p>Name: {{ profile.name }}</p>
				<p>Web: {{ profile.web }}</p>
			</div>
			<button
				v-if="showFollowButton && isFollowing === false"
				@click="follow"
				class="button-primary-small container__general__follow"
			>
				Follow
			</button>
			<button
				v-else-if="showFollowButton && isFollowing === true"
				@click="unfollow"
				class="button-accent-small container__general__follow"
			>
				Unfollow
			</button>
		</div>
		<div class="container__bio">
			<p>Bio: {{ profile.bio }}</p>
			<div>
				Trends:
				<span v-for="trend in profile.trends" :key="trend.id">{{
					trend.name
				}}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

//services
import FollowService from "@/services/followService";

@Component
export default class ProfileContainer extends Vue {
	private error: string = "";

	private isFollowing: boolean = false;

	get profile() {
		return this.$store.getters["profileModule/getProfile"];
	}

	get profileId() {
		return this.$route.params.id ? this.$route.params.id : this.profile.id;
	}

	get user() {
		return this.$store.getters["authModule/getUser"];
	}

	get showFollowButton() {
		const profileId: string = this.$route.params.id
			? this.$route.params.id
			: this.profile.id;
		return profileId === this.user.profileId ? false : true;
	}

	created() {
		this.getIsFollowing();
	}

	@Watch("$route.params.id")
	onPropertyChanged() {
		this.getIsFollowing();
	}

	getIsFollowing() {
		FollowService.isFollowing(this.user.profileId, this.profileId)
			.then((res: boolean) => {
				this.isFollowing = res;
			})
			.catch((err: { message: string }) => {
				this.error = err.message;
			});
	}

	follow() {
		FollowService.follow(this.user.profileId, this.profileId)
			.then(() => {
				this.error = "";
				this.getIsFollowing();
			})
			.catch((err: { message: string }) => {
				this.error = err.message;
			});
	}

	unfollow() {
		FollowService.unfollow(this.user.profileId, this.profileId)
			.then(() => {
				this.error = "";
				this.getIsFollowing();
			})
			.catch((err: { message: string }) => {
				this.error = err.message;
			});
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

	&__general {
		display: flex;
		margin-bottom: 1em;
		position: relative;

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

		&__follow {
			position: absolute;
			bottom: 0;
			right: 0;
		}
	}

	&__bio {
		display: flex;
		flex-direction: column;
		text-align: left;
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
