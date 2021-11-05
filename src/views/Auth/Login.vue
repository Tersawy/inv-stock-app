<template>
	<div class="login">
		<b-container fluid>
			<b-row>
				<b-col class="mx-auto" cols="12" sm="8" md="6" lg="5" xl="4">
					<b-card class="card shadow-lg">
						<b-card-body>
							<b-form @submit.prevent="onSubmit" @reset="onReset">
								<b-form-group>
									<b-form-input v-model="login.email" type="email" placeholder="Enter email" required></b-form-input>
									<span class="text-danger">{{ errors.email }}</span>
								</b-form-group>

								<b-form-group>
									<b-form-input v-model="login.password" type="password" placeholder="Enter password" required></b-form-input>
									<span class="text-danger">{{ errors.password }}</span>
								</b-form-group>

								<div class="d-flex justify-content-between align-items-center">
									<b-overlay :show="loading" rounded opacity="0.6" spinner-small spinner-variant="primary">
										<b-button type="submit" variant="primary">login</b-button>
									</b-overlay>
									<router-link class="text-danger" to="/forget-password">Forget password ?</router-link>
								</div>
							</b-form>
						</b-card-body>
					</b-card>
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>

<script>
	// import { required } from "vuelidate/lib/validators";
	// import { ipcRenderer } from "electron";
	import { LOGIN } from "../../helpers/channels";
	export default {
		name: "Login",
		data: () => ({
			login: { email: null, password: null },
			errors: { email: null, password: null }
		}),
		validations: { login: { email: {} } },
		mounted() {},
		methods: {
			onSubmit() {
				this.loading = true;

				this.$ipc.send(LOGIN, this.login);

				this.$ipc.on(LOGIN, (data) => {
					this.loading = false;
					if (data.status !== 200) return this.showToast(data.msg, "danger");

					this.$store.commit("Auth/login", data);
				});
				// this.$store.dispatch("Auth/login", this.login);
			},
			onReset() {
				this.login = { email: null, password: null };
				this.resetErrors();
			},
			resetErrors() {
				this.errors = { email: null, password: null };
			}
		}
	};
</script>
<style lang="scss" scoped>
	.login {
		height: 100vh;
		background-image: linear-gradient(to right, rgba(255, 0, 0, 0.301), rgba(255, 0, 0, 0.678));
		.card {
			margin-top: 150px;
		}
	}
</style>
