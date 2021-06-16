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
				<div class="container__header__tab__name">
					Followers ({{ profile.followers ? profile.followers.length : 0 }})
				</div>
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
				<div class="container__header__tab__name">
					Following ({{ profile.following ? profile.following.length : 0 }})
				</div>
			</div>
		</div>
		<div v-if="tab === 0" class="container__items">
			<Follow
				v-for="follower in profile.followers"
				:key="follower.id"
				:follow="follower"
			/>
			<p v-if="profile.followers && profile.followers.length === 0">
				You have no followers yet...
			</p>
		</div>
		<div v-if="tab === 1" class="container__items">
			<Follow
				v-for="following in profile.following"
				:key="following.id"
				:follow="following"
			/>
			<p v-if="profile.following && profile.following.length === 0">
				You not following anyone yet...
			</p>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

//components
import Follow from "@/components/Follow/Follow.vue";

//services
import FollowService from "@/services/followService";

@Component({ components: { Follow } })
export default class FollowContainer extends Vue {
	private error: string;

	private tab: number = 1;
	changeTab(index: number) {
		this.tab = index;
	}

	@Prop()
	profileId: string;

	get profile() {
		return this.$store.getters["profileModule/getProfile"];
	}

	created() {
		this.getInitialFollows();
	}

	getInitialFollows(id?: string) {
		FollowService.getFollowsByProfileId(id ? id : this.profileId)
			.then((res: any) => {
				this.error = "";
			})
			.catch((err: { message: string }) => {
				if (err && err.message) this.error = err.message;
			});
	}

	@Watch("$route.params.id")
	onPropertyChanged(value: string) {
		this.getInitialFollows(value);
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
	margin-top: 1em;

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
		gap: 1em;
		max-height: 20em;
		overflow-y: auto;
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
