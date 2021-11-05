<template>
	<div id="app">
		<Sidebar v-if="isAuth" />
		<div :class="{ main: true, active: sidebarIsOpened }">
			<Navbar v-if="isAuth" />
			<div class="main-content px-3 pt-3" @click="$store.commit('setSidebar', false)">
				<router-view />
			</div>
		</div>
	</div>
</template>

<script>
	const Navbar = () => import("@/components/layout/Navbar.vue");
	const Sidebar = () => import("@/components/layout/Sidebar.vue");

	export default {
		name: "App",
		components: { Navbar, Sidebar },

		computed: {
			sidebarIsOpened() {
				return this.$store.state.sidebarIsOpened;
			}
		}
	};
</script>

<style lang="scss">
	.main {
		position: relative;
		width: calc(100% - 60px);
		left: 60px;
		min-height: 100vh;
		background: #ebeef0;
		transition: 0.5s;
		&.active {
			width: calc(100% - 300px);
			left: 300px;
		}
		.main-content {
			min-height: calc(100vh - 60px);
		}
	}
</style>
