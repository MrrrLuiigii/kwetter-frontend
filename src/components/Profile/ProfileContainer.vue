<template>
	<div class="container">
		<fa-icon class="container__feather" :icon="['fas', 'feather-alt']" />

		<div class="container__general">
			<div class="container__general__info"></div>
			<div class="container__general__avatar"></div>
		</div>
		<div class="container__bio">
			<p>{{ profile.bio }}</p>
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
	&__general {
		display: flex;
	}

	&__bio {
		display: flex;
	}
}
</style>
