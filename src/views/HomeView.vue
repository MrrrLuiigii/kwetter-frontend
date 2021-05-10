<template>
	<div v-if="user">
		WELKOM OP DE HOME PAGINA,
		{{ user.username }}!
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import AuthVM from "@/models/viewmodels/auth.viewmodel";

@Component
export default class HomeView extends Vue {
	get user(): AuthVM {
		return this.$store.getters["authModule/getUser"];
	}
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";
</style>
