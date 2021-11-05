import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
	{
		path: "/login",
		name: "Login",
		component: () => import(/* webpackChunkName: "dashboard" */ "../views/Auth/Login"),
		meta: { auth: false }
	},
	{
		path: "/",
		name: "Dashboard",
		component: () => import(/* webpackChunkName: "dashboard" */ "../views/Dashboard"),
		meta: { auth: true, userType: [0, 1, 2] }
	},
	{
		path: "/warehouse",
		name: "Warehouse",
		component: () => import(/* webpackChunkName: "Warehouse" */ "../views/Warehouse/index"),
		meta: { auth: true, userType: [0, 1, 2] }
	},
	{
		path: "/warehouse/create",
		name: "WarehouseCreate",
		component: () => import(/* webpackChunkName: "WarehouseForm" */ "../views/Warehouse/form"),
		meta: { auth: true, userType: [0, 1, 2] }
	},
	{
		path: "/warehouse/:warehouseId(\\d+)/update",
		name: "WarehouseUpdate",
		component: () => import(/* webpackChunkName: "WarehouseForm" */ "../views/Warehouse/form"),
		meta: { auth: true, userType: [0, 1, 2] }
	},
	{
		path: "/warehouse/trashed",
		name: "WarehouseTrashed",
		component: () => import(/* webpackChunkName: "WarehouseTrash" */ "../views/Warehouse/trash"),
		meta: { auth: true, userType: [0, 1, 2] }
	},
	{
		path: "/category",
		name: "Category",
		component: () => import(/* webpackChunkName: "Category" */ "../views/Category/index"),
		meta: { auth: true, userType: [0, 1, 2] }
	},
	{
		path: "/category/trashed",
		name: "CategoryTrashed",
		component: () => import(/* webpackChunkName: "CategoryTrash" */ "../views/Category/trash"),
		meta: { auth: true, userType: [0, 1, 2] }
	},
	{
		path: "/brand",
		name: "Brand",
		component: () => import(/* webpackChunkName: "Brand" */ "../views/Brand/index"),
		meta: { auth: true, userType: [0, 1, 2] }
	},
	{
		path: "/brand/trashed",
		name: "BrandTrashed",
		component: () => import(/* webpackChunkName: "BrandTrash" */ "../views/Brand/trash"),
		meta: { auth: true, userType: [0, 1, 2] }
	},
	{
		path: "/unit",
		name: "Unit",
		component: () => import(/* webpackChunkName: "Unit" */ "../views/Unit/index"),
		meta: { auth: true, userType: [0, 1, 2] }
	},
	{
		path: "/product",
		name: "Product",
		component: () => import(/* webpackChunkName: "Product" */ "../views/Product/index"),
		meta: { auth: true, userType: [0, 1, 2] }
	},
	{
		path: "/product/create",
		name: "ProductCreate",
		component: () => import(/* webpackChunkName: "ProductForm" */ "../views/Product/form"),
		meta: { auth: true, userType: [0, 1, 2] }
	},
	{
		path: "/product/:productId(\\d+)/update",
		name: "ProductUpdate",
		component: () => import(/* webpackChunkName: "ProductForm" */ "../views/Product/form"),
		meta: { auth: true, userType: [0, 1, 2] }
	},
	{
		path: "/supplier",
		name: "Supplier",
		component: () => import(/* webpackChunkName: "Supplier" */ "../views/Supplier/index"),
		meta: { auth: true, userType: [0, 1, 2] }
	},
	{
		path: "/supplier/create",
		name: "SupplierCreate",
		component: () => import(/* webpackChunkName: "SupplierForm" */ "../views/Supplier/form"),
		meta: { auth: true, userType: [0, 1, 2] }
	},
	{
		path: "/supplier/:supplierId(\\d+)/update",
		name: "SupplierUpdate",
		component: () => import(/* webpackChunkName: "SupplierForm" */ "../views/Supplier/form"),
		meta: { auth: true, userType: [0, 1, 2] }
	},
	{
		path: "/supplier/trashed",
		name: "SupplierTrashed",
		component: () => import(/* webpackChunkName: "SupplierTrash" */ "../views/Supplier/trash"),
		meta: { auth: true, userType: [0, 1, 2] }
	},
	{
		path: "/customer",
		name: "Customer",
		component: () => import(/* webpackChunkName: "Customer" */ "../views/Customer/index"),
		meta: { auth: true, userType: [0, 1, 2] }
	},
	{
		path: "/purchase",
		name: "Purchase",
		component: () => import(/* webpackChunkName: "Purchase" */ "../views/Purchase/index"),
		meta: { auth: true, userType: [0, 1, 2] }
	},
	{
		path: "/purchase/create",
		name: "PurchaseCreate",
		component: () => import(/* webpackChunkName: "PurchaseForm" */ "../views/Purchase/form"),
		meta: { auth: true, userType: [0, 1, 2] }
	},
	{
		path: "/purchase/:invoiceId(\\d+)/update",
		name: "PurchaseUpdate",
		component: () => import(/* webpackChunkName: "PurchaseForm" */ "../views/Purchase/form"),
		meta: { auth: true, userType: [0, 1, 2] }
	},
	{
		path: "/purchase-return",
		name: "PurchaseReturn",
		component: () => import(/* webpackChunkName: "PurchaseReturn" */ "../views/PurchaseReturn/index"),
		meta: { auth: true, userType: [0, 1, 2] }
	},
	{
		path: "/purchase-return/create",
		name: "PurchaseReturnCreate",
		component: () => import(/* webpackChunkName: "PurchaseReturnForm" */ "../views/PurchaseReturn/form"),
		meta: { auth: true, userType: [0, 1, 2] }
	},
	{
		path: "/purchase-return/:invoiceId(\\d+)/update",
		name: "PurchaseReturnUpdate",
		component: () => import(/* webpackChunkName: "PurchaseReturnForm" */ "../views/PurchaseReturn/form"),
		meta: { auth: true, userType: [0, 1, 2] }
	},
	{
		path: "/sale",
		name: "Sale",
		component: () => import(/* webpackChunkName: "Sale" */ "../views/Sale/index"),
		meta: { auth: true, userType: [0, 1, 2] }
	},
	{
		path: "/sale/create",
		name: "SaleCreate",
		component: () => import(/* webpackChunkName: "SaleForm" */ "../views/Sale/form"),
		meta: { auth: true, userType: [0, 1, 2] }
	},
	{
		path: "/sale/:invoiceId(\\d+)/update",
		name: "SaleUpdate",
		component: () => import(/* webpackChunkName: "SaleForm" */ "../views/Sale/form"),
		meta: { auth: true, userType: [0, 1, 2] }
	},
	{
		path: "/sale-return",
		name: "SaleReturn",
		component: () => import(/* webpackChunkName: "SaleReturn" */ "../views/SaleReturn/index"),
		meta: { auth: true, userType: [0, 1, 2] }
	},
	{
		path: "/sale-return/create",
		name: "SaleReturnCreate",
		component: () => import(/* webpackChunkName: "SaleReturnForm" */ "../views/SaleReturn/form"),
		meta: { auth: true, userType: [0, 1, 2] }
	},
	{
		path: "/sale-return/:invoiceId(\\d+)/update",
		name: "SaleReturnUpdate",
		component: () => import(/* webpackChunkName: "SaleReturnForm" */ "../views/SaleReturn/form"),
		meta: { auth: true, userType: [0, 1, 2] }
	},
	{
		path: "/currency",
		name: "Currency",
		component: () => import(/* webpackChunkName: "Currency" */ "../views/Currency/index"),
		meta: { auth: true, userType: [0, 1, 2] }
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

export default router;
