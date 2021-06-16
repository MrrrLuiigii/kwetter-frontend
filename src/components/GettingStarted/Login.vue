<template>
	<div class="login">
		<h1>Login to Kwetter</h1>
		<p v-if="error !== ''" class="errorMsg">{{ error }}</p>
		<div>
			<input
				v-focus
				@keypress.enter="login"
				v-model.trim="loginRequest.username"
				class="input-primary passManager"
				type="text"
				placeholder="Username..."
			/>
		</div>
		<div>
			<input
				@keypress.enter="login"
				v-model.trim="loginRequest.password"
				class="input-primary passManager"
				type="password"
				placeholder="Password..."
			/>
		</div>
		<div>
			<button class="button-alt" @click="login">
				Login
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import FeatherBackground from "@/components/FeatherBackground.vue";
import { Component, Vue } from "vue-property-decorator";

//services
import AuthService from "@/services/authService";
import ProfileService from "@/services/profileService";

//models
import { LoginRequest } from "@/models/dto/auth.dto";

@Component({ components: { FeatherBackground } })
export default class Login extends Vue {
	private error: string = "";

	private loginRequest: LoginRequest = {
		username: "",
		password: ""
	};

	login() {
		if (this.loginRequest.username === "")
			return (this.error = "Username is required...");
		if (this.loginRequest.password === "")
			return (this.error = "Password is required...");

		AuthService.login(this.loginRequest)
			.then((res: any) => {
				this.error = "";

				ProfileService.getProfile()
					.then((res: any) => {
						this.error = "";
						this.$store.dispatch("authModule/linkProfile", res.data.id);
						this.$router.replace({ name: "Home" });
					})
					.catch((err: { message: string }) => {
						if (err && err.message) this.error = err.message;
					});
			})
			.catch((err: { message: string }) => {
				this.error =
					(err && err.message) || "Whoops... Something went wrong...";
			});
	}
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.login {
	text-align: right;
	margin-right: 10vw;
}

.login div input,
button {
	margin: 0.5em;
}

.login h1 {
	font-size: 3vw;
}
</style>
