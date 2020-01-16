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
				<div class="autoInput">
					<img src="../assets/images/card.png" />
					<el-radio v-model="radio" :label="1" @change="changeradio"></el-radio>
				</div>
				<div>
					<img src="../assets/images/papers1.png" />
					<el-radio v-model="radio" :label="2" @change="changeradio"></el-radio>
				</div>
				<div class="manualInput">
					<div>
						<span>手动输入</span>
						<el-radio v-model="radio" :label="3" @change="changeradio;manualInput()"></el-radio>
					</div>
					<div :class="{manual:manual}">
						<p>
							身份证:<el-radio v-model="manualradio" :label="4" @change="changeradio"></el-radio>
							护&emsp;照:<el-radio v-model="manualradio" :label="5" @change="changeradio"></el-radio>
						</p>
						<p>
							<el-input :placeholder="'请输入'+placeholder" v-model="cardnumber" ref="cxkone" @focus="show" data-layout="normal"></el-input>
							<vue-touch-keyboard :options="options" v-if="visible" :layout="layout" :cancel="hide" :accept="accept" :input="input" />
						</p>
					</div>
				</div>
				<div class="autoInput">
					<p>将身份证/护照件置于读卡器，点击此按钮</p>
					<p>Put the ID card in the card reader, click this button</p>
					<button @click="papers('visitCard')">{{entertext}}</button>
				</div>
			</div>
			<el-form ref="visitCard" :model="visitCard" label-width="80px">
				<div class="visitcardcontent">
					<div class="visitcardleft">
						<LeftTitle title="自动识别身份" titleEnglish="Automatic Identification" />
						<div class="visitors">
							<p>来访人员信息类型：{{visitCard.type}}</p>
							<p>Visitor Info: {{visitCard.typeEnglish}}</p>
						</div>
						<el-form-item prop="name">
							<div class="labletext">
								<p>姓名</p>
								<p>Name</p>
							</div>
							<el-input :disabled="auto" v-model="visitCard.name"></el-input>
						</el-form-item>
						<el-form-item prop="sex">
							<div class="labletext">
								<p>性别</p>
								<p>Sex</p>
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
						<el-form-item prop="phone">
							<div class="labletext">
								<p>手机</p>
								<p>Mobile Phone Number</p>
							</div>
							<el-input :disabled="auto" v-model="visitCard.phone"></el-input>
						</el-form-item>
						<el-form-item prop="company">
							<div class="labletext">
								<p>公司</p>
								<p>Company</p>
							</div>
							<el-input :disabled="auto" v-model="visitCard.company"></el-input>
						</el-form-item>
					</div>
					<div class="visitcardright">
						<LeftTitle title="事件信息" titleEnglish="Event Info" />
						<el-form-item prop="purpose" class="purpose">
							<div class="labletext">
								<p>来访事由</p>
								<p>Purpose</p>
							</div>
							<el-input :disabled="auto" v-model="visitCard.purpose"></el-input>
						</el-form-item>
						<el-form-item prop="date">
							<div class="labletext">
								<p>来访日期</p>
								<p>Date</p>
							</div>
							<el-input :disabled="auto" v-model="visitCard.date"></el-input>
						</el-form-item>
						<el-form-item prop="area">
							<div class="labletext">
								<p>来访区域</p>
								<p>Area</p>
							</div>
							<el-input :disabled="auto" v-model="visitCard.area"></el-input>
						</el-form-item>
						<el-form-item prop="type">
							<div class="labletext">
								<p>访客类型</p>
								<p>Type</p>
							</div>
							<el-input :disabled="auto" v-model="visitCard.type"></el-input>
						</el-form-item>
						<!-- 				<el-form-item>
							<div class="labletext">
								<p>访客验证单号</p>
								<p>Visitor verification no.</p>
							</div>
							<el-input v-model="visitCard.verification"></el-input>
						</el-form-item> -->
						<!-- <hr /> -->
					
					</div>
				</div>
				<div class="visitcardfooter">
					<el-form-item>
						<el-button type="primary" @click="onSubmit" style="margin: auto;">确定</el-button>
						<!-- <el-button @click="resetForm('visitCard')">重置</el-button> -->
						<!-- <el-button>帮助</el-button> -->
					</el-form-item>
				</div>
			</el-form>
		</div>
		<!-- 阅读须知模态框 -->
		<el-dialog :visible.sync="centerDialogVisible" :close-on-click-modal='false' :close-on-press-escape='false' width="30%"
		 center>
			<div class="dialog-title">
				<p>奔驰访客须知</p>
				<p>Notice to Mercedes Benz visitors</p>
			</div>
			<div class="dialog-content" id="dialog-content-scroll">
				<pdf class="pdf" :src="pdfUrl"></pdf>
			</div>
			<span slot="footer" class="dialog-footer">
				<div class="dialog-footer-left">
					<label class="inputcheckbox" @click="clickVisitorsChecked">
						<p>
							<input type="checkbox" v-model="checked" :disabled="VisitorsChecked" /><span></span>本人已阅读并承诺遵守上述条款
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
	import {
		getfindByPassport,
		getfindNotice
	} from "@/apis/apis.js";
	export default {
		data() {
			return {
				// 选择读取方式
				radio: 1,
				// 手动输入
				manualradio: 4,
				// 手动输入显示隐藏
				manual: true,
				placeholder: "身份证号",
				entertext: "读取证件",
				// 表单
				visitCard: {
					// 事件信息
					purpose: '',
					date: '',
					area: "",
					type: "",
					typeEnglish: "",
					// verification: "",
					// 自动识别
					name: "",
					sex: "",
					ID: "",
					address: "",
					selection: "",
					phone: "",
					company: "",
					USER_NAME: "", // 被访人
					USER_DEPARTMENT: "", //被访人部门
				},
				automatic: 1, //自动识别身份
				centerDialogVisible: false, //模态框显示隐藏
				checked: false, // 阅读协议
				auto: true, // 输入框禁用
				VisitorsChecked: true, // 访客需知禁用
				// http:"https://www.hemingbi.com/fangke/",
				pdfUrl: "", // pdf文档路径
				cardnumber: "",
				publicData: {},
				
				// 虚拟键盘
				visible: false,
				layout: "normal",
				input: null,
				options: {
					useKbEvents: false,
					preventClickEvent: false
				},
				//	 
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
				e ? this.automatic = 1 : this.automatic = 0;
				this.radio === 1 || this.radio === 2 ? this.manual = true : this.manual = false;
				this.radio === 1 || this.radio === 2 ? this.entertext = "读取证件" : this.entertext = "确认"
				this.manualradio === 5 ? this.placeholder = '护照号' : this.placeholder = '身份证号';
				this.cardnumber = '';
				this.$refs.visitCard.resetFields();
				if (e === 4 || e === 5) {
					// 自动聚焦input
					this.$nextTick(() => {
						this.$refs['cxkone'].focus();
					});
				}
			},
			// 提交表单
			onSubmit() {
				// 发起请求
				if (this.visitCard.ID) {
					// 将公用信息存储
					this.publicData = {
						PASSPORT: this.visitCard.ID,
						NAME: this.visitCard.name,
						VISIT_DATE: this.visitCard.date,
						TYPE: this.visitCard.type,
						USER_NAME: this.visitCard.USER_NAME,
						USER_DEPARTMENT: this.visitCard.USER_DEPARTMENT,
						ISCARD: false
					}
					// 数据存入本地
					window.sessionStorage.setItem('publicData', JSON.stringify(this.publicData))

					this.$router.push('/visitphoto')
				} else {
					this.$message.warning('请先读取证件信息！');
				}
			},
			// 重置表单
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			// 手动输入
			manualInput() {
				this.manual = false;
				this.entertext = '确认';
				// 自动聚焦input
				this.$nextTick(() => {
					this.$refs['cxkone'].focus();
				});
			},
			// 读取证件
			papers(formName) {
				// 隐藏键盘
				this.visible = false;
				this.automatic = 2;
				if (this.radio === 1) {
					this.$refs[formName].resetFields();
					getfindByPassport().then((data) => {
						if (data.returnMsg === 2) {
							this.$message.error("未查询到该记录")
							this.$router.replace('/registererror');
						}else if(data.returnMsg === 3){
							this.$message.error("没有获取到证件号码，请重新放置证件!")
						}else if(data.returnMsg === 4){
							this.$message.warning("超时访问，请重新预约!")
						}else if(data.returnMsg === 5){
							this.$message.warning("提前来访，请重新预约!")
						}
						let {
							VISIT_REASON, // 来访事由
							VISIT_DATE, // 来访日期
							VISIT_AREA, // 来访区域
							TYPE, // 访客类型
							NAME, // 姓名	
							SEX, // 性别
							PASSPORT, // 护照、身份证
							// 地址
							// 地区
							USER_PHONE, // 手机号
							COMPANY, // 公司
							USER_NAME,
							USER_DEPARTMENT, // 部门

						} = data.returnMsg;
						this.visitCard.purpose = VISIT_REASON;
						this.visitCard.date = VISIT_DATE;
						this.visitCard.area = VISIT_AREA;
						this.visitCard.type = TYPE;
						if(TYPE === '短期访客'){
							this.visitCard.typeEnglish = 'Short Term Visitors'
						}else if(TYPE === '临时访客'){
							this.visitCard.typeEnglish = 'Temporary Visitor'
						}
						// TYPE === '短期访客' ? this.visitCard.typeEnglish = 'Short Term Visitors' : this.visitCard.typeEnglish =
						// 	'Temporary Visitor';
						this.visitCard.name = NAME;
						this.visitCard.sex = SEX;
						this.visitCard.ID = PASSPORT;
						this.visitCard.phone = USER_PHONE;
						this.visitCard.company = COMPANY;
						this.visitCard.USER_DEPARTMENT = USER_DEPARTMENT;
						this.visitCard.USER_NAME = USER_NAME;
					})
				} else if (this.radio === 2) {
					this.$refs[formName].resetFields();
					getfindByPassport().then((data) => {
						if (data.returnMsg === 2) {
							this.$message.error("未查询到该记录")
							this.$router.replace('/registererror');
						}else if(data.returnMsg === 3){
							this.$message.error("没有获取到证件号码，请重新放置证件!")
						}else if(data.returnMsg === 4){
							this.$message.warning("超时访问，请重新预约!")
						}else if(data.returnMsg === 5){
							this.$message.warning("提前来访，请重新预约!")
						}
						let {
							VISIT_REASON, // 来访事由
							VISIT_DATE, // 来访日期
							VISIT_AREA, // 来访区域
							TYPE, // 访客类型
							NAME, // 姓名	
							SEX, // 性别
							PASSPORT, // 护照、身份证
							// 地址
							// 地区
							USER_PHONE, // 手机号
							COMPANY, // 公司
							USER_NAME,
							USER_DEPARTMENT, // 部门

						} = data.returnMsg;
						this.visitCard.purpose = VISIT_REASON;
						this.visitCard.date = VISIT_DATE;
						this.visitCard.area = VISIT_AREA;
						this.visitCard.type = TYPE;
						if(TYPE === '短期访客'){
							this.visitCard.typeEnglish = 'Short Term Visitors'
						}else if(TYPE === '临时访客'){
							this.visitCard.typeEnglish = 'Temporary Visitor'
						}
						// TYPE === '短期访客' ? this.visitCard.typeEnglish = 'Short Term Visitors' : this.visitCard.typeEnglish =
						// 	'Temporary Visitor';
						this.visitCard.name = NAME;
						this.visitCard.sex = SEX;
						this.visitCard.ID = PASSPORT;
						this.visitCard.phone = USER_PHONE;
						this.visitCard.company = COMPANY;
						this.visitCard.USER_DEPARTMENT = USER_DEPARTMENT;
						this.visitCard.USER_NAME = USER_NAME;
					})
				} else if (this.radio === 3) {
					if (this.cardnumber) {
						getfindByPassport({
							PASSPORT: this.cardnumber
						}).then((data) => {
							if (data.returnMsg === 2) {
								this.$message.error("未查询到该记录")
								this.$router.replace('/registererror');
							}else if(data.returnMsg === 3){
								this.$message.error("未查询到该记录!")
							}else if(data.returnMsg === 4){
								this.$message.warning("超时访问，请重新预约!")
							}else if(data.returnMsg === 5){
								this.$message.warning("提前来访，请重新预约!")
							}
							let {
								VISIT_REASON, // 来访事由
								VISIT_DATE, // 来访日期
								VISIT_AREA, // 来访区域
								TYPE, // 访客类型
								NAME, // 姓名	
								SEX, // 性别
								PASSPORT, // 护照、身份证
								// 地址
								// 地区
								USER_PHONE, // 手机号
								COMPANY, // 公司
								USER_NAME,
								USER_DEPARTMENT, // 部门

							} = data.returnMsg;
							this.visitCard.purpose = VISIT_REASON;
							this.visitCard.date = VISIT_DATE;
							this.visitCard.area = VISIT_AREA;
							this.visitCard.type = TYPE;
							if(TYPE === '短期访客'){
								this.visitCard.typeEnglish = 'Short Term Visitors'
							}else if(TYPE === '临时访客'){
								this.visitCard.typeEnglish = 'Temporary Visitor'
							}	
							// TYPE === '短期访客' ? this.visitCard.typeEnglish = 'Short Term Visitors' : this.visitCard.typeEnglish =
							// 	'Temporary Visitor';
							this.visitCard.name = NAME;
							this.visitCard.sex = SEX;
							this.visitCard.ID = PASSPORT;
							this.visitCard.phone = USER_PHONE;
							this.visitCard.company = COMPANY;
							this.visitCard.USER_DEPARTMENT = USER_DEPARTMENT;
							this.visitCard.USER_NAME = USER_NAME;
						})
					} else {
						this.$message.error('身份证号或护照号不能为空！');
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
				} else {
					window.removeEventListener('scroll', this.handleScroll, true); //  确认（移除）滚轮滚动事件
				}
			},
			// 访客需知
			clickVisitorsChecked() {
				if (this.VisitorsChecked) {
					this.$message.warning('请先阅读来访安全需知！');
				}
			},
			// 访客须知取消返回首页
			cancel() {
				this.$router.replace('/');
			},
			// 监听滚动
			handleScroll() {
				// 监听PDF滚动
				let scrollObj = document.getElementById('dialog-content-scroll'); // 滚动区域
				let scrollTop = scrollObj.scrollTop; //	滚动的距离
				let scrollHeight = scrollObj.scrollHeight; // 滚动条的总高度
				let boxHeight = scrollObj.offsetHeight; // 盒子高度
				if (scrollTop) {
					// 滚动条到底部的条件
					if (scrollTop + boxHeight - 2 === scrollHeight) {
						// 滚动的距离+盒子高度-2=滚动条的总高度
						this.VisitorsChecked = false;
					}
				}
			},
		
			// 虚拟键盘
			accept(text) {
				// alert("Input text: " + text);
				this.hide();
			},
			
			show(e) {
				this.input = e.target;
				this.layout = e.target.dataset.layout;
			
				if (!this.visible)
					this.visible = true
			},
			
			hide() {
				this.visible = false;
			}
		},
		mounted() {
			// 显示模态框
			this.centerDialogVisible = true;
			// 请求pdf文件
			getfindNotice().then((data) => {
				this.pdfUrl = data.returnMsg.NOTICEURL;
			})
			// 启动监听事件
			window.addEventListener('scroll', this.handleScroll, true); // 监听（绑定）滚轮滚动事件

			this.$nextTick(() => {
				this.$refs.cxkone.focus();
			});
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
				width: 1300px;
				position: relative;

				.autoInput {
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

				.manualInput {
					margin-left: 40px;
					display: flex;
					flex-direction: column;
					justify-content: center;

					p {
						margin-top: 15px;
						/deep/.el-radio__inner {
							width: 20px;
							height: 20px;
						}

						/deep/ .el-radio__inner::after {
							width: 10px;
							height: 10px;
						}
						.vue-touch-keyboard{
							position: absolute;
							z-index: 1000;
							width: 100%;
							top: 180px;
							left: 0;
							
						}
					}

					/deep/ .el-input {
						width: 200px;
						margin: 0;

						.el-input__inner {
							height: 35px;
						}
					}

					div:last-child {
						margin: 0;
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
				width: 1200px;
					// 后期修改
					.visitcardcontent{
						display: flex;
						.visitcardleft{
							width: 50%;
						}
						.visitcardright{
							width: 50%;
							.purpose{
								margin-top: 78px;
							}
							.labletext {
								width: 80px !important;
							}
						}
					}
				/deep/.el-form-item {
					margin-bottom: 15px;
					/deep/ .el-input{
						width: 300px;
					}
					.el-form-item__content {
						line-height: 20px;
						width: 100%;
						display: flex;
						margin-left: 0 !important;

						.labletext {
							width: 175px;
							text-align: right;
							margin-right: 30px;
							white-space: nowrap;

							p {
								height: 20px;
								font-size: 14px;
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

			// /deep/ .el-input {
			// 	width: 700px;
			// }

			// /deep/ .el-form .el-select {
			// 	width: 700px;
			// }

			/deep/ .el-input__inner {
				height: 40px;
			}

			.visitors {
				width: 600px;
				margin: 20px auto 20px;
				text-indent: 140px;
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

			input {
				display: none;
			}

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

			input:disabled+span {
				border: 1px solid red;
				background: #f2f2f2;
			}
		}

		// 手动输入隐藏
		.manual {
			display: none;
		}
	}
</style>
