<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>将页面平均分成四部分</title>



<link rel="stylesheet" href="<%=path%>/assets/css/bootstrap.css" />
<script src="<%=basePath%>/assets/js/jquery.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/echarts.js"></script>
</head>
<body>
	<div >
		<div style="text-align: center;">微信平台数据统计结果</div>
		<table style="width:100%;height:100%;">
			<tr>
				<td align="center" style=" border:1px">
					<div >
				
						<div style="text-align: center;">微信平台关注状态</div>


						<div id="Guanzhu" style="width: 70%;height:300px;"></div>
						<div>
							<span class="am-input-group-btn">
								<button class="am-btn am-btn-default btn-success" id="searchText"
									type="button" onclick="search()">本月</button>

								<button class="am-btn am-btn-default btn-warning"
									id="searchText" type="button" onclick="loadOperateRecord()">本日</button>
							</span>
						</div>
						
						<div style="text-align: center;width: 100%;height:100%;">关注总人数：1900</div>
					</div>
				</td>
				<td align="center" style=" border:1px">
				
					<div >
						<div style="text-align: center;">讲解员实时状况</div>
						<div id="Zhuangkuang" style="width: 100%;height:300px;"></div>
						<div>
							<span class="am-input-group-btn">
								<button class="am-btn am-btn-default btn-success" id="searchText"
									type="button" onclick="search()">本月</button>

								<button class="am-btn am-btn-default btn-warning"
									id="searchText" type="button" onclick="loadOperateRecord()">本日</button>
							</span>
						</div>
					</div>
				</td>
			</tr>
			<tr>
				<td align="center" style=" border:1px"><div >
						<div style="text-align: center;">订单完成状态</div>
						<div id="Order" style="width: 70%;height:300px;"></div>
					</div>
					<div  style=" border:1px">
							<span class="am-input-group-btn">
								<button class="am-btn am-btn-default btn-success" id="searchText"
									type="button" onclick="search()">本月</button>

								<button class="am-btn am-btn-default btn-warning"
									id="searchText" type="button" onclick="loadOperateRecord()">本日</button>
							</span>
						</div>
				</td>
				<td align="center" style=" border:1px"><div>
						<div style="text-align: center;">代购门票情况</div>
						<div id="Ticket" style="width: 100%;height:300px;"></div>
					</div>
					<div>
							<span class="am-input-group-btn">
								<button class="am-btn am-btn-default btn-success" id="searchText"
									type="button" onclick="search()">本月</button>

								<button class="am-btn am-btn-default btn-warning"
									id="searchText" type="button" onclick="loadOperateRecord()">本日</button>
							</span>
						</div>
				</td>
			</tr>
		</table>







	</div>
	<script type="text/javascript">
		$(document).ready(function() {
			loadPerson();
			loadGuide();
			loadOrder();
			loadTicket();
		});

		function loadTicket() {

			var myChart = echarts.init(document.getElementById('Ticket'));
			// 指定图表的配置项和数据
			var option = {
				tooltip : {
					trigger : 'item',
					formatter : "{a} <br/>{b}: {c} ({d}%)"
				},
				legend : {
					orient : 'vertical',
					x : 'left',
					data : [ '代购门票', '未代购门票' ]
				},
				series : [ {
					name : '订单数',
					type : 'pie',
					radius : [ '50%', '70%' ],
					avoidLabelOverlap : false,
					label : {
						normal : {
							show : false,
							position : 'center'
						},
						emphasis : {
							show : true,
							textStyle : {
								fontSize : '30',
								fontWeight : 'bold'
							}
						}
					},
					labelLine : {
						normal : {
							show : false
						}
					},
					data : [ {
						value : 400,
						name : '代购门票'
					}, {
						value : 300,
						name : '未代购门票'
					} ]
				} ]
			};

			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);

		}
		function loadPerson() {

			var myChart = echarts.init(document.getElementById('Guanzhu'));
			// 指定图表的配置项和数据
			var option = {
				tooltip : {
					trigger : 'axis'
				},

				legend : {
					data : [ '关注人数', '取关人数' ]
				},
				xAxis : [ {
					name : '时间',
					type : 'category',
					data : [ '8:00-10:00', '10:00-12:00', '12:00-14:00',
							'14:00-16:00', '16:00-18:00', '18:00-20:00' ]
				} ],
				yAxis : [ {
					type : 'value',
					name : '人数',
					min : 0,
					max : 250,
					interval : 50,
					axisLabel : {
						formatter : '{value} 人'
					}
				} ],
				series : [ {
					name : '关注人数',
					type : 'bar',
					data : [ 180, 200, 170, 150, 160, 176 ]
				}, {
					name : '取关人数',
					type : 'bar',
					data : [ 20, 40, 10, 50, 60, 30 ]
				} ]
			};

			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);

		}

		function loadOrder() {

			var myChart = echarts.init(document.getElementById('Order'));
			// 指定图表的配置项和数据
			var option = {
				tooltip : {
					trigger : 'axis'
				},

				legend : {
					data : [ '完成订单', '订单总数' ]
				},
				xAxis : [ {
					name : '订单种类',
					type : 'category',
					data : [ '拼团订单', '预约订单' ]
				} ],
				yAxis : [ {
					type : 'value',
					name : '个数',
					min : 0,
					max : 10000,
					axisLabel : {
						formatter : '{value} 个'
					}
				} ],
				series : [ {
					name : '完成订单',
					type : 'bar',
					data : [ 4000, 5000 ]
				}, {
					name : '订单总数',
					type : 'bar',
					data : [ 8000, 9000 ],

				} ]
			};

			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);

		}
		function loadGuide() {

			var myChart = echarts.init(document.getElementById('Zhuangkuang'));
			// 指定图表的配置项和数据
			var option = {
				tooltip : {
					trigger : 'item',
					formatter : "{a} <br/>{b}: {c} ({d}%)"
				},
				legend : {
					orient : 'vertical',
					x : 'left',
					data : [ '待接单', '已接单' ]
				},
				series : [ {
					name : '讲解员人数',
					type : 'pie',
					radius : [ '50%', '70%' ],
					avoidLabelOverlap : false,
					label : {
						normal : {
							show : false,
							position : 'center'
						},
						emphasis : {
							show : true,
							textStyle : {
								fontSize : '30',
								fontWeight : 'bold'
							}
						}
					},
					labelLine : {
						normal : {
							show : false
						}
					},
					data : [ {
						value : 335,
						name : '待接单'
					}, {
						value : 310,
						name : '已接单'
					} ]
				} ]
			};
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);

		};
	</script>
		<script src="<%=path%>/assets/js/bootstrap.js"></script>
</body>
</html>