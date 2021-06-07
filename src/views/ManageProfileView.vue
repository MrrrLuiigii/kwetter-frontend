<template>
	<div v-if="profileId" class="profile">
		<div class="profile__left">
			<ProfileContainer />
		</div>
		<KweetContainer class="profile__right" :profileId="profileId" />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

//components
import KweetContainer from "@/components/Kweet/KweetContainer.vue";
import ProfileContainer from "@/components/Profile/ProfileContainer.vue";

//services
import ProfileService from "@/services/profileService";

@Component({
	components: { KweetContainer, ProfileContainer }
})
export default class ManageProfileView extends Vue {
	private error: string = "";

	get profileId(): string {
		const user = this.$store.getters["authModule/getUser"];
		return user.profileId;
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
		width: 40%;
		margin-right: 1em;
		//TODO: overflow-y
	}

	&__right {
		width: 60%;
	}
}
</style>
