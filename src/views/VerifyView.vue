<template>
	<div>
		Your account has been verified
		{{ user.username }}!

		<div>
			Proceed to <router-link :to="{ name: 'Home' }">Home</router-link>!
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

//viewmodels
import AuthVM from "@/models/viewmodels/auth.viewmodel";

//services
import AuthService from "@/services/authService";

@Component
export default class VerifyView extends Vue {
	get user(): AuthVM {
		return this.$store.getters["authModule/getUser"];
	}

	created() {
		if (this.$route.query.token) {
			AuthService.verify().catch((err: any) => {
				//TODO: show error with verify
			});
		}
	}
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";
</style>
