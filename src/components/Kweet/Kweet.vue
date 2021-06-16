<template>
	<div v-if="kweet" class="kweet-card">
		<div class="profile">
			<div class="profile__frame">
				<img
					class="profile__frame__img"
					src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/user-512.png"
				/>
			</div>
			<div class="profile__date">
				<Timeago
					class="profile__date__timeago"
					:datetime="createdAt"
					:autoUpdate="true"
				/>
			</div>
		</div>

		<hr class="horizontal-divider" />

		<div class="kweet">
			<h2 class="kweet__username">{{ kweet.profile.username }}</h2>
			<p ref="kweet-body" class="kweet__text">
				<span v-for="(word, index) in words" :key="index">
					<span
						class="mention"
						v-if="isMention(word)"
						@click="routeToUsername(word.substring(1))"
						>{{ word + " " }}</span
					>
					<span v-else>{{ word + " " }}</span>
				</span>
			</p>
			<div class="kweet__actions">
				<div class="kweet__actions__like">
					{{ kweet.likes.count }}

					<fa-icon
						v-if="manageProfile"
						class="kweet__actions__like__heart manage-heart"
						:icon="['fas', 'heart']"
					/>
					<fa-icon
						v-else-if="hasLiked"
						@click="unlikeKweet"
						class="kweet__actions__like__heart"
						:icon="['fas', 'heart']"
					/>
					<fa-icon
						v-else
						@click="likeKweet"
						class="kweet__actions__like__heart unliked"
						:icon="['fas', 'heart']"
					/>
				</div>
				<div v-if="manageProfile" class="kweet__actions__trash">
					<fa-icon
						@click="showDeleteModal = true"
						class="kweet__actions__trash__bin"
						:icon="['fas', 'trash-alt']"
					/>
				</div>
			</div>

			<div class="kweet__trends">
				<span
					class="kweet__trends__trend"
					v-for="trend in kweet.trends"
					:key="trend.id"
					>#{{ trend.name }}</span
				>
			</div>
		</div>

		<Modal
			v-if="showDeleteModal"
			@close="confirm => (confirm ? deleteKweet() : (showDeleteModal = false))"
		>
			<template v-slot:header>
				Delete kweet
			</template>
			<template v-slot:body>
				Are you sure you want to delete this kweet? This action is
				irreversible...
			</template>
			<template v-slot:confirm>
				Delete
			</template>
		</Modal>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

//components
import TrendChip from "@/components/TrendChip.vue";
import Modal from "@/components/Modal.vue";

//models
import KweetVM from "@/models/viewmodels/kweet.viewmodel";
import { ProfileVM } from "@/models/viewmodels/profile.viewmodel";

//services
import LikeService from "@/services/likeService";
import ProfileService from "@/services/profileService";
import KweetService from "@/services/kweetService";

@Component({ components: { TrendChip, Modal } })
export default class Kweet extends Vue {
	@Prop()
	kweet!: KweetVM;

	private showDeleteModal: boolean = false;

	get profileId() {
		return this.$store.getters["authModule/getUser"].profileId;
	}

	get hasLiked() {
		return (
			this.kweet.likes.likes.filter(like => like.profileId === this.profileId)
				.length > 0
		);
	}

	get manageProfile() {
		return this.$route.name === "ManageProfile";
	}

	get createdAt() {
		const createdAt: string = this.kweet.createdAt.toString();
		const dateArray = new Date(createdAt).toLocaleString("en").split(", ");
		return [dateArray[1], dateArray[0]].join(" ");
	}

	get words() {
		return this.kweet.body.split(" ");
	}

	isMention(word: string) {
		const mentions = [];
		[...this.kweet.body.matchAll(/@[^\s]+/g)].forEach(mention => {
			mentions.push(mention[0]);
		});
		return mentions.indexOf(word) > -1;
	}

	async routeToUsername(username: string) {
		ProfileService.getProfileByUsername(username)
			.then((profile: ProfileVM) => {
				this.$router
					.replace({ name: "Profile", params: { id: profile.id } })
					.catch(() => {});
			})
			.catch(() => {});
	}

	likeKweet() {
		LikeService.likeKweet(this.kweet.id, this.profileId).catch(() => {});
	}

	unlikeKweet() {
		LikeService.unlikeKweet(this.kweet.id, this.profileId).catch(() => {});
	}

	deleteKweet() {
		this.showDeleteModal = false;
		KweetService.deleteKweet(this.kweet.id)
			.then(() => {
				this.$emit("deleted");
			})
			.catch(() => {});
	}
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.kweet-card {
	display: flex;
	width: 100%;
	min-width: 30em;
	height: 12em;
	padding: 1em;
	border-radius: $border-radius;
	background-color: color(app-gray);
}

.profile {
	display: flex;
	flex-direction: column;
	width: 7.6em;
	position: relative;

	&__frame {
		display: flex;

		background-color: color(app-background);
		border-radius: $border-radius-small;

		width: 90%;
		height: 6.84em;

		position: relative;

		&__img {
			position: absolute;
			top: 0;
			width: 100%;
		}
	}

	&__date {
		font-size: 0.75em;
		padding-right: 1em;
		text-align: right;
		width: 100%;
		position: absolute;
		bottom: 0;
		right: 50%;

		&__timeago {
			position: relative;
			right: -50%;
		}
	}
}

.horizontal-divider {
	height: 10em;
	width: 0.25em;
	background-color: color(app-font);
	border: none;
}

.kweet {
	display: flex;
	flex-direction: column;
	position: relative;

	text-align: left;
	width: calc(100% - 7.6em);
	padding: 0 1em;

	&__actions {
		position: absolute;
		top: 0;
		right: 0;

		display: flex;
		column-gap: 2em;

		&__like {
			font-size: 1.5em;

			&__heart {
				color: color(app-accent);
				cursor: pointer;
			}
		}

		&__trash {
			font-size: 1.5em;

			&__bin {
				color: color(app-accent);
				cursor: pointer;
			}
		}
	}

	&__trends {
		display: flex;
		position: absolute;
		bottom: 0;

		width: calc(100% - 2em);
		overflow-x: auto;
		overflow-y: hidden;

		&__trend {
			color: color(app-accent);
			margin: 0.25em 0.5em;
		}
	}
}

.mention {
	color: color(app-accent);
	cursor: pointer;
}

.unliked {
	color: color(app-background);
}

.manage-heart {
	color: color(app-background);
	cursor: unset;
}

.manage-heart path,
.unliked path {
	stroke: color(app-accent);
	stroke-width: 64px;
}

::-webkit-scrollbar {
	width: 10px;
	height: 10px;
}
::-webkit-scrollbar-track {
	background-color: color(app-background);
	border-radius: 7px 0 7px 7px;
}
::-webkit-scrollbar-thumb {
	background-color: color(app-primary);
	border: 2px solid color(app-font);

	border-radius: 7px 0 7px 7px;
}
</style>
