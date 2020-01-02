<template>
	<div class="header">
		<div class="warpper">
			<div class="left">
				<img src="../assets/images/headerLogo1.png" />
				<div class="title">
					<p>访客管理系统</p>
					<p>Visitor Management System</p>
				</div>
			</div>
			<div class="right">
				<div class="visitor demo">
					<span class="iconfont icon-denglu"></span>
					<span>{{name}}</span>
				</div>
				<div class="backhome demo" @click="backhome">
					<span class="iconfont icon-shouye-copy"></span>
					<span>返回主页</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props:['name'],
		data() {
			return {
				
			}
		},
		methods:{
			backhome(){
				this.$router.replace('/');
			}
		}
	}
</script>

<style lang="less" scoped>
	.header {
		height: 120px;
		background: rgba(238, 238, 238, 1);

		.warpper {
			width: 1200px;
			margin: auto;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.left {
				display: flex;
			}

			.right {
				display: flex;
			}

			.title {
				margin-left: 20px;

				p {
					color: rgba(51, 51, 51, 1);
					text-align-last: justify;
				}

				p:first-child {
					width: 268px;
					height: 39px;
					font-size: 30px;
					font-weight: bold;
				}

				p:last-child {
					width: 266px;
					height: 20px;
					font-size: 18px;
					font-weight: 500;
				}
			}

			.demo {
				width: 224px;
				height: 118px;
				display: flex;
				align-items: center;
				justify-content: center;

				.iconfont {
					font-size: 44px;
				}

				span:last-child {
					font-size: 16px;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					margin-left: 18px;
				}
			}

			.visitor {
				background: rgba(255, 255, 255, 1);

				.iconfont {
					color: #009FFF;
				}
			}

			.backhome {
				cursor: pointer;
				.iconfont {
					color: #333333;
				}
			}
		}
	}
</style>
