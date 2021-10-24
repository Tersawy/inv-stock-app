import axios from "axios";
import router from "@/router";
import store from "@/store";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

let api = async (method, route, data, callback, formData = false) => {
	let params, config, isCallback;

	config = {
		headers: {
			"Content-Type": formData ? "multipart/form-data" : "application/json",
			Authorization: `Bearer ${store.state.Auth.token}`
		}
	};

	params = method == "get" ? [route] : [route, data];

	callback = typeof data === "function" ? data : callback;

	isCallback = typeof callback === "function";

	try {
		let res = await axios[method](...params, config);

		if (res.data.message) store.commit("setSuccess", res.data.message);

		if (isCallback) {
			return callback(null, res.data);
		}

		return Promise.resolve(res.data);
	} catch (err) {
		if (!err.response) return;

		const {
			response: { status, data }
		} = err;

		if (status === 401) {
			store.commit("Auth/unAuth");
			if (router.history.current.name != "Login") router.push("/login");
		}

		if (isCallback) {
			return callback(data);
		}

		return Promise.reject(data);
	}
};

export default api;
