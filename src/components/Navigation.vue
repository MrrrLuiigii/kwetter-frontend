<template>
	<div>
		<div class="header">
			<div class="header__container">
				<div class="header__container__bar">
					<h1 class="header__container__bar__title">Kwetter</h1>
					<input
						class="header__container__bar__search input-primary"
						type="text"
						placeholder="Search..."
					/>
					<fa-icon
						class="header__container__bar__feather feather-no-stroke"
						:icon="['fas', 'feather-alt']"
					/>
					<fa-icon
						class="header__container__bar__feather feather-stroke"
						:icon="['fas', 'feather-alt']"
					/>
					<div class="background"></div>
				</div>
			</div>

			<button
				class="header__button squareButton"
				@click.stop="drawer = !drawer"
			>
				<fa-icon class="fa-icon" :icon="['fas', 'bars']" />
			</button>
		</div>

		<v-navigation-drawer
			class="drawer"
			v-model="drawer"
			absolute
			temporary
			right
			width="14vw"
		>
			<div class="drawer__header">
				<div class="drawer__header__container">
					<div class="user">
						<div class="user__frame">
							<fa-icon :icon="['fas', 'user']" />
						</div>
						<div class="user__username">
							{{ user ? user.username : "" }}
						</div>
					</div>

					<div class="drawer__header__container__bar">
						<fa-icon
							class="drawer__header__container__bar__feather feather-no-stroke"
							:icon="['fas', 'feather-alt']"
						/>
						<fa-icon
							class="drawer__header__container__bar__feather feather-stroke"
							:icon="['fas', 'feather-alt']"
						/>
						<div class="drawer__background"></div>
					</div>
				</div>
			</div>

			<div class="routes">
				<h1 class="routes__title">Menu</h1>

				<ul class="routes__list">
					<li class="routes__list__item">
						<router-link :to="{ name: 'Home' }">
							<div class="route">
								<fa-icon
									class="routes__list__item__before"
									:icon="['fas', 'feather-alt']"
								/>
								<div class="router-link-selector">Home</div>
							</div>
						</router-link>
					</li>
					<li class="routes__list__item">
						<router-link :to="{ name: 'Profile' }">
							<div class="route">
								<fa-icon
									class="routes__list__item__before"
									:icon="['fas', 'feather-alt']"
								/>
								<div class="router-link-selector">Profile</div>
							</div>
						</router-link>
					</li>
				</ul>
			</div>

			<div class="menu">
				<button class="menu__logout" @click="logout">
					<fa-icon :icon="['fas', 'sign-out-alt']" />
					Logout
				</button>
			</div>

			<div class="bottom-feather">
				<fa-icon :icon="['fas', 'feather-alt']" />
			</div>
		</v-navigation-drawer>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

//viewmodels
import AuthVM from "@/models/viewmodels/auth.viewmodel";

@Component
export default class Navigation extends Vue {
	private drawer: boolean = false;

	get user(): AuthVM {
		return this.$store.getters.getUser;
	}

	logout() {
		this.$store.dispatch("logout");
		this.$router.replace({ name: "Landingspage" });
	}
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.header {
	display: flex;
	align-items: center;
	width: 100vw;

	&__container {
		display: flex;

		&__bar {
			position: relative;
			display: flex;
			align-items: center;
			width: 85vw;
			height: 7.5vh;
			background-color: color(app-primary);

			&__title {
				padding: 1em;
			}

			&__input {
				background-color: red;
				//TODO: style size
			}

			&__feather {
				position: absolute;
				right: 0;
				font-size: 7.5vh;
				color: color(app-primary);
				text-shadow: 0 0 3px #000;
			}
		}
	}

	&__button {
		position: absolute;
		right: 1em;
		font-size: 2em;
	}
}

.drawer {
	background-color: color(primary);
	border-left: 2px solid color(font);
	max-width: 20em;

	&__background {
		position: absolute;
		right: -3vh;
		top: 4.5vh;

		width: 0;
		height: 0;

		border-left: 3vh solid transparent;
		border-right: 3vh solid transparent;
		border-bottom: 3vh solid color(app-background);
	}

	&__header {
		height: 7.5vh;
		background-color: color(app-primary);

		&__container {
			&__bar {
				&__feather {
					position: absolute;
					right: 0;
					top: 4.5vh;
					font-size: 3vh;
					color: color(app-primary);
					text-shadow: 0 0 3px #000;
				}
			}
		}
	}
}

.user {
	display: flex;
	align-items: center;
	padding: 0.5em;

	&__frame {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 6vh;
		height: 6vh;
		min-width: 6vh;
		border: 5px solid color(app-font);
		border-radius: 20px 0 20px 20px;
		background-color: color(app-gray);
	}

	&__username {
		//TODO: scalable font size
		font-size: 1.5em;
		padding-left: 0.5em;
	}
}

.routes {
	&__title {
		text-align: left;
		margin: 1.5em 0 1.5em 1.5em;
		font-size: 2em;
	}

	&__list {
		text-align: left;
		list-style-type: none;

		&__item {
			text-decoration: none;
			margin: 1em;
			font-size: 1.5em;
			color: color(app-font);

			&__before {
				color: color(app-primary);
				margin-right: 1em;
				transform: rotate(45deg);
			}
		}
	}
}

.menu {
	position: absolute;
	bottom: 1em;
	left: 2em;
	z-index: 2;
}

.bottom-feather {
	display: flex;
	align-items: flex-end;

	position: absolute;
	bottom: -10px;
	right: -10px;
	z-index: 1;

	color: color(app-primary);
	transform: scaleX(-1);
	font-size: 20vh;
}

.feather-stroke path {
	stroke: color(app-background);
	stroke-width: 35px;
}

.feather-stroke {
	z-index: 1;
}

.feather-no-stroke {
	z-index: 2;
}

.background {
	position: absolute;
	right: -5.5vh;

	width: 0;
	height: 0;

	border-left: 7.5vh solid transparent;
	border-right: 5.5vh solid transparent;
	border-bottom: 7.5vh solid color(app-background);
}

.router-link-active > .route > .router-link-selector {
	border: 2px solid color(app-font);
	border-radius: 10px 0 10px 10px;
	background-color: color(app-gray);
}

.router-link-selector {
	padding: 0.25em;
	width: 6em;
	height: 2em;
}

.route {
	color: color(app-font);
	display: flex;
	align-items: center;
}
</style>
