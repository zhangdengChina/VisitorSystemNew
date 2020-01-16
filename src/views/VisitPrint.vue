<template>
	<div class="visitprint">
		<Header name="访客登记中" />
		<TipsText :text="text" />
		<div class="card-content">
			<div class="card" id="printTest" ref="print">
				<div class="img">
					<img src="../assets/images/headerLogo1.png" width="108" height="62" />
					<p>福建奔驰</p>
				</div>
				<div class="content">
					<p>访客姓名：{{NAME}}</p>
					<p>访客时间：{{VISIT_DATE}}</p>
					<!-- <p>访问人数：</p> -->
					<p>访问类型：{{TYPE}}</p>
					<p>接待人&emsp;：{{USER_NAME}}</p>
					<p>接待部门：{{USER_DEPARTMENT}}</p>
				</div>
			</div>
			<div class="btn">
				<button @click="hairpin" :disabled="swipe" :class="{disabled:swipe}">1.{{clickcard}}</button>
				<!-- <button v-print="'#printTest'" @click="printCard" :disabled="disabled" :class="{disabled:disabled}">2.打印卡贴</button> -->
				<button @click="printCard" :disabled="disabled" :class="{disabled:disabled}">2.打印卡贴</button>
			</div>
		</div>
		<el-dialog title="访客卡发放/Visitor card issuance" :visible.sync="centerDialogVisible" width="30%" :close-on-click-modal="false"
		 :close-on-press-escape="false" :show-close="false" :width="'500px'" center>
			<!-- <p>请将您的访客卡放在读卡器上，以下输入框（卡号以“*”显示）显示卡号输入后，点击“确认按钮”.</p>
			<p>Please put your visitor card on the card reader. Click on ‘Confirm’ Button when the card No. shows on the screen.</p>
			 -->
			<p>您的申请已成功，现在发放访客卡，请核对访客信息。</p>
			<p>Your application has been successful. Now we will issue the visitor card. Please check the visitor information.</p>
			<input type="text" v-model="swipedata" ref="cxk" :maxlength="9"/>
			<p class="warning">注意：请读到卡号后再取卡</p>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="Determine">确 定</el-button>
				<el-button @click="centerDialogVisible = false">取 消</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import Header from "@/components/Header.vue";
	import TipsText from "@/components/TipsText.vue";
	import {
		sendemail,
		bindCard,
		sendCard
	} from "@/apis/apis.js";
	export default {
		data() {
			return {
				text: "访客登记拍照成功。点击发卡，打印卡贴。",
				centerDialogVisible: false,
				disabled: true, //禁用按钮
				swipe: false,
				swipedata: "", //刷卡数据
				NAME: "",
				VISIT_DATE: "",
				TYPE: "",
				PASSPORT: "",
				USER_NAME: "",
				USER_DEPARTMENT: "",
				clickcard: "点击发卡"
			}
		},
		components: {
			Header,
			TipsText
		},
		methods: {
			// 点击打印
			printCard() {
				// 发送邮件
				sendemail({
					PASSPORT: this.PASSPORT
				})
				this.$print(this.$refs.print) // 使用打印
			},
			// 发卡
			hairpin() {
				// 显示刷卡框
				this.centerDialogVisible = true;
				this.swipedata = "";
				// 自动聚焦input
				this.$nextTick(() => {
					this.$refs.cxk.focus();
				});
				// 连接发卡机
				sendCard().then(data => {
					if (data.msgType === 0) {
						this.$message.success("发卡机连接成功！")
					} else {
						this.$message.error("发卡机连接失败！")
					}
				}).catch(data => {
					this.$message.error("发卡机连接失败！")
				})
			},
			// 发卡确认
			Determine() {
				if (!this.swipedata) {
					this.$message.error("请先刷访客卡 Please swipe Employee's card first")
				} else {
					// 发送请求
					bindCard({
						PASSPORT: this.PASSPORT,
						CARD_NUMBER: this.swipedata
					}).then(data => {
						// console.log(data)
						if (data.msgType === 0) {
							this.$message.success("卡号关联成功！")
							// 取消打印禁用
							this.disabled = false;
							// 隐藏刷卡框
							this.centerDialogVisible = false;
							this.clickcard = "已发卡";
							this.swipe = true;
							let data = JSON.parse(window.sessionStorage.getItem('publicData'));
							// if(data.ISCARD){
							// }else{
							data.ISCARD = true;
							window.sessionStorage = window.sessionStorage.setItem('publicData', JSON.stringify(data))
							// }
						} else {
							this.$message.error("请检查卡号是否有误！")
						}
					}).catch(err => {
						this.$message.error("卡号关联失败！")
					})
				}
			},
			// 失焦事件
			// changeinput(){
			// 	if (!this.swipedata) {
			// 		this.$message.error("请先刷员工卡 Please swipe Employee's card first")
			// 	} else {
			// 		// 发送请求
			// 		bindCard({
			// 			PASSPORT: this.PASSPORT,
			// 			CARD_NUMBER: this.swipedata
			// 		}).then(data => {
			// 			// console.log(data)
			// 			if (data.msgType === -1) {
			// 				this.$message.error("卡号关联失败！")
			// 			}
			// 		}).catch(err=>{
			// 			this.$message.error("卡号关联失败！")
			// 		})
			// 		// 取消打印禁用
			// 		this.disabled = false;
			// 		// 隐藏刷卡框
			// 		this.centerDialogVisible = false;
			// 	}
			// }
		},
		mounted() {
			// 本地获取数据
			let getdata = JSON.parse(window.sessionStorage.getItem('publicData'));
			this.NAME = getdata.NAME;
			this.VISIT_DATE = getdata.VISIT_DATE;
			this.TYPE = getdata.TYPE;
			this.PASSPORT = getdata.PASSPORT;
			this.USER_NAME = getdata.USER_NAME;
			this.USER_DEPARTMENT = getdata.USER_DEPARTMENT;
			if (getdata.ISCARD) {
				this.clickcard = "已发卡";
				this.swipe = true;
				this.disabled = false;
			}
			// 延时3ms
			// setTimeout(() => {
			// this.swipe = false;
			// this.centerDialogVisible = true;
			// this.swipedata = "";
			// 自动聚焦input
			// this.$nextTick(() => {
			// 	this.$refs.cxk.focus();
			// });
			// }, 6000)

			// // 连接发卡机
			// sendCard().then(data => {
			// 	if (data.msgType === -1) {
			// 		this.$message.error("发卡机连接失败！")
			// 	}
			// }).catch(data=>{
			// 	this.$message.error("发卡机连接失败！")
			// })
		}
	}
