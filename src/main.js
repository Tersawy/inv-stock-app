import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import i18n from "@/plugins/i18n";
import globalMixin from "@/mixins/global";
import $axios from "@/plugins/api";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import MainSection from "@/components/layout/MainSection";
import "@fortawesome/fontawesome-free/js/all";
import "@fortawesome/fontawesome-free/css/all.css";
import "@/assets/scss/main.scss";

window.String.prototype.toCapitalize = function () {
	let firstLetter = this.charAt(0).toLocaleUpperCase();
	let lastLetters = this.slice(0).toLocaleLowerCase();
	return firstLetter + lastLetters;
};

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.mixin(globalMixin);

Vue.prototype.$axios = $axios;
Vue.prototype.$store = store;
Vue.prototype.$ipc = window.ipc;

Vue.component("main-section", MainSection);

router.beforeEach(async (to, _from, next) => {
	let user = store.state.user;

	user = user ? user : sessionStorage.getItem("user");

	user = user ? user : {};

	user = typeof user === "object" ? user : JSON.parse(user);

	let isUser = Object.keys(user).length > 1;

	if (!isUser && to.meta.auth) return next({ name: "Login" });

	if (isUser && (!to.meta.auth || (to.meta.auth && !to.meta.userType.includes(+user.type)))) {
		if ([0, 1, 2].includes(+user.type)) return next({ name: "Dashboard" });
	}

	// If !isUser the user will be next to Login page
	// if isUser will complete his route
	next();
});

Vue.config.productionTip = false;

import "./directives";
import "./filters";

new Vue({
	router,
	store,
	i18n,
	render: (h) => h(App)
}).$mount("#app");
