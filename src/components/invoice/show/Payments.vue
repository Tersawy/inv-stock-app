<template>
	<b-table :fields="fields" :items="payments" hover show-empty emptyText="There are no payments to show" class="mb-0" thead-tr-class="border-0">
		<template #empty="scope">
			<div class="text-center text-muted">
				<span>{{ scope.emptyText }},&nbsp;</span>
			</div>
		</template>

		<template #cell(payment_method)="row">{{ row.value | paymentMethod }}</template>

		<template #cell(amount)="row">
			<span class="font-weight-600 text-primary">$ {{ row.value | floating }}</span>
		</template>
	</b-table>
</template>

<script>
	export default {
		props: ["namespace"],

		data() {
			return {
				fields: [
					{ key: "date", label: "Date" },
					{ key: "reference", label: "Reference" },
					{ key: "amount", label: "Amount" },
					{ key: "payment_method", label: "Paid By" }
				]
			};
		},

		computed: {
			payments() {
				return this.$store.state[this.namespace].one.payments;
			}
		}
	};
</script>
