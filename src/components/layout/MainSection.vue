<template>
	<div>
		<b-breadcrumb class="mb-0 bg-transparent" v-if="isAuth">
			<b-breadcrumb-item v-for="(bread, i) in finalBreads" :key="i" :active="true">
				<b-icon v-if="bread.isFirst && bread.isLast" icon="house-fill" scale="1.25" shift-v="1.25" class="mr-1"></b-icon>
				<span v-if="bread.isLast">{{ bread.name }}</span>
				<router-link v-else :to="bread.to">
					<b-icon v-if="bread.isFirst" icon="house-fill" scale="1.25" shift-v="1.25" class="mr-1"></b-icon>
					{{ bread.name }}
				</router-link>
			</b-breadcrumb-item>
		</b-breadcrumb>
		<slot name="default"></slot>
	</div>
</template>

<script>
	export default {
		props: {
			breads: {
				type: Array,
				default: () => []
			}
		},
		computed: {
			finalBreads() {
				return this.breads.map((bread, i) => {
					bread.isLast = i + 1 == this.breads.length;

					bread.isFirst = i == 0;

					bread.name = bread.name.charAt(0).toUpperCase() + bread.name.slice(1);

					return bread;
				});
			}
		}
	};
</script>

<style lang="scss">
	.breadcrumb-item {
		font-size: 18px;
		span.active {
			color: var(--primary);
			cursor: pointer;
			&:hover {
				text-decoration: underline;
			}
		}
	}
</style>
