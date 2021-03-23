<template>
	<div class="login">
		<h1>Login to Kwetter</h1>
		<p v-if="error !== ''" class="errorMsg">{{ error }}</p>
		<div>
			<input
				v-model.trim="loginRequest.username"
				class="input-primary passManager"
				type="text"
				placeholder="Username..."
			/>
		</div>
		<div>
			<input
				v-model.trim="loginRequest.password"
				class="input-primary passManager"
				type="password"
				placeholder="Password..."
			/>
		</div>
		<div><button class="button-alt" @click="login">Login</button></div>
	</div>
</template>

<script lang="ts">
import FeatherBackground from "@/components/FeatherBackground.vue";
import { Component, Vue } from "vue-property-decorator";
import AuthService from "@/services/authService";
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
				// this.$router.replace("Home");
			})
			.catch((err: { message: string }) => {
				this.error = err.message || "Whoops... Something went wrong...";
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
