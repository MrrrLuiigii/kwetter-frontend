<template>
	<div v-if="user && profileId" class="home">
		<KweetContainer :isFeed="true" :profileId="profileId" class="home__left" />
		<div class="home__right"></div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

//components
import KweetContainer from "@/components/Kweet/KweetContainer.vue";

//models
import AuthVM from "@/models/viewmodels/auth.viewmodel";

@Component({ components: { KweetContainer } })
export default class HomeView extends Vue {
	get user(): AuthVM {
		return this.$store.getters["authModule/getUser"];
	}

	get profileId(): string {
		if (this.$route.params.id) return this.$route.params.id;

		const user = this.$store.getters["authModule/getUser"];
		const profile = this.$store.getters["profileModule/getProfile"];
		if (user && profile && user.username === profile.username)
			return profile.id;

		return undefined;
	}
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.home {
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
