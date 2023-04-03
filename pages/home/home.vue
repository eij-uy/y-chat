<template>
	<view>
		<u-button @click="goTo(1)" type="primary">意境</u-button>
		<u-button @click="goTo(2)" type="success">图</u-button>
		<u-button @click="goTo(3)" type="warning">飞花令</u-button>
		<u-button @click="goTo(4)" type="error">无</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goTo(id){
				uni.navigateTo({
					url: '/pages/index/index?id=' + id
				})
			}
		}
	}
</script>

<style>

</style>
