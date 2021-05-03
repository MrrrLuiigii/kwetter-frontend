<template>
	<div class="profile">
		<KweetContainer class="profile__left" :propKweets="profile.kweets" />
		<div class="profile__right">
			<ProfileContainer :propProfile="profile" />
			<FollowContainer
				:propFollowers="profile.followers"
				:propFollowed="profile.followed"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

//components
import KweetContainer from "@/components/Kweet/KweetContainer.vue";
import ProfileContainer from "@/components/Profile/ProfileContainer.vue";
import FollowContainer from "@/components/Follow/FollowContainer.vue";

//services
import ProfileService from "@/services/profileService";

@Component({
	components: { KweetContainer, ProfileContainer, FollowContainer }
})
export default class ProfileView extends Vue {
	private error: string = "";

	get profile() {
		return this.$store.getters.getProfile;
	}

	created() {
		ProfileService.getProfile(this.$route.params.id)
			.then((res: any) => {
				this.error = "";
			})
			.catch((err: any) => {
				this.error = err.message;
			});
	}
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.profile {
	display: flex;

	&__left {
		width: 60%;
		margin-right: 1em;
	}

	&__right {
		width: 40%;
	}
}
</style>
