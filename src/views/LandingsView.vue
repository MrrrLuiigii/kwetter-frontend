<template>
	<div class="flex">
		<div v-if="!user" class="buttons">
			<button
				v-if="landingPageType === 0 || landingPageType === 2"
				class="button-alt button-login"
				@click="landingPageType = 1"
			>
				Login
			</button>
			<button
				v-if="landingPageType === 0 || landingPageType === 1"
				class="button-primary button-signup"
				@click="landingPageType = 2"
			>
				Sign up
			</button>
		</div>
		<WelcomeBack v-if="user" :username="user.username" />
		<div v-else>
			<GettingStarted v-if="pageType === 0" />
			<Login v-else-if="pageType === 1" />
			<Register @registered="register" v-else-if="pageType === 2" />
			<PostRegister :propUsername="username" v-else-if="pageType === 3" />
		</div>
		<FeatherBackground />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

//enum
import LandingPageType from "@/models/enums/LandingPageType";

//components
import FeatherBackground from "@/components/FeatherBackground.vue";
import GettingStarted from "@/components/GettingStarted/GettingStarted.vue";
import Login from "@/components/GettingStarted/Login.vue";
import Register from "@/components/GettingStarted/Register.vue";
import PostRegister from "@/components/GettingStarted/PostRegister.vue";
import WelcomeBack from "@/components/GettingStarted/WelcomeBack.vue";
import { AccountStatus } from "@/models/enums/auth.enum";

@Component({
	components: {
		FeatherBackground,
		GettingStarted,
		Login,
		Register,
		PostRegister,
		WelcomeBack
	}
})
export default class LandingsView extends Vue {
	private landingPageType: LandingPageType = LandingPageType.GettingStarted;
	get pageType() {
		return this.landingPageType;
	}
	set pageType(pageType: LandingPageType) {
		this.landingPageType = pageType;
	}

	private propUsername: string = "";
	get username(): string {
		return this.propUsername;
	}
	set username(username) {
		this.propUsername = username;
	}

	//TODO: type
	get user(): any {
		const user = this.$store.getters["authModule/getUser"];
		if (!user || user.status === AccountStatus.Pending) return undefined;
		return this.$store.getters["authModule/getUser"];
	}

	register(username: string) {
		this.username = username;
		this.pageType = LandingPageType.PostRegister;
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
