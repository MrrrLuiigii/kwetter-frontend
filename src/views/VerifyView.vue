<template>
	<div>
		<Navigation />
		Your account has been verified
		{{ user.username }}!

		<div>
			Proceed to <router-link :to="{ name: 'Home' }">Home</router-link>!
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

//components
import Navigation from "@/components/Navigation.vue";

//viewmodels
import AuthVM from "@/models/auth.viewmodel";

//services
import AuthService from "@/services/authService";

@Component({
	components: { Navigation }
})
export default class VerifyView extends Vue {
	get user(): AuthVM {
		return this.$store.getters.getUser;
	}

	created() {
		console.log("created");

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
