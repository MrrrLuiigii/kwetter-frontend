<template>
	<div v-if="user && profileId" class="home">
		<KweetContainer :isFeed="true" :profileId="profileId" class="home__left" />
		<div class="home__right">
			<PostKweet />
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

//components
import KweetContainer from "@/components/Kweet/KweetContainer.vue";
import PostKweet from "@/components/Kweet/PostKweet.vue";

//models
import AuthVM from "@/models/viewmodels/auth.viewmodel";

@Component({ components: { KweetContainer, PostKweet } })
export default class HomeView extends Vue {
	get user(): AuthVM {
		return this.$store.getters["authModule/getUser"];
	}

	get profileId(): string {
		if (this.$route.params.id) return this.$route.params.id;

		const user = this.$store.getters["authModule/getUser"];
		if (user && user.profileId) return user.profileId;

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
		//TODO: overflow-y
		width: 40%;
	}
}
</style>
