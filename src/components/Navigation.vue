<template>
	<div>
		<div class="navActions">
			<button
				class="navActions__button squareButton"
				@click.stop="drawer = !drawer"
			>
				<fa-icon class="fa-icon" :icon="['fas', 'bars']" />
			</button>
			<button
				class="navActions__button squareButton"
				v-if="backLocation !== ''"
				@click.stop="routeBack"
			>
				<fa-icon class="fa-icon" :icon="['fas', 'arrow-left']" />
			</button>
		</div>

		<!--  -->

		<v-navigation-drawer class="drawer" v-model="drawer" absolute temporary>
			<div class="drawer__user">
				<div class="drawer__user__icon"></div>
				<!-- TODO: make optional in settings -->
				<!-- <div class="drawer__user__photo" v-if="!!firebaseUser.photoURL">
					<img class="drawer__user__photo__img" :src="firebaseUser.photoURL" />
				</div> -->

				<!--  -->

				<div class="drawer__user__name">
					{{ !!loggedInUser ? loggedInUser.username : "" }}
				</div>
			</div>

			<!--  -->

			<v-divider class="drawer__divider"></v-divider>

			<!--  -->

			<ul class="drawer__list">
				<li class="drawer__list__item">
					<router-link class="router-link" :to="{ name: 'Lobby' }"
						>Lobby</router-link
					>
				</li>

				<!--  -->

				<li class="drawer__list__item">
					<router-link class="router-link" :to="{ name: 'History' }"
						>History</router-link
					>
				</li>

				<!--  -->

				<li class="drawer__list__item">
					<router-link class="router-link" :to="{ name: 'Settings' }"
						>Settings</router-link
					>
				</li>

				<!--  -->

				<li class="drawer__list__item">
					<router-link class="router-link" :to="{ name: 'About' }"
						>About</router-link
					>
				</li>
			</ul>

			<!--  -->

			<ul class="drawer__list">
				<li>
					<button class="logoutButton" @click="logout">
						<fa-icon
							class="logoutButton__icon"
							:icon="['fas', 'sign-out-alt']"
						/>
						Logout
					</button>
				</li>
			</ul>
		</v-navigation-drawer>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import firebase from "firebase/app";
import "firebase/auth";
import User from "@/models/User";
import { Route } from "vue-router";

@Component
export default class Navigation extends Vue {
	private drawer: boolean = false;

	@Prop()
	propBackLocation!: string;

	get backLocation(): string {
		return this.propBackLocation ? this.propBackLocation : "";
	}

	get firebaseUser() {
		return this.$store.getters.getFirebaseUser;
	}
	get loggedInUser(): User {
		const loggedInUser: User = this.$store.getters.getLoggedInUser;
		if (!loggedInUser) {
			this.$router.replace("Login");
		}
		return this.$store.getters.getLoggedInUser;
	}

	routeBack(): void {
		if (this.backLocation !== "") {
			this.$router.replace(this.backLocation);
		}
	}

	logout(): void {
		firebase
			.auth()
			.signOut()
			.then(() => {
				// this.$router.replace("login");
				this.$store.dispatch("logout");

				// window.localStorage.removeItem("vuex");
			});
	}
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.navActions {
	position: absolute;
	bottom: 1em;
	left: 1em;

	&__button {
		margin-right: 0.5em;
	}
}

.drawer {
	background-color: color(primary);
	border: 2px solid color(font);
	border-left: none;
	border-radius: 0 10px 10px 0;

	&__user {
		display: flex;
		flex-direction: column;

		&__icon::before {
			content: "";
			background-image: url("../assets/icon_dark.svg");
			background-repeat: no-repeat;
			background-size: 6em 3em;
			display: inline-block;
			height: 3em;
			width: 6em;
			margin: 1.5em 0 -0.5em 0;
		}

		&__photo {
			width: 30%;
			margin: 0 35%;

			&__img {
				width: 100%;
				border-radius: $border-radius;
				box-shadow: 1px 1px 3px color(font);
			}
		}

		&__name {
			font-size: 2em;
		}
	}

	&__divider {
		margin: 1em;
		background-color: color(font);
	}

	&__list {
		text-align: left;
		list-style-type: none;

		&__item {
			margin-bottom: 1em;

			&::before {
				content: "";
				background-image: url("../assets/icon_dark.svg");
				background-repeat: no-repeat;
				background-size: 2em 1em;
				display: inline-block;
				height: 1em;
				width: 2em;
			}
		}
	}
}

.router-link {
	text-decoration: none;
	color: color(font);
}

.logoutButton {
	position: absolute;
	bottom: 1em;
	left: 1.5em;

	&__icon {
		margin-left: 0.75em;
	}
}
</style>
