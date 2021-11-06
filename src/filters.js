import Vue from "vue";
import { PAYMENT_METHODS_STR } from "@/helpers/constants";

Vue.filter("relation", function (value, key) {
	if (!value) return "Unknown";

	if (typeof value === "string") return value;

	if (typeof value === "object") {
		if (typeof key === "undefined") return value.name;

		if (typeof value[key] === "undefined") return "Unknown";

		return value[key];
	}
});

Vue.filter("floating", function (value, places = 2) {
	value = value ? value : 0;

	let [f, l] = value.toString().split(".");

	f = f.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	if (!l) return `${f}.${Array(places).fill(0).join("")}`;

	if (l.length < places) {
		return `${f}.${l.slice(0, places)}${Array(places - l.length)
			.fill(0)
			.join("")}`;
	}

	return `${f}.${l.slice(0, places)}`;
});

Vue.filter("paymentMethod", (value) => PAYMENT_METHODS_STR[value]);

Vue.filter("capitalize", (value) => value?.toString().charAt(0).toUpperCase() + value?.toString().slice(1).toLowerCase());

