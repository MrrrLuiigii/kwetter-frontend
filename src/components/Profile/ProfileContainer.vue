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
				<h1 class="container__general__info__username">
					{{ profile.username }}
				</h1>
				<p class="container__general__info__name">{{ profile.name }}</p>
				<p
					class="container__general__info__web"
					@click="showExternalLinkModal = true"
				>
					{{ profile.web }}
				</p>
			</div>
			<button
				v-if="ownProfile && $route.name === 'ManageProfile'"
				@click="showDeleteProfileModal = true"
				class="button-accent-small container__general__follow"
			>
				Delete profile
			</button>
			<button
				v-else-if="ownProfile && $route.name !== 'ManageProfile'"
				@click="$router.replace({ name: 'ManageProfile' })"
				class="button-primary-small container__general__follow"
			>
				Settings
				<fa-icon class="feather feather-stroke" :icon="['fas', 'user-cog']" />
			</button>
			<button
				v-else-if="!ownProfile && isFollowing === false"
				@click="follow"
				class="button-primary-small container__general__follow"
			>
				Follow
			</button>
			<button
				v-else-if="!ownProfile && isFollowing === true"
				@click="unfollow"
				class="button-accent-small container__general__follow"
			>
				Unfollow
			</button>
		</div>
		<div
			class="container__bio"
			v-if="profile.bio.length || profile.trends.length"
		>
			<p>{{ profile.bio }}</p>
			<div class="container__bio__trends">
				<span
					class="container__bio__trends__trend"
					v-for="trend in profile.trends"
					:key="trend.id"
					>#{{ trend.name }}</span
				>
			</div>
		</div>

		<Modal
			v-if="showExternalLinkModal"
			@close="
				confirm =>
					confirm ? routeToExternal() : (showExternalLinkModal = false)
			"
		>
			<template v-slot:header>
				External link
			</template>
			<template v-slot:body>
				Are you sure you want to proceed? You will be routed to
				<span class="external-link">{{ profile.web }}</span
				>.
			</template>
			<template v-slot:confirm>
				Proceed
			</template>
		</Modal>

		<Modal
			:typeConfirm="profile.id.substr(0, 10)"
			v-if="showDeleteProfileModal"
			@close="
				confirm =>
					confirm ? deleteProfile() : (showDeleteProfileModal = false)
			"
		>
			<template v-slot:header>
				Delete profile
			</template>
			<template v-slot:body>
				Are you sure you want to delete your profile? This action is
				irreversible. All your Kweets, likes and follows will be deleted and you
				will no longer have access to Kwetter.
			</template>
			<template v-slot:confirm>
				Delete
			</template>
		</Modal>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

//components
import Modal from "@/components/Modal.vue";

//services
import FollowService from "@/services/followService";
import ProfileService from "@/services/profileService";

@Component({ components: { Modal } })
export default class ProfileContainer extends Vue {
	private error: string = "";

	private isFollowing: boolean = false;
	private showExternalLinkModal: boolean = false;
	private showDeleteProfileModal: boolean = false;

	get profile() {
		return this.$store.getters["profileModule/getProfile"];
	}

	get profileId() {
		return this.$route.params.id ? this.$route.params.id : this.profile.id;
	}

	get user() {
		return this.$store.getters["authModule/getUser"];
	}

	get ownProfile() {
		const profileId: string = this.$route.params.id
			? this.$route.params.id
			: this.profile.id;
		return profileId === this.user.profileId ? true : false;
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
				if (err && err.message) this.error = err.message;
			});
	}

	follow() {
		FollowService.follow(this.user.profileId, this.profileId)
			.then(() => {
				this.error = "";
				this.getIsFollowing();
			})
			.catch((err: { message: string }) => {
				if (err && err.message) this.error = err.message;
			});
	}

	unfollow() {
		FollowService.unfollow(this.user.profileId, this.profileId)
			.then(() => {
				this.error = "";
				this.getIsFollowing();
			})
			.catch((err: { message: string }) => {
				if (err && err.message) this.error = err.message;
			});
	}

	routeToExternal() {
		this.showExternalLinkModal = false;
		const url: string =
			this.profile.web.startsWith("http://") ||
			this.profile.web.startsWith("https://")
				? this.profile.web
				: `http://${this.profile.web}`;
		window.location.href = url;
	}

	deleteProfile() {
		this.showDeleteProfileModal = false;
		ProfileService.deleteProfile(this.profileId).catch(() => {});
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

			&__username {
				color: color(app-primary);
			}

			&__web {
				text-decoration: underline;
			}

			&__web:hover {
				cursor: pointer;
				color: color(app-accent);
			}
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
		padding: 1em;

		border-radius: $border-radius-small;
		background-color: color(app-gray);

		&__trends {
			display: flex;
			column-gap: 1em;

			&__trend {
				color: color(app-accent);
			}
		}
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
