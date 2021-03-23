<template>
	<div class="register">
		<h1>Sign up to Kwetter</h1>
		<p v-if="error !== ''" class="errorMsg">{{ error }}</p>
		<div>
			<input
				v-model="registerRequest.username"
				class="input-primary passManager"
				type="text"
				placeholder="Username..."
			/>
		</div>
		<div>
			<input
				v-model="registerRequest.email"
				class="input-primary passManager"
				type="text"
				placeholder="Email..."
			/>
		</div>
		<div>
			<input
				v-model="registerRequest.password"
				class="input-primary passManager"
				type="password"
				placeholder="Password..."
			/>
		</div>
		<div>
			<input
				v-model="registerRequest.passwordVerify"
				class="input-primary passManager"
				type="password"
				placeholder="Repeat password..."
			/>
		</div>
		<div><button class="button-primary" @click="register">Sign up</button></div>
	</div>
</template>

<script lang="ts">
import FeatherBackground from "@/components/FeatherBackground.vue";
import { Component, Vue } from "vue-property-decorator";
import { RegisterRequest } from "@/models/dto/auth.dto";
import AuthService from "@/services/authService";

@Component({ components: { FeatherBackground } })
export default class Register extends Vue {
	private error: string = "";

	private registerRequest: RegisterRequest = {
		username: "",
		email: "",
		password: "",
		passwordVerify: ""
	};

	register() {
		if (this.registerRequest.username === "")
			return (this.error = "Username is required...");
		if (this.registerRequest.email === "")
			return (this.error = "Email is required...");
		if (this.registerRequest.password === "")
			return (this.error = "Password is required...");
		if (this.registerRequest.passwordVerify === "")
			return (this.error = "Password repeat is required...");

		AuthService.register(this.registerRequest)
			.then((res: any) => {
				console.log(res);
				this.error = "";
				this.$emit("registered", "MrrrLuiigii");
			})
			.catch((err: { message: string }) => {
				this.error = err.message[0] || "Whoops... Something went wrong...";
			});

		this.$emit("registered", "MrrrLuiigii");
	}
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.register {
	text-align: right;
	margin-right: 10vw;
}

.register div input,
button {
	margin: 0.5em;
}

.register h1 {
	font-size: 3vw;
}
</style>
