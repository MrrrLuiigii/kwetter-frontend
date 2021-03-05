<template>
	<div>
		<Logo />
		<div class="register">
			<div>
				<h1 class="register__welcome">
					Welcome,<br />
					{{ firebaseUser.displayName }}
				</h1>
			</div>
			<div>
				<p v-if="!error" class="register__paragraph">
					Since this is your first login, you have to set a username and gender.
				</p>
				<p v-else class="register__error">
					{{ error.message }}
				</p>
			</div>

			<div>
				<input
					class="register__usernameInput rectangleInput"
					v-model.trim="username"
					placeholder="Username..."
				/>
				<div class="register__genderContainer">
					<div class="register__genderContainer__male">
						<input type="radio" id="male" :value="male" v-model="gender" />
						<label for="male">Male</label>
					</div>
					<div class="register__genderContainer__female">
						<input type="radio" id="female" :value="female" v-model="gender" />
						<label for="female">Female</label>
					</div>
				</div>
			</div>
			<div>
				<button
					class="register__registerButton rectangleButton"
					@click="register"
				>
					Register
				</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Logo from "@/components/Logo.vue";
import AxiosHandler from "@/utils/axiosRequestHandler";
import { AxiosResponse } from "axios";
import RegisterUserDTO from "@/models/dto/RegisterUser";
import User from "@/models/User";
import Gender from "@/models/enums/Gender";
import UserService from "@/services/userService";

@Component({
	components: {
		Logo
	}
})
export default class RegisterView extends Vue {
	private error: Error | null = null;

	private username: string = "";
	private gender: Gender = Gender.Male;
	private email: string = "";

	private male: Gender = Gender.Male;
	private female: Gender = Gender.Female;

	created() {
		this.email = this.firebaseUser.email;
	}

	get firebaseUser() {
		return this.$store.getters.getFirebaseUser;
	}

	register(): void {
		const user: RegisterUserDTO = {
			username: this.username,
			gender: this.gender,
			email: this.email
		};
		UserService.addUser(user).then((res: AxiosResponse) => {
			if (res.status === 200) {
				this.error = null;
				const loggedInUser: User = res.data;
				this.$store.dispatch("saveLoggedInUser", loggedInUser);
				this.$router.replace("lobby");
			} else if (res.status === 400) {
				this.error = res.data;
			}
		});
	}
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";
.register {
	padding: 0 2em;

	&__welcome {
		@include smallScreen {
			font-size: 20px;
		}
	}

	&__paragraph {
		@include smallScreen {
			font-size: 12px;
		}
	}

	&__error {
		@include smallScreen {
			font-size: 12px;
		}
		color: color(warning);
	}

	&__usernameInput {
		margin-bottom: 0.5em;
	}

	&__registerButton {
		margin-top: 1em;
	}

	&__genderContainer {
		&__male {
			display: inline-block;
			margin-right: 2em;
		}

		&__female {
			display: inline-block;
		}
	}
}
</style>
