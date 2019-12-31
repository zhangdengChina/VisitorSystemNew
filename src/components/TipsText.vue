<template>
	<div class="tipstext">
		<span class="iconfont icon-chenggong"></span>
		<span>{{text}}</span>
	</div>
</template>

<script>
	export default {
		props:['text'],
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.tipstext {
		width: 910px;
		height: 166px;
		background: rgba(238, 238, 238, 1);
		border-radius: 20px;
		margin: 100px auto 60px;
		display: flex;
		align-items: center;
		.iconfont{
			font-size: 85px;
			color: #009FFF;
			margin-left: 180px;
		}
		span:last-child{
			margin-left: 70px;
			color: #333333;
		}
	}
</style>
