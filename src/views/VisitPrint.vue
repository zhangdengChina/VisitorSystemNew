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
					<p>访客姓名：{{NAME}}</p>
					<p>访客时间：{{VISIT_DATE}}</p>
					<!-- <p>访问人数：</p> -->
					<p>访问类型：{{TYPE}}</p>
				</div>
			</div>
			<div class="btn">
				<button @click="hairpin">1.点击发卡</button>
				<button v-print="'#printTest'" @click="printCard" :disabled="disabled" :class="{disabled:disabled}">2.打印卡贴</button>
			</div>
		</div>
		<el-dialog title="员工刷卡/Employees swipe card" :visible.sync="centerDialogVisible" width="30%" :close-on-click-modal="false"
		 :close-on-press-escape="false" :show-close="false" :width="'500px'" center>
			<p>请将您的员工卡放在读卡器上，以下输入框（卡号以“*”显示）显示卡号输入后，点击“确认按钮”.</p>
			<p>Please place your badge on the card reader. Click on ‘Confirm’ Button when the card No. shows on the screen.</p>
			<input type="password" v-model="swipedata" autofocus="autofocus" />
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
	import {sendemail} from "@/apis/apis.js";
	import axios from 'axios';
	import qs from 'qs';
	export default {
		data() {
			return {
				text: "访客登记拍照成功。打印卡贴。",
				centerDialogVisible: false,
				disabled: true, //禁用按钮
				swipedata: "", //刷卡数据
				code: 0, // 刷卡状态
				NAME: "",
				VISIT_DATE: "",
				TYPE: "",
				PASSPORT:"",
				http: "http://localhost:5000"
			}
		},
		components: {
			Header,
			TipsText
		},
		methods: {
			// 点击打印
			printCard() {
				// this.$router.replace('/registersuccess');
				// console.log( this.$router)
				// 发送邮件
				sendemail({PASSPORT:this.PASSPORT})
			},
			// 发卡
			hairpin() {
				// 显示刷卡框
				this.centerDialogVisible = true;
				// 启动刷卡机
				axios.put(this.http + '/api/TYCD1500RF/Port', {
					"port": "COM1",
					"buildCommDCB": "9600"
				}).then(data => {
					if (data.code === 0) {
						this.$message.success('连接成功！');
						// 获取状态
						axios.get(this.http + '/api/TYCD1500RF/Status').
						then(data1 => {
							if (data1.code === 0) {
								this.$message.success('连接正常！');
								// 卡片操作
								axios.post(this.http+`/api/TYCD1500RF/Card/{${data.data}}`).
								then(data2=>{
									if(data.code===0){
										this.$message.success('操作成功！');
										console.log('卡片操作',data2.data)
									}else{
										this.$message.error('操作失败！');
									}
								}).catch(err=>{
									this.$message.error('操作失败！');
								})
							} else {
								this.$message.error('error！');
							}
						}).catch(err => {
							this.$message.error('error！');
						})
					} else {
						this.$message.error('连接失败！');
					}
				}).catch(err => {
					this.$message.error('连接失败！');
				})
				// 
			},
			// 发卡确认
			Determine() {
				if (!this.swipedata) {
					this.$message.error("请先刷员工卡 Please swipe Employee's card first")
				} else {
					// 连接刷卡机
					//发卡到读卡位
					if (this.code == 0) {
						// var i = 0;
						// var flag = recursiveReadCard(i);

						// 取消打印禁用
						this.disabled = false;
						// 隐藏模态框
						// this.centerDialogVisible = false;
					} else {
						this.$message.error("连接发卡机失败 Failed to connect to the card machine");
						return;
					}
				}
			}
		},
		mounted() {
			let getdata = JSON.parse(window.sessionStorage.getItem('publicData'));
			this.NAME = getdata.NAME;
			this.VISIT_DATE = getdata.VISIT_DATE;
			this.TYPE = getdata.TYPE;
			this.PASSPORT = getdata.PASSPORT;
		}
	}
</script>

<style lang="less" scoped>
	@media print {
		// @page {
		//       margin: 15mm; /* this affects the margin in the printer settings */
		//  }
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
				background-color: #F1F1F1 !important;
				-webkit-print-color-adjust: exact;
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
			}

			input {
				display: block;
				margin: auto;
				height: 30px;
				margin-top: 20px;
			}
		}
	}
</style>
