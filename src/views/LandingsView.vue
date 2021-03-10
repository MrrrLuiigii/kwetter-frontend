<template>
	<div class="flex">
		<div class="buttons">
			<button class="button-alt button-login" @click="landingPageType = 1">
				Login
			</button>
			<button class="button-primary button-signup" @click="landingPageType = 2">
				Sign up
			</button>
		</div>
		<GettingStarted v-if="pageType === 0" />
		<Login v-else-if="pageType === 1" />
		<Register v-else-if="pageType === 2" />
		<PostRegister v-else-if="pageType === 3" />
		<FeatherBackground />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

//enum
import LandingPageType from "../models/enums/LandingPageType";

//components
import FeatherBackground from "../components/FeatherBackground.vue";
import GettingStarted from "../components/GettingStarted.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import PostRegister from "../components/PostRegister.vue";

@Component({
	components: {
		FeatherBackground,
		GettingStarted,
		Login,
		Register,
		PostRegister
	}
})
export default class LandingsView extends Vue {
	private landingPageType: LandingPageType = LandingPageType.PostRegister;

	get pageType() {
		return this.landingPageType;
	}

	set pageType(pageType: LandingPageType) {
		this.landingPageType = pageType;
	}
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.flex {
	display: flex;
	justify-content: flex-end;
	align-items: center;
}

.buttons {
	position: absolute;
	top: 1em;
	right: 1em;
}

.buttons button {
	margin-left: 0.5em;
}
</style>
