<template>
	<div class="PersonnelCard">
		<Header name="访客登记中" />
		<div class="content">
			<LeftTitle title="访客信息" titleEnglish="Visitor Information" />
			<div class="content-search">
				<input type="text" v-model="inputdata" placeholder="输入查询 内容，如：姓名 / 访问事由 / 手机号 / 接待人 / 时间" />
				<button @click="queryData">
					<span class="iconfont icon-sousuo"></span>
					<span>查询/query</span>
				</button>
			</div>
			<table>
				<thead>
					<tr>
						<th><button @click="selectAll" :class="{active:active}">全选/Select all</button></th>
						<th>姓名/Name</th>
						<th>公司名称/corporate name</th>
						<th>来访事由/Purpose</th>
						<th>来访时间/Visit time</th>
						<th>接待人/Host</th>
					</tr>
				</thead>
				<tbody>
					<tr  v-for="(item,index) in tableData" :key="index" :class="{trcolor:item.active}">
						<td><label @change="checkedOne(item)"><input  class="check-box" type="checkbox" :checked="item.active"><span class="box"></span></label></td>
						<td>{{item.name}}</td>
						<td>{{item.corporate}}</td>
						<td>{{item.Purpose}}</td>
						<td>{{item.Visit}}</td>
						<td>{{item.Host}}</td>
					</tr>
				</tbody>
			</table>
			<div class="footer">
				<span>第一页</span>
				<el-pagination
					:page-size="8"
					:pager-count="5"
					layout="prev, pager, next"
					:current-page="1"
					:total="100">
				</el-pagination>
				<span>最后一页</span>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from "@/components/Header.vue";
	import LeftTitle from "@/components/LeftTitle.vue";
	export default {
		components: {
			Header,
			LeftTitle
		},
		data() {
			return {
				tableData: [{
						name: '张三',
						corporate: '有限公司名称',
						Purpose: "参观/visit",
						Visit: "2019-2-12  12:12:45",
						Host: "小荣",
						active:false,
					},
					{
						name: '张三',
						corporate: '有限公司名称',
						Purpose: "参观/visit",
						Visit: "2019-2-12  12:12:45",
						Host: "小荣",
						active:false
					},
					{
						name: '张三',
						corporate: '有限公司名称',
						Purpose: "参观/visit",
						Visit: "2019-2-12  12:12:45",
						Host: "小荣",
						active:false
					},
					{
						name: '张三',
						corporate: '有限公司名称',
						Purpose: "参观/visit",
						Visit: "2019-2-12  12:12:45",
						Host: "小荣",
						active:false
					},
					{
						name: '张三',
						corporate: '有限公司名称',
						Purpose: "参观/visit",
						Visit: "2019-2-12  12:12:45",
						Host: "小荣",
						active:false
					},
				],
				multipleSelection: [],
				active:false,//全选样式
				checked:false,// 单选样式
				inputdata:"",
			}
		},

		methods: {
			// 全选
			selectAll(){
				this.active = !this.active;
				this.active?this.tableData.map(item=>item.active = true):this.tableData.map(item=>item.active = false)
			},
			// 单选
			checkedOne(item){
				item.active = !item.active;
				this.tableData.every(item=>item.active)?this.active=true:this.active=false;
			},
			// 查询数据
			queryData(){
				console.log(this.inputdata)
			}
		}
	}
</script>

<style lang="less" scoped>
	.PersonnelCard {
		.content {
			width: 1200px;
			margin: auto;

			.content-search {
				margin: 30px auto 0;
				width: 1072px;
				height: 60px;
				background: rgba(255, 255, 255, 1);
				border: 1px solid rgba(170, 170, 170, 1);
				border-radius: 10px;
				display: flex;
				justify-content: center;
				align-items: center;

				input {
					flex: 1;
					height: 50px;
					border: 0;
					outline: none;
					border-radius: 50px;
					text-indent: 42px;
					margin-left: 2px;
				}

				button {
					width: 150px;
					height: 60px;
					border: 0;
					background: #009FFF;
					color: #fff;
					outline: none;
					border-top-right-radius: 10px;
					border-bottom-right-radius: 10px;
					cursor: pointer;

					.iconfont {
						font-size: 22px;
					}

					span:last-child {
						font-size: 16px;
						margin-left: 9px;
					}
				}
			}

			table{
				width: 1200px;
				margin-top: 50px;
				color: #aaa;
				tr{
					height: 50px;
					text-align: center;
					th{
						color: #333;
						background: #EEEEEE;
						button{
							width:120px;
							height:40px;
							background:rgba(153,153,153,1);
							border-radius:6px;
							border: 0;
							outline: 0;
							color: #fff;
							font-size: 14px;
							cursor: pointer;
						}
					}
					td{
						.check-box{
							display: none;
						}
						span{
							margin: auto;
							display: block;
							width:30px;
							height:30px;
							border:2px solid rgba(102,102,102,1);
							border-radius:50%;
							cursor: pointer;
						}
						.check-box:checked+span{
							background:rgba(0,159,255,1);
							border:2px solid rgba(0,159,255,1);
						}
					}
					.active{
						background: #009FFF;
					}
				}
				tbody .trcolor{
						color: #333 !important;
				}
				tbody tr:nth-child(2n){
					background: #eee;
				}
			}

			.footer {
				width: 500px;
				margin: 50px auto 0;
				display: flex;
				align-items: center;
				text-align: center;
			}
		}
	}
</style>
