<template>
	<div class="visitprint">
		<Header name="访客访问中" />
		<TipsText :text="text" />
		<div class="card-content">
			<div class="card" id="printTest">
				<div class="img">
					<img src="../assets/images/headerLogo1.png" width="108" height="62" />
				</div>
				<div class="content">
					<p>访客姓名：张三</p>
					<p>访客时间：2019-12-22 13:20:12</p>
					<p>访问人数：1人</p>
					<p>访问类型：临时访问</p>
				</div>
			</div>
			<button class="btn" v-print="'#printTest'">打印卡贴</button>
		</div>
	</div>
</template>

<script>
	import Header from "@/components/Header.vue";
	import TipsText from "@/components/TipsText.vue";
	export default {
		data() {
			return {
				text: "访客登记拍照成功。打印卡贴。"
			}
		},
		components: {
			Header,
			TipsText
		}
	}
</script>

<style lang="less" scoped>
	@media print {
		#printTest {
			margin-left: 100px;
			width: 506px;
			height: 334px;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 0px 14px 0px rgba(190, 190, 190, 0.58);
			border-radius: 10px;

			.img {
				text-align: center;
				padding: 15px 0;
				border-bottom: 4px solid #009FFF;
			}

			.content {
				height: 238px;
				background: #F1F1F1 !important;
				font-size: 22px;
				color: #333333;
				padding: 25px 0 30px 93px;

				p {
					margin-bottom: 25px;
				}
			}
		}
	}

	.visitprint {
		.card-content {
			position: relative;
			width: 910px;
			margin: auto;

			.card {
				margin-left: 100px;
				width: 506px;
				height: 334px;
				background: rgba(255, 255, 255, 1);
				box-shadow: 0px 0px 14px 0px rgba(190, 190, 190, 0.58);
				border-radius: 10px;

				.img {
					text-align: center;
					padding: 15px 0;
					border-bottom: 4px solid #009FFF;
				}

				.content {
					height: 238px;
					background: #F1F1F1;
					font-size: 22px;
					color: #333333;
					padding: 25px 0 30px 93px;

					p {
						margin-bottom: 25px;
					}
				}
			}

			.btn {
				position: absolute;
				bottom: 40px;
				right: 70px;
				width: 120px;
				height: 60px;
				background: rgba(41, 46, 65, 1);
				border-radius: 6px;
				outline: none;
				border: none;
				color: #fff;
				cursor: pointer;
			}
		}
	}
</style>
