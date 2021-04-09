<template>
	<div>
		<KweetContainer :propKweets="profile.kweets" />
		<ProfileContainer :propProfile="profile" />
		{{ profile }}
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

//components
import KweetContainer from "@/components/Kweet/KweetContainer.vue";
import ProfileContainer from "@/components/Profile/ProfileContainer.vue";

//services
import ProfileService from "@/services/profileService";

@Component({ components: { KweetContainer, ProfileContainer } })
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
</style>
