<template>
	<div class="invoice-show p-3">
		<b-card>
			<div class="invoice-actions-btns w-100 d-flex justify-content-center">
				<b-btn variant="success" class="d-flex align-items-center" :to="{ name: `${namespace}Update`, params: { invoiceId: invoice.id } }">
					<b-icon icon="pencil-square" scale="0.8"></b-icon>
					<span class="mx-2">Edit Purchase</span>
				</b-btn>

				<b-btn variant="info" class="d-flex align-items-center mx-2">
					<b-icon icon="envelope" scale="0.8"></b-icon>
					<span class="mx-2">Send To Email</span>
				</b-btn>

				<b-btn variant="warning" class="d-flex align-items-center mx-2">
					<b-icon icon="chat-dots" scale="0.8"></b-icon>
					<span class="mx-2">Send To Sms</span>
				</b-btn>

				<b-btn variant="teal" class="d-flex align-items-center mx-2">
					<span class="d-flex" style="font-size: 13px">
						<i class="far fa-file-pdf fa-fw font-weight-300"></i>
					</span>
					<span class="mx-2">Download PDF</span>
				</b-btn>

				<b-btn variant="orange" class="d-flex align-items-center mx-2">
					<b-icon icon="printer" scale="0.8"></b-icon>
					<span class="mx-2">Print</span>
				</b-btn>

				<b-btn variant="danger" class="d-flex align-items-center mx-2">
					<b-icon icon="trash" scale="0.8"></b-icon>
					<span class="mx-2">Delete</span>
				</b-btn>
			</div>
			<h4 class="mt-5 text-center">
				Purchase Detail: &nbsp;<b-badge variant="outline-primary">{{ invoice.reference }}</b-badge>
			</h4>
			<hr class="my-5" />
			<b-row class="mb-4">
				<b-col cols="4">
					<div>
						<h5>Supplier Info</h5>
						<div class="mb-1">{{ invoice.supplier | relation("name") }}</div>
						<div class="mb-1">{{ invoice.supplier | relation("email") }}</div>
						<div class="mb-1">{{ invoice.supplier | relation("phone") }}</div>
						<div class="mb-1">{{ invoice.supplier | relation("address") }}</div>
					</div>
				</b-col>
				<b-col cols="4">
					<div>
						<h5>Company Info</h5>
						<div class="mb-1">Stocky</div>
						<div class="mb-1">admin@example.com</div>
						<div class="mb-1">6315996770</div>
						<div class="mb-1">3618 Abia Martin Drive</div>
					</div>
				</b-col>
				<b-col cols="4">
					<div>
						<h5>Purchase Info</h5>
						<div class="mb-1">Reference : {{ invoice.reference }}</div>
						<div class="mb-1">Status : <span v-purchase-status="invoice.status"></span></div>
						<div class="mb-1">Warehouse : {{ invoice.warehouse | relation }}</div>
						<div class="mb-1">Payment Status : <span v-payment-status="invoice.payment_status"></span></div>
					</div>
				</b-col>
			</b-row>
		</b-card>
		<b-card class="mt-30px" header-bg-variant="info" header-text-variant="white">
			<template #header>
				<div class="d-flex align-items-center">
					<b-icon icon="card-checklist" scale="1.5" variant="white"></b-icon>
					<span class="mx-3 mb-0 h5"> Order Summary </span>
				</div>
			</template>
			<b-table :fields="fields" :items="invoice.products" class="mb-0" hover thead-tr-class="border-0">
				<template #cell(image)="row">
					<b-avatar :src="APP_PRODUCTS_URL + row.value" class="shadow-sm" rounded="lg"></b-avatar>
				</template>

				<template #cell(name)="row">
					<div>
						<div class="mb-2">
							<span>{{ row.value }}</span>
							<span v-if="row.item.variant" class="text-muted"> - {{ row.item.variant }} </span>
						</div>
						<b-badge variant="outline-info">
							{{ row.item.code }}
						</b-badge>
					</div>
				</template>

				<template #cell(net_cost)="row"> $ {{ net(row.item).cost | floating }} </template>

				<template #cell(quantity)="row">
					<b-badge variant="outline-success"> {{ row.value | floating }} {{ row.item.purchase_unit }} </b-badge>
				</template>

				<template #cell(unit_cost)="row"> $ {{ row.value | floating }} </template>

				<template #cell(discount)="row"> $ {{ net(row.item).discountCost | floating }} </template>

				<template #cell(tax)="row"> $ {{ net(row.item).taxCost | floating }} </template>

				<template #cell(total)="row">
					$ <span class="text-primary font-weight-600"> {{ net(row.item).subtotalCost | floating }} </span>
				</template>
			</b-table>
		</b-card>
		<b-row class="mt-30px">
			<b-col cols="8">
				<b-card header-bg-variant="teal" header-text-variant="white">
					<template #header>
						<div class="d-flex align-items-center">
							<b-icon icon="credit-card" scale="1.5" variant="white"></b-icon>
							<span class="mx-3 mb-0 h5"> Order Payments </span>
						</div>
					</template>
					<Payments :namespace="namespace" />
				</b-card>
			</b-col>
			<b-col cols="4">
				<b-card header-bg-variant="orange" header-text-variant="white">
					<template #header>
						<div class="d-flex align-items-center">
							<span class="d-flex" style="font-size: 16px">
								<i class="fas fa-hand-holding-usd fa-lg fa-fw font-weight-300"></i>
							</span>
							<span class="mx-3 mb-0 h5"> Order Total </span>
						</div>
					</template>
					<InvoiceDetails :invoice="invoice" invoice-field-name="cost" />
				</b-card>
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import { productNetMixin } from "@/mixins";
	import InvoiceDetails from "@/components/invoice/show/InvoiceDetails";
	import Payments from "@/components/invoice/show/Payments";
	export default {
		name: "PurchaseShow",

		components: { InvoiceDetails, Payments },

		mixins: [productNetMixin],

		data() {
			return {
				namespace: "Purchase",
				fields: [
					{ key: "image", label: "Image" },
					{ key: "name", label: "Product" },
					{ key: "net_cost", label: "Net Unit Cost" },
					{ key: "quantity", label: "Quantity" },
					{ key: "unit_cost", label: "Unit Cost" },
					{ key: "discount", label: "Discount" },
					{ key: "tax", label: "Tax" },
					{ key: "total", label: "Total" }
				]
			};
		},

		mounted() {
			this.getInvoice();
		},

		computed: {
			invoice() {
				return this.$store.state[this.namespace].one;
			},
			invoiceId() {
				return this.$route.params.invoiceId;
			}
		},
		methods: {
			getInvoice() {
				return this.$store.dispatch(`${this.namespace}/one`, this.invoiceId);
			}
		}
	};
</script>
