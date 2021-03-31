<template>
	<div>
		<Navigation />
		Your account has been verified
		{{ user.username }}!
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
		if (
			this.$route.query.token &&
			this.$route.query.token === this.user.token
		) {
			AuthService.verify(this.user.token)
				.then(() => {
					console.log("VERIFIED");
					//TODO: route to home page
				})
				.catch(err => {});

			//TODO: verify the token and set account status to active in api
		}
	}
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";
</style>
