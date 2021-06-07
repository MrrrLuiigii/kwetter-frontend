<template>
	<div class="postRegister">
		<h1>Welcome {{ username }}</h1>
		<p v-if="error === ''">
			Complete your profile with the following information...
		</p>
		<p v-else class="errorMsg">{{ error }}</p>
		<div class="postRegister__inputs">
			<div>
				<input
					@keypress.enter="createProfile"
					v-model.trim="createProfileRequest.name"
					v-focus
					class="input-primary"
					type="text"
					placeholder="Full name..."
				/>
			</div>
			<div>
				<input
					@keypress.enter="createProfile"
					v-model.trim="createProfileRequest.web"
					class="input-primary"
					type="text"
					placeholder="Web..."
				/>
			</div>
			<div>
				<p class="noTrendsMsg" v-if="createProfileRequest.trends.length === 0">
					You have not linked any trends yet...
				</p>
				<div v-else class="trendContainer">
					<TrendChip
						@trendRemoved="removeTrend"
						v-for="trend in createProfileRequest.trends"
						:key="trend"
						:propChipName="trend"
					/>
				</div>
				<input
					v-if="createProfileRequest.trends.length < 5"
					v-model.trim="trend"
					@keypress.enter="addTrend"
					class="input-primary"
					type="text"
					placeholder="Trend..."
				/>
			</div>
			<div>
				<textarea
					v-model.trim="createProfileRequest.bio"
					class="input-bio input-primary"
					placeholder="Biography..."
				/>
			</div>
			<div class="postRegister__inputs__buttons">
				<button class="button-alt button-small">Skip</button
				><button class="button-primary" @click="createProfile">
					Save
				</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

//services
import ProfileService from "@/services/profileService";

//dto
import { CreateProfileRequest } from "@/models/dto/profile.dto";

//components
import FeatherBackground from "@/components/FeatherBackground.vue";
import TrendChip from "@/components/TrendChip.vue";

@Component({ components: { FeatherBackground, TrendChip } })
export default class PostRegister extends Vue {
	private error: string = "";

	private trend: string = "";

	private createProfileRequest: CreateProfileRequest = {
		name: "",
		web: "",
		bio: "",
		trends: []
	};

	@Prop()
	propUsername!: string;

	get username() {
		return this.propUsername;
	}

	addTrend() {
		const trend = this.trend.toLowerCase();

		if (this.createProfileRequest.trends.length >= 5)
			return (this.error = "You can not have more than 5 trends...");
		if (trend.indexOf(" ") >= 0)
			return (this.error = "Trend can not contain whitespaces...");
		if (this.createProfileRequest.trends.includes(trend))
			return (this.error = "You can not have duplicate trends...");

		this.createProfileRequest.trends.push(trend);
		if (this.createProfileRequest.trends.length >= 5)
			document.querySelector("textarea").focus();

		this.trend = "";
		this.error = "";
	}

	removeTrend(trend: string) {
		this.createProfileRequest.trends = this.createProfileRequest.trends.filter(
			t => t !== trend
		);
	}

	createProfile() {
		if (
			this.createProfileRequest.name === "" &&
			this.createProfileRequest.web === "" &&
			this.createProfileRequest.bio === "" &&
			!this.createProfileRequest.trends.length
		)
			return (this.error =
				"There is nothing to save. Fill in one field at least...");

		if (
			!this.createProfileRequest.web.startsWith("http://") ||
			!this.createProfileRequest.web.startsWith("https://")
		)
			this.createProfileRequest.web = `http://${this.createProfileRequest.web}`;

		ProfileService.createProfile(this.createProfileRequest)
			.then((res: any) => {
				this.error = "";
				this.$store.dispatch("authModule/linkProfile", res.data.id);
				this.$router.replace({ name: "Home" });
			})
			.catch((err: { message: string }) => {
				if (Array.isArray(err.message)) return (this.error = err.message[0]);
				this.error = err.message;
			});
	}
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.postRegister {
	text-align: right;
	margin-right: 10vw;

	&__inputs {
		width: 500px;
		float: right;

		&__buttons {
			display: flex;
			justify-content: space-between;
			margin-right: -1em;
		}
	}
}

.postRegister div textarea,
input,
button,
.trendContainer {
	margin: 0.5em;
}

.postRegister h1 {
	font-size: 3vw;
}

.input-bio {
	height: 7.5em;
}

.button-small {
	width: 150px;
}

.trendContainer {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	width: 500px;
	max-width: 500px;
}

.noTrendsMsg {
	margin: 1.5em 0 0 0;
}
</style>
