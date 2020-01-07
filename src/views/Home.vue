<template>
	<div class="home">
		<img src="../assets/images/qj6214790679@2x.png" alt="">
		<div class="right">
			<div class="right-top">
				<img src="../assets/images/logo.png"/>
				<p class="p1">访客管理系统</p>
				<p class="p2">Visitor Management System</p>
				<div class="text-border" @click="goVisitCard">
					<p class="p3">现场访客登记</p>
					<p class="p4">On-site Visitor Registration</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
		methods:{
			goVisitCard(){
				window.sessionStorage.setItem('data','token')
				this.$router.push('/visitcard');
			}
		},
		mounted() {
			// 清除本地存储
			window.sessionStorage.removeItem('publicData');
		}
	}
</script>

<style lang="less" scoped>
	.home{
		height: 100%;
		display: flex;
		img{
			width: 67%;
		}
		.right{
			background: #292E41;
			width: 33%;
			color: #fff;
			.right-top{
				text-align: center;
				margin-top: 94px;
				img{
					width: 246px;
					height: 162px;
					margin: auto;
				}
				.p1{
					margin: 20px auto 0;
					font-size:36px;
					width: 250px;
					text-align-last: justify;
					font-weight:400;
				}
				.p2{
					width: 250px;
					margin:auto;
					font-size:18px;
					text-align-last: justify;
				}
				.text-border{
					width: 260px;
					height: 85px;
					margin: 50% auto 0;
					font-size: 16px;
					border:2px solid rgba(255,255,255,1);
					cursor: pointer;
					.p3{
						width: 160px;
						text-align-last: justify;
						margin: 15px auto 5px;
					}
					.p4{
						font-size: 14px;
						width: 208px;
						text-align-last: justify;
						margin: auto;
					}
				}
			}
		}
	}
</style>
