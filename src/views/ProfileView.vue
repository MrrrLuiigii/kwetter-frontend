<template>
	<div v-if="profileId" class="profile">
		<KweetContainer class="profile__left" :profileId="profileId" />
		<div class="profile__right">
			<ProfileContainer />
			<FollowContainer :profileId="profileId" />
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

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
		return this.$store.getters["profileModule/getProfile"];
	}

	get profileId(): string {
		if (this.$route.params.id) return this.$route.params.id;

		const user = this.$store.getters["authModule/getUser"];
		if (user && user.profileId) return user.profileId;

		return undefined;
	}

	async created() {
		this.getProfile();
	}

	getProfile() {
		ProfileService.getProfile(this.profileId)
			.then((res: any) => {
				this.error = "";
			})
			.catch((err: { message: string }) => {
				if (err && err.message) this.error = err.message;
			});
	}

	@Watch("$route.params.id")
	onPropertyChanged() {
		this.getProfile();
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
		//TODO: overflow-y
		width: 40%;
	}
}
</style>
