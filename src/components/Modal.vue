<template>
	<div class="modal-mask">
		<div class="modal-wrapper">
			<div class="modal-container">
				<h1 class="modal-header">
					<slot name="header">
						Modal header
					</slot>
				</h1>
				<div class="modal-body">
					<slot name="body">
						Modal body
					</slot>
				</div>
				<div class="modal-footer">
					<button
						:class="deleteModal ? 'button-primary-small' : 'button-alt-small'"
						@click="$emit('close')"
					>
						<slot name="cancel">Cancel</slot>
					</button>
					<button
						:class="
							deleteModal ? 'button-accent-small' : 'button-primary-small'
						"
						@click="$emit('close', true)"
					>
						<slot name="confirm">Save</slot>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Modal extends Vue {
	@Prop({ default: true })
	deleteModal: boolean;
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.modal-mask {
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: table;
}

.modal-wrapper {
	display: table-cell;
	vertical-align: middle;
}

.modal-container {
	width: 30%;
	margin: 0px auto;
	padding: 1em;
	background-color: color(app-background);
	border: 4px solid color(app-font);
	border-radius: $border-radius;
	text-align: left;
}

.modal-body {
	margin: 0.5em 0 1em 0;
}

.modal-footer {
	display: flex;
	justify-content: flex-end;
	column-gap: 1em;
}
</style>
