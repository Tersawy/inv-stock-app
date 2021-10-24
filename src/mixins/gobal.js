import { mapState } from "vuex";

const globalMixin = {
	computed: {
		...mapState({
			me: (state) => state.Auth.user
		}),

		isAuth() {
			return Object.keys(this.me).length > 0;
		},

		isOwner() {
			return this.me.type === 0;
		},

		isAdmin() {
			return this.me.type === 1;
		},

		isUser() {
			return this.me.type === 2;
		},

		BASE_URL() {
			return process.env.VUE_APP_BASE_URL;
		}
	}
};

export default globalMixin;
