<template>
	<div class="content-title">
		<div></div>
		<div>
			<p>{{title}}</p>
			<p>{{titleEnglish}}</p>
		</div>
	</div>
</template>

<script>
	export default{
		props:['title','title-English'],
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.content-title {
		display: flex;
		margin-top: 50px;
	
		div:first-child {
			width: 16px;
			height: 46px;
			background: rgba(238, 238, 238, 1);
		}
	
		div:last-child {
			margin-left: 42px;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
	
			p:first-child {
				height: 16px;
				font-size: 16px;
				letter-spacing:6px;
			}
	
			p:last-child {
				font-size: 10px;
				margin-top: 5px;
			}
		}
	}
</style>
