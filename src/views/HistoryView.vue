<template>
	<div>
		<Navigation propBackLocation="lobby" />
		<PageTitle title="History" />
		<div class="flex">
			<div>COMING SOON!</div>
			<div>
				<router-link class="router-link" :to="{ name: 'Lobby' }"
					>Return to the lobby screen...</router-link
				>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navigation from "@/components/Navigation.vue";
import PageTitle from "@/components/PageTitle.vue";

@Component({
	components: {
		Navigation,
		PageTitle
	}
})
export default class HistoryView extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.flex {
	height: 80vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-content: center;
}
</style>
