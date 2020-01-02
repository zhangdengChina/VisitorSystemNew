<template>
	<div class="visitphoto">
		<Header name="访客访问中" />
		<TipsText :text="text" />
		<div class="content">
<!-- 			<LeftTitle title="确认邮件" titleEnglish="Confirm Email" />
			<div class="email">
				<div class="email-text">
					<p>Dear({{name}} of 员工 )</p>
					<p> You have the following visitor(s) registered to see you</p>
					<p>({{username}}) from ({{company}}),phone number ({{userphone}}) is waiting for you at the lobby of (等待区域). </p>
					<p>Please come to the.</p>
					<p>Regards,</p>
					<p>{{REMARKS}}</p>
				</div>
			</div> -->
			<!-- <hr /> -->
			<LeftTitle title="访客拍照" titleEnglish="Visitors taking photos" />
			<div class="photo-content">
				<img :src="headImgSrc" class="photo" alt="头像"/>
				<div class="text">
					<p>拍照要求：白底上身照片，五官清楚</p>
					<p>Photo requirements: upper body photo with white background and clear facial features</p>
				</div>
			</div>
			<div class="photo-btn">
				<p>访客准备好后，点击按钮拍照</p>
				<p>When the visitors are ready, click the button to take photos </p>
				<!-- 开启摄像头 -->
				<button @click="callCamera();dialogVisible=true">拍照</button>
			</div>
		</div>
		<!-- 拍照模态框 -->
		<el-dialog :visible.sync="dialogVisible" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false"
		 width="50%">
			<!--canvas截取流-->
			<canvas ref="canvas" width="800" height="600" :class="{canvashide:canvashide}"></canvas>
			<!--图片展示-->
			<video ref="video" width="800" height="600" autoplay :class="{videohide:videohide}"></video>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="photograph()">{{photographText}}</el-button>
				<el-button @click="closeCamera()">完 成</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import Header from "@/components/Header.vue";
	import TipsText from "@/components/TipsText.vue";
	import LeftTitle from "@/components/LeftTitle.vue";
	import {getfindByPassport,uploadImg} from "@/apis/apis.js";
	export default {
		data() {
			return {
				text: "访客登记成功。访客确认邮件信息并拍照，拍照照片出入数据库。",
				dialogVisible: false,
				headImgSrc: require('@/assets/images/photograph.png'),
				canvashide:true,
				videohide:false,
				photographText:'拍 照',
				name:"",
				username:"",
				userphone:"",
				company:"",
				REMARKS:"",
				PASSPORT:"",
			}
		},
		methods: {
			// 打开摄像头
			callCamera() {
				// H5调用电脑摄像头API
				navigator.mediaDevices.getUserMedia({
					video: true
				}).then(success => {
					// 摄像头开启成功
					this.$refs['video'].srcObject = success
					// 实时拍照效果
					this.$refs['video'].play()
				}).catch(error => {
					console.error('摄像头开启失败，请检查摄像头是否可用！')
				})
			},
			// 拍照
			photograph() {
				this.canvashide = !this.canvashide;
				this.videohide = !this.videohide;
				this.videohide?this.photographText="重 拍":this.photographText="拍 照";
				if(this.photographText === '重 拍'){
					let ctx = this.$refs['canvas'].getContext('2d')
					// 把当前视频帧内容渲染到canvas上
					ctx.drawImage(this.$refs['video'], 0, 0, 800, 600)
				}
			},
			// 上传照片,关闭摄像头
			closeCamera() {
				// 上传照片
				// 转base64格式、图片格式转换、图片质量压缩
				let imgBase64 = this.$refs['canvas'].toDataURL('image/jpeg', 0.7);
				// 由字节转换为KB 判断大小
				let str = imgBase64.replace('data:image/jpeg;base64,', '');
				let strLength = str.length;
				let fileLength = parseInt(strLength - (strLength / 8) * 2);
				// 图片尺寸  用于判断
				let size = (fileLength / 1024).toFixed(2);
				console.log(size)
				if(strLength<10000){
					this.$message.error('请先完成拍照！');
				}else{
					// this.headImgSrc = imgBase64;
					
					// console.log(this.headImgSrc)
					// 上传拍照信息  调用接口上传图片 .........
					uploadImg({DATA:imgBase64,PASSPORT:this.PASSPORT}).then((data)=>{
						if(data.msgType===0){
							this.$message.success('上传成功');
							// 关闭摄像头
							if (!this.$refs['video'].srcObject) return
							let stream = this.$refs['video'].srcObject
							let tracks = stream.getTracks()
							tracks.forEach(track => {
								track.stop()
							})
							this.$refs['video'].srcObject = null;
							this.dialogVisible = false;
							
							// 跳转至打印
							this.$router.push('/visitprint');
						}else{
							this.$message.error('上传失败');
						}
					})
					
					
					// 保存到本地
					// let ADOM = document.createElement('a')
					// ADOM.href = this.headImgSrc
					// ADOM.download = new Date().getTime() + '.jpeg'
					// ADOM.click()
				}
			},
		},
		components: {
			Header,
			TipsText,
			LeftTitle
		},
		mounted(){
			getfindByPassport().then((data)=>{
				let {
					NAME,
					USER_NAME,
					USER_PHONE,
					COMPANY,
					REMARKS,
					PASSPORT
				} = data.returnMsg;
				this.name = NAME;
				this.username = USER_NAME;
				this.userphone = USER_PHONE;
				this.company = COMPANY;
				this.REMARKS = REMARKS;
				this.PASSPORT = PASSPORT;
			})
		}
	}
</script>

<style lang="less" scoped>
	.visitphoto {
		color: #333;

		.content {
			width: 1200px;
			margin: auto;
			position: relative;

			.email {
				width: 834px;
				height: 424px;
				background: #f8f9eb;
				margin: 20px auto 50px;
				display: flex;
				justify-content: center;
				align-items: center;

				.email-text {
					width: 560px;
					height: 288px;
					margin: auto;
					color: #333333;

					p {
						font-size: 16px;
						line-height: 30px;
					}

					p:nth-child(1) {
						font-size: 20px;
						margin-bottom: 30px;
					}

					p:nth-child(4) {
						margin: 30px 0;
					}
				}

				hr {
					width: 1200px;
					margin: auto;
					height: 2px;
					background: rgba(153, 153, 153, 1);
				}
			}

			.photo-content {
				width: 722px;
				height: 400px;
				background: #EEEEEE;
				display: flex;
				align-items: center;
				margin-top: 50px;

				.photo {
					width: 204px;
					height: 296px;
					background: #0000FF;
					margin-left: 68px;
				}

				.text {
					width: 323px;
					margin-left: 68px;
					margin-top: 150px;

					p:first-child {
						font-size: 16px;
						margin-bottom: 20px;
					}

					p:last-child {
						font-size: 14px;
					}
				}
			}

			.photo-btn {
				width: 400px;
				text-align: center;
				position: absolute;
				bottom: 150px;
				right: 0;

				P:nth-child(2) {
					margin: 10px auto 30px;
				}

				button {
					width: 120px;
					height: 40px;
					background: #292E41;
					border-radius: 6px;
					color: #fff;
					outline: none;
					border: 0;
					cursor: pointer;
				}
			}
		}

		/deep/ .el-dialog {
			height: 50%;
			background: 0;
			.videohide{
				display: none;
			}
			.canvashide{
				display: none;
			}
			.el-dialog__footer{
				display: flex;
				justify-content: center;
			}
		}
	}
</style>
