<template>
	<div>
		<Kweet />
		WELKOM OP DE PROFIEL PAGINA!
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Kweet from "@/components/Kweet/Kweet.vue";

@Component({ components: { Kweet } })
export default class ProfileView extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/styles/general";
</style>