</script>

<style lang="less" scoped>
	@media print {
		#printTest {
			width: 506px;
			height: 304px;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 0px 14px 0px rgba(190, 190, 190, 0.58);
			border-radius: 10px;

			.img {
				text-align: center;
				padding: 12px 0 5px 0;
				border-bottom: 4px solid #009FFF;
				p{
					letter-spacing:5px;
					font-size: 14px;
				}
			}
			
			.content {
				height: 209px;
				background: #F1F1F1;
				font-size: 22px;
				color: #333333;
				padding: 15px 0 0 140px;
				
				p {
					margin-bottom: 10px;
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
				height: 314px;
				background: rgba(255, 255, 255, 1);
				box-shadow: 0px 0px 14px 0px rgba(190, 190, 190, 0.58);
				border-radius: 10px;

				.img {
					text-align: center;
					padding: 15px 0 5px 0;
					border-bottom: 4px solid #009FFF;
					p{
						letter-spacing:5px;
						font-size: 14px;
					}
				}

				.content {
					height: 209px;
					background: #F1F1F1;
					font-size: 22px;
					color: #333333;
					padding: 15px 0 0 140px;
					
					p {
						margin-bottom: 10px;
					}
				}
			}

			.btn {
				position: absolute;
				bottom: 40px;
				right: 70px;
				display: flex;
				flex-direction: column;

				button {
					width: 120px;
					height: 60px;
					background: rgba(41, 46, 65, 1);
					border-radius: 6px;
					outline: none;
					border: none;
					color: #fff;
					cursor: pointer;
					margin-top: 100px;
				}

				.disabled {
					background: #C8C8C8;
				}
			}
		}

		.el-dialog {
			p {
				text-indent: 2em;
				line-height: 18px;
				font-size: 16px;
			}

			input {
				display: block;
				margin: auto;
				height: 30px;
				margin-top: 20px;
			}

			.warning {
				text-indent: 138px;
				color: red;
				font-size: 14px;
				margin-top: 5px;
			}

			.el-dialog__body {
				padding-bottom: 0;
			}

			.dialog-footer {
				margin-top: -20px;
			}
		}
	}
</style>
