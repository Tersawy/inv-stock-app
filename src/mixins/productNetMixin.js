import { DISCOUNT_FIXED, TAX_INCLUSIVE } from "@/helpers/constants";

let get_discount_value = ({ discount, discount_method }, value) => {
	let is_fixed = discount_method == DISCOUNT_FIXED;

	if (is_fixed) return discount;

	let discount_value = discount * (value / 100);

	return discount_value;
};

let get_value_excluding_discount = ({ discount, discount_method }, value) => {
	let discount_value = get_discount_value({ discount, discount_method }, value);

	let value_excluding_discount = value - discount_value;

	return value_excluding_discount;
};

let get_net_value = ({ tax, tax_method }, value_excluding_discount) => {
	let net_value = value_excluding_discount;

	if (tax_method == TAX_INCLUSIVE) {
		let taxDivide = 1 + tax / 100;

		net_value = value_excluding_discount / taxDivide;
	}

	return net_value;
};

let get_net_tax = ({ tax, tax_method }, value_excluding_discount) => {
	let net_tax;

	if (tax_method == TAX_INCLUSIVE) {
		let net_value = get_net_value({ tax, tax_method }, value_excluding_discount);
		net_tax = value_excluding_discount - net_value;
	} else {
		net_tax = tax * (value_excluding_discount / 100);
	}

	return net_tax;
};

export default {
	methods: {
		net(product) {
			let cost_excluding_discount = get_value_excluding_discount(product, product.unit_cost),
				price_excluding_discount = get_value_excluding_discount(product, product.unit_price);

			let net_tax_cost = get_net_tax(product, cost_excluding_discount),
				net_tax_price = get_net_tax(product, price_excluding_discount);

			let net_cost = get_net_value(product, cost_excluding_discount),
				net_price = get_net_value(product, price_excluding_discount);

			let total_unit_cost = net_cost + net_tax_cost,
				total_unit_price = net_price + net_tax_price;

			let total_cost = total_unit_cost * product.quantity,
				total_price = total_unit_price * product.quantity;

			return {
				cost: net_cost,
				price: net_price,
				taxCost: net_tax_cost,
				taxPrice: net_tax_price,
				discountCost: product.unit_cost - cost_excluding_discount,
				discountPrice: product.unit_price - price_excluding_discount,
				totalCost: total_unit_cost,
				totalPrice: total_unit_price,
				subtotalCost: total_cost,
				subtotalPrice: total_price
			};
		}
	}
};

// export const net = (product) => {
// 	let { unit_cost, unit_price, tax, tax_method, discount = 0, discount_method = DISCOUNT_FIXED, quantity = 1 } = product;

// 	let netCost, netPrice, taxCost, taxPrice, discountCost, discountPrice, totalCost, totalPrice, subtotalCost, subtotalPrice;

// 	discountCost = discount_method == DISCOUNT_FIXED ? discount : discount * (unit_cost / 100);
// 	discountPrice = discount_method == DISCOUNT_FIXED ? discount : discount * (unit_price / 100);

// 	let costExcludingDiscount = unit_cost - discountCost,
// 		priceExcludingDiscount = unit_price - discountPrice;

// 	if (tax_method == TAX_INCLUSIVE) {
// 		let taxDivide = 1 + tax / 100;

// 		netCost = costExcludingDiscount / taxDivide;

// 		netPrice = priceExcludingDiscount / taxDivide;

// 		taxCost = costExcludingDiscount - netCost;

// 		taxPrice = priceExcludingDiscount - netPrice;
// 	} else {
// 		netCost = costExcludingDiscount;

// 		netPrice = priceExcludingDiscount;

// 		taxCost = tax * (costExcludingDiscount / 100);

// 		taxPrice = tax * (priceExcludingDiscount / 100);
// 	}

// 	totalCost = netCost + taxCost;
// 	totalPrice = netPrice + taxPrice;

// 	subtotalCost = quantity * totalCost;
// 	subtotalPrice = quantity * totalPrice;

// 	return {
// 		cost: netCost,
// 		price: netPrice,
// 		taxCost,
// 		taxPrice,
// 		discountCost,
// 		discountPrice,
// 		totalCost,
// 		totalPrice,
// 		subtotalCost,
// 		subtotalPrice
// 	};
// };
