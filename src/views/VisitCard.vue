<template>
	<div class="visitcard">
		<Header name="访客未登录" />
		<div class="speeditem">
			<div class="speeditem-round">
				<div>
					<p :class="radio?'complete':'target'">
						<span></span>
					</p>
					<p :class="automatic===1?'target':automatic===2&&'complete'">
						<span></span>
					</p>
					<p :class="automatic===2&&'complete'">
						<span></span>
					</p>
					<p :class="automatic===2&&'target'">
						<span></span>
					</p>
				</div>
			</div>
			<div class="speeditem-text">
				<div>
					<p>1、读取证件</p>
					<p>Passport Reader</p>
				</div>
				<div>
					<p>2、自动识别身份</p>
					<p>Automatic Identification</p>
				</div>
				<div>
					<p>3、事件信息</p>
					<p>Event Info</p>
				</div>
				<div>
					<p>4、确认提交</p>
					<p>Confirm Submission</p>
				</div>
			</div>
			<LeftTitle title="读取证件" titleEnglish="Passport Reader" />
			<div class="Passport-Reader">
				<div>
					<img src="../assets/images/card.png" />
					<el-radio v-model="radio" :label="1" @change="changeradio"></el-radio>
				</div>
				<div>
					<img src="../assets/images/papers1.png" />
					<el-radio v-model="radio" :label="2" @change="changeradio"></el-radio>
				</div>
				<!-- <div>
					<span>手动输入</span>
					<el-radio v-model="radio" :label="3" @change="changeradio" @click="manual"></el-radio>
				</div> -->
				<div>
					<p>将身份证/护照件置于读卡器，点击此按钮</p>
					<p>Put the ID card in the card reader, click this button</p>
					<button @click="papers">读取证件</button>
				</div>
			</div>
			<LeftTitle title="事件信息" titleEnglish="Event Info" />
			<el-form ref="visitCard" :model="visitCard" label-width="80px">
				<el-form-item prop="purpose">
					<div class="labletext">
						<p>来访事由</p>
						<p>purpose</p>
					</div>
					<el-select :disabled="auto" v-model="visitCard.purpose" width="700">
						<el-option label="{visitCard.purpose}" value="{visitCard.purpose}"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="date">
					<div class="labletext">
						<p>来访日期</p>
						<p>date</p>
					</div>
					<el-date-picker :disabled="auto" v-model="visitCard.date" type="date" placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item prop="area">
					<div class="labletext">
						<p>来访区域</p>
						<p>area</p>
					</div>
					<el-input :disabled="auto" v-model="visitCard.area"></el-input>
				</el-form-item>
				<el-form-item prop="type">
					<div class="labletext">
						<p>访客类型</p>
						<p>type</p>
					</div>
					<el-select :disabled="auto" v-model="visitCard.type" width="700">
						<el-option label="{visitCard.type}" value="{visitCard.type}"></el-option>
					</el-select>
				</el-form-item>
				<!-- 				<el-form-item>
					<div class="labletext">
						<p>访客验证单号</p>
						<p>Visitor verification no.</p>
					</div>
					<el-input v-model="visitCard.verification"></el-input>
				</el-form-item> -->
				<hr />
				<LeftTitle title="自动识别身份" titleEnglish="Automatic Identification" />
				<div class="visitors">
					<p>来访人员信息类型：普通访客</p>
					<p>Visitor Info: Regular visitors</p>
				</div>
				<el-form-item prop="name">
					<div class="labletext">
						<p>姓名</p>
						<p>name</p>
					</div>
					<el-input :disabled="auto" v-model="visitCard.name"></el-input>
				</el-form-item>
				<el-form-item prop="sex">
					<div class="labletext">
						<p>性别</p>
						<p>sex</p>
					</div>
					<el-input :disabled="auto" v-model="visitCard.sex"></el-input>
				</el-form-item>
				<el-form-item prop="ID">
					<div class="labletext">
						<p>身份证/护照</p>
						<p>ID</p>
					</div>
					<el-input :disabled="auto" v-model="visitCard.ID"></el-input>
				</el-form-item>
				<el-form-item prop="address">
					<div class="labletext">
						<p>地址</p>
						<p>address</p>
					</div>
					<el-input :disabled="auto" v-model="visitCard.address"></el-input>
				</el-form-item>
				<hr />
				<el-form-item prop="selection">
					<div class="labletext">
						<p>地区</p>
						<p>region selection</p>
					</div>
					<el-select :disabled="auto" v-model="visitCard.selection" width="700">
						<el-option label="{visitCard.selection}" value="{visitCard.selection}"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="phone">
					<div class="labletext">
						<p>手机</p>
						<p>mobile phone number</p>
					</div>
					<el-input :disabled="auto" v-model="visitCard.phone"></el-input>
				</el-form-item>
				<el-form-item prop="company">
					<div class="labletext">
						<p>公司</p>
						<p>company</p>
					</div>
					<el-input :disabled="auto" v-model="visitCard.company"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">确定</el-button>
					<el-button @click="resetForm('visitCard')">重置</el-button>
					<el-button>帮助</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!-- 阅读须知模态框 -->
		<el-dialog :visible.sync="centerDialogVisible" :close-on-click-modal='false' :close-on-press-escape='false' width="30%"
		 center>
			<div class="dialog-title">
				<p>奔驰访客须知</p>
				<p>Notice to Mercedes Benz visitors</p>
			</div>
			<div class="dialog-content">
				<pdf class="pdf" src="../../static/pdf/Safetyinstructions.pdf"></pdf>
			</div>
			<span slot="footer" class="dialog-footer">
				<div class="dialog-footer-left">
					<label class="inputcheckbox">
					<p>
						<input type="checkbox" v-model="checked" /><span></span>本人已阅读并承诺遵守上述条款
					</p>
					<p>I accept and undertake to abide by above terms</p>
					</label>
				</div>
				<div class="dialog-footer-right">
					<el-button type="primary" @click="confirm">确认 ok</el-button>
					<el-button @click="cancel">取消 cancel</el-button>
				</div>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import Header from "@/components/Header.vue";
	import LeftTitle from "@/components/LeftTitle.vue";
	import pdf from "vue-pdf";
	export default {
		data() {
			return {
				// 选择读取方式
				radio: "",
				// 表单
				visitCard: {
					// 事件信息
					purpose: '',
					date: '',
					area: "",
					type: "",
					// verification: "",
					// 自动识别
					name: "",
					sex: "",
					ID: "",
					address: "",
					selection: "",
					phone: "",
					company: "",
				},
				automatic: 0, //自动识别身份
				centerDialogVisible: false, //模态框显示隐藏
				checked: false, // 阅读协议
				auto: true, // 输入框禁用
			}
		},
		components: {
			Header,
			LeftTitle,
			pdf
		},
		methods: {
			// 单选更改状态
			changeradio(e) {
				e ? this.automatic = 1 : this.automatic = 0
			},
			// 提交表单
			onSubmit() {
				console.log(this.visitCard);
				// 发起请求


				this.$router.push('/visitphoto')
			},
			// 重置表单
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			// 读取证件
			papers() {
				if (this.radio) {
					this.automatic = 2;
					// 发起请求，接收数据
					this.visitCard = {
						// 事件信息
						purpose: '就看一看',
						date: '2019-12-31',
						area: "郫县",
						type: "普通访客",
						// verification: "",
						// 自动识别
						name: "张三疯",
						sex: "男",
						ID: "889898998",
						address: "中国-四川省-成都市-锦江区-条河路三段301号",
						selection: "+86  中国    +86 china",
						phone: "1223313232",
						company: "是是是",
					}
				} else {
					this.$message.error('请先选择读取类型！');
				}
			},
			// 访客须知确认
			confirm() {
				this.checked ? this.centerDialogVisible = false : this.centerDialogVisible = true;
				if (!this.checked) {
					this.$message.error('请先勾选访客须知承诺！');
				}
			},
			// 访客须知取消返回首页
			cancel() {
				this.$router.replace('/');
			},
		},
		mounted() {
			// 显示模态框
			this.centerDialogVisible = true;
		},
	}
