<template>
	<div class="registererr">
		<Header name="访客访问中" />
		<TipsText :text="text"/>
		<div class="footer">
			<p>
				<span>登记成功</span>需，
				<button @click="resetOrder">回到首页</button>
			</p>
			<p>Registration successful, back to the home page</p>
		</div>
	</div>
</template>

<script>
	import Header from "@/components/Header.vue";
	import TipsText from "@/components/TipsText.vue";
	export default {
		data() {
			return {
				text:"打印已完成。"
			}
		},
		components: {
			Header,
			TipsText
		},
		methods:{
			resetOrder(){
				this.$router.replace('/');
				window.sessionStorage.removeItem('publicData');
			}
		},
		mounted() {
			// window.sessionStorage.removeItem('publicData');
		}
	}
</script>

<style lang="less" scoped>
	.registererr {
		.footer{
			text-align: center;
			margin-top: 60px;
			P:first-child{
				font-size: 16px;
				span{
					color: #00FF00;
					font-weight:bold;
				}
				button{
					width:120px;
					height:40px;
					background:rgba(41,46,65,1);
					border-radius:6px;
					outline: none;
					border: 0;
					color: #fff;
					cursor: pointer;
				}
			}
			P:last-child{
				font-size: 14px;
			}
		}
	}
</style>
