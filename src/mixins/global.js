import { mapState } from "vuex";
import { showToast } from "../components/ui/utils";

const globalMixin = {
	data() {
		return {
			loading: false
		};
	},

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
	},

	methods: {
		showToast,
		setLoading(value = false) {
			this.loading = value;
		}
	}
};

export default globalMixin;