</script>

<style lang="less" scoped>
	.visitcard {
		color: #333;

		/deep/ .header {
			.visitor {
				.iconfont {
					color: #8b8b8b;
				}
			}
		}

		.speeditem {
			width: 1000px;
			margin: 75px auto 0;

			.speeditem-round {
				height: 4px;
				background: rgba(238, 238, 238, 1);
				position: relative;

				div {
					position: absolute;
					top: -14px;
					width: 1000px;
					display: flex;
					justify-content: space-between;

					p {
						width: 30px;
						height: 30px;
						border: 2px solid #D2D2D2;
						border-radius: 50%;
						display: flex;
						background: #fff;
						justify-content: center;
						align-items: center;

						span {
							width: 13px;
							height: 13px;
							border-radius: 50%;
						}
					}

					.target {
						border: 2px solid #009FFF;

						span {
							background: rgba(0, 159, 255, 1);
						}
					}

					.complete {
						background: #009FFF;
						border: 2px solid #009FFF;
					}
				}
			}

			.speeditem-text {
				display: flex;
				width: 1100px;
				margin: 20px 0 0 -50px;
				justify-content: space-between;
				text-align: center;
			}

			.Passport-Reader {
				display: flex;
				margin-top: 30px;
				width: 1200px;

				div {
					display: flex;
					justify-content: center;
					align-items: center;
					margin-left: 20px;

					img {
						width: 240px;
						height: 167px;
					}

					.el-radio {
						margin-left: 10px;
					}

					span {
						width: 64px;
						margin-left: 40px;
					}
				}

				div:last-child {
					flex-direction: column;
					margin-left: 49px;

					p {
						width: 100%;
					}

					p:last-child {
						font-size: 14px;
					}

					button {
						margin-top: 15px;
						width: 120px;
						height: 40px;
						color: #fff;
						background: #292E41;
						outline: none;
						border: 0;
						border-radius: 6px;
						cursor: pointer;
					}
				}
			}

			.el-form {
				width: 1000px;

				/deep/.el-form-item {
					.el-form-item__content {
						width: 100%;
						display: flex;

						.labletext {
							width: 172px;
							text-align: right;
							margin-right: 30px;

							p {
								height: 25px;
								font-size: 16px;
							}

							p:first-child {
								letter-spacing: 2px;
							}
						}
					}
				}

				/deep/ .el-select__caret {
					color: #333;
					margin-right: 10px;
				}

				/deep/ .el-icon-arrow-up:before {
					font-size: 30px;
				}

				/deep/ .el-input--prefix .el-input__inner {
					padding-left: 60px;
				}

				/deep/ .el-input__prefix {
					left: 15px;
				}

				/deep/ .el-input__icon {
					display: flex;
					justify-content: center;
					align-items: center;
				}

				/deep/ .el-icon-date:before {
					font-size: 30px;
				}

				/deep/ .el-icon-circle-close {
					font-size: 30px;
				}

				/deep/.el-form-item:last-child {
					margin: 100px 0;

					button {
						margin-left: 40px;
						height: 40px;
						width: 120px;
						outline: 0;
						color: #fff;
						border-radius: 6px;
					}

					button:first-child {
						background: #292E41;
						margin-left: 300px;
					}

					button:nth-child(2) {
						background: #999999;
					}

					button:last-child {
						background: #009FFF;
					}
				}
			}

			/deep/ .is-checked {
				.el-radio__inner {
					border-color: #009FFF;
				}
			}

			/deep/.el-radio__inner {
				width: 30px;
				height: 30px;
				border: 2px solid #D2D2D2;
				background: #fff;
			}

			/deep/.el-radio__inner::after {
				width: 15px;
				height: 15px;
				background: #009FFF;
			}

			/deep/.el-radio__label {
				display: none;
			}

			/deep/ .el-input {
				width: 700px;
			}

			/deep/ .el-form .el-select {
				width: 700px;
			}

			/deep/ .el-input__inner {
				height: 55px;
			}

			.visitors {
				width: 300px;
				margin: 40px 0 30px 210px;
			}

			hr {
				margin: 40px auto;
				border: 0;
				border-bottom: 2px solid #999999;
			}
		}

		/deep/.el-dialog {
			padding: 0 70px;
			width: 1000px !important;
			height: 600px;

			.dialog-title {
				text-align: center;

				p:first-child {
					font-size: 20px;
					font-weight: bold;
					letter-spacing: 10px;
				}
			}

			.dialog-content {
				width: 860px;
				height: 375px;
				margin: 30px auto 0;
				border: 1px solid rgba(210, 210, 210, 1);
				border-radius: 20px;
				padding: 30px 20px;
				overflow-x: hidden;

				p {
					line-height: 30px;
				}

				.pdf {
					width: 100%;
					height: 100%;
				}
			}

			.dialog-footer {
				display: flex;
				justify-content: space-between;

				.dialog-footer-left {
					text-align: left;
					font-size: 14px;
				}

				.el-checkbox {
					margin-right: 10px;
				}

				.dialog-footer-right {
					/deep/ .el-button {
						padding: 0;
					}

					button {
						width: 100px;
						height: 40px;
						text-align: center;
						color: #fff;
					}

					button:first-child {
						background: #009FFF;
					}

					button:last-child {
						background: #999999;
						margin-left: 50px;
					}
				}
			}

			.el-dialog__header {
				display: none;
			}

			.el-dialog__headerbtn {
				display: none;
			}
		}

		.inputcheckbox {
			cursor: pointer;
			height: 40px;
			input {display: none;}

			span {
				display: inline-block;
				position: relative;
				width: 14px;
				height: 14px;
				border: 1px solid rgba(153, 153, 153, 1);
				border-radius: 2px;
				margin-right: 10px;
			}

			input:checked+span:after {
				content: "\2714";
				color: #009FFF;
				position: absolute;
				font-size: 20px;
				top: -10px;
			}
		}
	}
</style>
