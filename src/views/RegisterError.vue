<template>
	<div class="registererr">
		<Header name="访客未登记" />
		<div class="title">
			<img src="../assets/images/registererr.png" />
		</div>
		<div class="tipstext">
			<p class="p1">您可能出现问题</p>
			<p>1、登记过登记过登记过登记过登记过登记过登记过登记过登记过</p>
			<p>1、登记过登记过登记过登记过登记过登记过登记过登记过登记过</p>
			<p>1、登记过登记过登记过登记过登记过登记过登记过登记过登记过</p>
			<p>1、登记过登记过登记过登记过登记过登记过登记过登记过登记过</p>
		</div>
		<div class="footer">
			<p>
				<span>登记失败</span>需，
				<button @click="resetOrder">重新预约</button>
			</p>
			<p>Registration failure requires re appointment</p>
		</div>
	</div>
</template>

<script>
	import Header from "@/components/Header.vue";
	export default {
		data() {
			return {

			}
		},
		components: {
			Header,
		},
		methods:{
			resetOrder(){
				this.$router.replace('/visitcard');
			}
		}
	}
</script>

<style lang="less" scoped>
	.registererr {
		/deep/ .header {
			.visitor {
				.iconfont {
					color: #8b8b8b;
				}
			}
		}

		.title {
			width: 852px;
			height: 286px;
			margin: 166px auto 40px;
		}

		.tipstext {
			padding-left: 80px;
			margin: auto;
			width: 910px;
			height: 184px;
			background: rgba(238, 238, 238, 1);
			border-radius: 10px;
			color: #333333;

			.p1 {
				text-align: center;
				padding: 20px 0;
				font-weight: bold;
			}
		}
		.footer{
			text-align: center;
			margin-top: 60px;
			P:first-child{
				font-size: 16px;
				span{
					color: #FF0000;
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
