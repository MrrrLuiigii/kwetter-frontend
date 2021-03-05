<template>
	<div>
		<Logo />
		<div class="loginOptions">
			<div class="loginOptions__header">
				Welcome! Log in with...
			</div>
			<button class="loginOptions__button rectangleButton" @click="socialLogin">
				<fa-icon
					class="loginOptions__button__icon fa-icon"
					:icon="['fab', 'google']"
				/>
				<div class="loginOptions__button__name">
					Google
				</div>
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import firebase from "firebase/app";
import "firebase/auth";
import User from "@/models/User";
import Logo from "@/components/Logo.vue";
import AxiosHandler from "@/utils/axiosRequestHandler";
import { AxiosResponse } from "axios";
import UserService from "@/services/userService";

@Component({
	components: {
		Logo
	}
})
export default class LoginView extends Vue {
	created() {
		const firebaseUser = firebase.auth().currentUser;

		if (firebaseUser && firebaseUser.email) {
			this.$store.dispatch("saveFirebaseUser", firebaseUser);
			UserService.getUserByEmail(firebaseUser.email).then(
				(res: AxiosResponse) => {
					if (res) {
						if (res.status === 200) {
							const user: User = res.data;
							this.$store.dispatch("saveLoggedInUser", user);
							this.$router.replace("lobby");
						} else if (res.status === 401 || res.status === 404) {
							this.$router.replace("register");
						}
					}
				}
			);
		}
	}

	private socialLogin(): void {
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithRedirect(provider);
	}
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.loginOptions {
	display: flex;
	flex-direction: column;
	margin-top: 15vh;

	&__header {
		margin-bottom: 0.5em;
	}

	&__button {
		display: flex;
		justify-content: center;

		margin: 0 auto;

		&__icon {
			display: flex;
			align-self: center;
		}

		&__name {
			display: flex;
			align-self: center;
			padding-top: 0.2em;
		}
	}
}

.fa-icon {
	margin: 0 0.5em 0 0;
}
</style>
