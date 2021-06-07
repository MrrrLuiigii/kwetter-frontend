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
				<div v-if="typeConfirm" class="type-confirm">
					<p class="type-confirm__message">
						Repeat the following in order to proceed:
					</p>
					<div class="type-confirm__value">
						{{ typeConfirm }}
					</div>
					<input
						v-model="confirmValue"
						v-focus
						class="input-primary type-confirm__input"
						type="text"
						placeholder="Are you sure?"
					/>
				</div>
				<div class="modal-footer">
					<button
						:class="deleteModal ? 'button-primary-small' : 'button-alt-small'"
						@click="$emit('close')"
					>
						<slot name="cancel">Cancel</slot>
					</button>
					<button
						class="button-confirm"
						:disabled="typeConfirm && confirmValue !== typeConfirm"
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

	@Prop({ default: undefined })
	typeConfirm: string;

	private confirmValue: string = "";
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

.type-confirm {
	&__message {
		margin: 0;
	}

	&__value {
		color: color(app-accent);
	}

	&__input {
		width: 100%;
		margin: 1em 0 2em 0;
	}
}

.button-confirm:disabled,
.button-confirm[disabled] {
	border: 5px solid color(app-gray);
	color: color(app-gray);
	border-radius: $border-radius;
	width: 150px;
	height: 2em;
}

.button-confirm:disabled:hover,
.button-confirm[disabled]:hover {
	background-color: color(app-background);
}
</style>
