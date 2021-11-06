import Vue from "vue";
import errorMixin from "@/mixins/errorMixin";
import formMixin from "@/mixins/formMixin";
import invoiceMixin from "@/mixins/invoiceMixin";
import productNetMixin from "@/mixins/productNetMixin";
import dataTableMixin from "@/mixins/dataTableMixin";
import invoicePaymentsMixin from "@/mixins/invoicePaymentsMixin";

let runGlobalMixins = () => {
	Vue.mixin(errorMixin);
};

export { runGlobalMixins, formMixin, invoiceMixin, productNetMixin, dataTableMixin, invoicePaymentsMixin };
