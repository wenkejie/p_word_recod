<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="renderer" content="webkit">
    <meta http-equiv="ClearType" content="true">

	<title>Document</title>
	<link rel="stylesheet" href="public/css/layout.css">
	<script src="public/vendor/avalon/avalon.js"></script>
	<script src="public/js/table.js"></script>
	<script src="public/js/index.js"></script>
	
</head>
<body ms-controller="demo">
<div class="wrapper">
	 <div ms-include-src="'index.jsp'"></div> 
	<!-- {{namee}} -->

	
	<div id="table_div" class="ui-param-select">
		<div class="ui-param-select-row">
			<div class="ui-param-select-label">所有选择 ></div>
			<a href="#" class="ui-param-select-item" >目的港：NINGBO ></a>
			<a href="javascript:void(0)" class="ui-param-select-item" ms-repeat-el="conditions">{{el.value}}</a>
		</div>
		<div class="ui-param-select-row">
			<div class="ui-param-select-label">航线：</div>
			<a href="javascript:void(0)" class="ui-param-select-item" ms-repeat-el="courses" ms-click="selectStr(el)">{{el.value}}</a>
		</div>
		<div class="ui-param-select-row">
			<div class="ui-param-select-label">船公司：</div>
			<a href="#" class="ui-param-select-item" ms-repeat-el="carrier" ms-click="selectStr(el)">{{el.value}}</a>
			
		</div>
		<div class="ui-param-select-row">
			<div class="ui-param-select-label">船期：</div>
			<a href="#" class="ui-param-select-item" ms-repeat-el="cycle" ms-click="selectStr(el)">{{el.value}}</a>
		</div>
		<div class="ui-param-select-row">
			<div class="ui-param-select-label">是否中转：</div>
			<a href="#" class="ui-param-select-item">直达</a>
			<a href="#" class="ui-param-select-item">中转</a>
		</div>
		<div class="ui-param-select-row">
			<div class="ui-param-select-label">箱型：</div>
	<!-- 		<input type="checkbox" value="1" class="ui-param-select-item"> 20'GP
			<input type="checkbox" value="1" class="ui-param-select-item"> 40'GP
			<input type="checkbox" value="1" class="ui-param-select-item"> 40'HQ -->
			
			<!-- <a href="#" class="ui-param-select-item"><input type="checkbox" value="20GP" checked="checked"> 20'GP</a>
			<a href="#" class="ui-param-select-item"><input type="checkbox" value="40GP" checked="checked"> 40'GP</a>
			<a href="#" class="ui-param-select-item"><input type="checkbox" value="40HQ" checked="checked"> 40'HQ</a>
			<a href="#" class="ui-param-select-item"><input type="checkbox" value="45HQ" > 45'HQ</a> -->
			
				<ul ms-widget="checkboxlist" 
				data-checkboxlist-duplex="val"
				 data-checkboxlist-alltext="" 
				 data-checkboxlist-vertical=false
				  data-checkboxlist-on-select="onselect"
				 >
	                <li><input type="checkbox"  value="20GP">20'GP</li>
	                <li><input type="checkbox" value="40GP">40'GP</li>
	                <li><input type="checkbox" value="40HQ">40'HQ</li>
	                <li><input type="checkbox" value="45HQ">45'HQ</li>
	            </ul>
			
			
			
			
			
			
			
		</div>
	</div>
  <div ms-widget="smartgrid, sg1 " ></div> 

<!-- 

		<table class="ui-table">
			<thead >
				<tr>
					<th ms-repeat-column="smartgrid.columns" 
					ms-css-width="column.width">
					{{column.name|sanitize|html}} -->
                    <!-- <span  ms-click="sortColumn(column, $index, $event)"
                           ms-if="column.sortable" 
                           ms-class="oni-helper-{{column.sortTrend}}">
                        <span class="oni-helper-sort-top">1</span>
                        <span class="oni-helper-sort-bottom">2</span>
                    </span> -->
					</th>
				
				
					<!-- <th class="ta-c" width="50">船公司</th>
					<th class="ta-c" width="50">中转港</th>
					<th width="70">20'GP</th>
					<th width="70">40'GP</th>
					<th width="90">40'HQ</th>
					<th width="120">船期</th>
					<th width="50">航程</th>
					<th>有效期</th>
					<th width="150">供应商</th>
					<th width="90">操作</th> -->
<!-- 				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="ta-c"><img src="public/images/MU.png" alt="马士基" title="马士基" class="hipping-compay-logo">OOCL</td>
					<td class="ta-c">直达</td>
					<td class="price">520</td>
					<td class="price">1134</td>
					<td class="price">1123</td>
					<td>
						<p>
							<span class="ui-tag">截</span>2014-12-12
						</p>
						<span class="ui-tag">开</span>2014-12-12
					</td>
					<td>3天</td>
					<td>2014-120-20</td>
					<td><p>深圳海光国际物流有限公司</p><div class="icon-img"></div></td>
					<td><a href="index.html">立即订舱</a></td>
				</tr>
			</tbody>
		</table>
 -->











		<!-- <table class="ui-table">
			<thead>
				<tr>
					<th class="ta-c" width="50">船公司</th>
					<th class="ta-c" width="50">中转港</th>
					<th width="70">20'GP</th>
					<th width="70">40'GP</th>
					<th width="90">40'HQ</th>
					<th width="120">船期</th>
					<th width="50">航程</th>
					<th>有效期</th>
					<th width="150">供应商</th>
					<th width="90">操作</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="ta-c"><img src="public/images/MU.png" alt="马士基" title="马士基" class="hipping-compay-logo">OOCL</td>
					<td class="ta-c">直达</td>
					<td class="price">520</td>
					<td class="price">1134</td>
					<td class="price">1123</td>
					<td>
						<p>
							<span class="ui-tag">截</span>2014-12-12
						</p>
						<span class="ui-tag">开</span>2014-12-12
					</td>
					<td>3天</td>
					<td>2014-120-20</td>
					<td><p>深圳海光国际物流有限公司</p><div class="icon-img"></div></td>
					<td><a href="index.html">立即订舱</a></td>
				</tr>
				<tr class="split">
					<td class="ta-c"><img src="public/images/MU.png" alt="马士基" class="hipping-compay-logo">OOCL</td>
					<td class="ta-c"><div class="ui-tag ui-tag-orage">中转</div></td>
					<td class="price">520</td>
					<td class="price">1134</td>
					<td class="price">3123</td>
					<td><p>
							<span class="ui-tag">截</span>2014-12-12
						</p>
						<span class="ui-tag">开</span>2014-12-12</td>
					<td>3天</td>
					<td>2014-12-20
					2014-12-20</td>
					<td>
					<p>深圳海光国际物流有限公司</p>
					<div class="icon-img"></div>
					</td>
					<td><a href="#" ms-widget="button" data-button-color="primary" ms-click="show('aa')">立即订舱</a></td>
				</tr>
				<tr>
					<td class="ta-c"><img src="public/images/MU.png" alt="马士基" class="hipping-compay-logo">OOCL</td>
					<td class="ta-c">直达</td>
					<td class="price">520</td>
					<td class="price">1134</td>
					<td class="price">123123</td>
					<td>截:2014-12-12</td>
					<td>3天<div class="ui-tag ui-tag-orage">中转</div></td>
					<td>2014-120-20</td>
					<td>深圳海光国际物流有限公司</td>
					<td><a href="#" ms-widget="button" data-button-color="primary" ms-click="show('aa')">立即订舱</a></td>
				</tr>
				<tr>
					<td class="dropdown-cnt" colspan="10">
						<div class="cost-info">
							<table class="cost-info-part1">
								<thead>
									<tr>
										<th>费用名称</th>
										<th>
											<p>20GP</p>
											<input ms-duplex="p" ms-widget="spinner, $spinner, $spinnerOpts" id="test"/>
										</th>
										<th>
											<p>40GP</p>
											<input ms-duplex="p1" ms-widget="spinner, $spinner, $spinnerOpts" id="test"/>
										</th>
										<th>
											<p>40HQ</p>
											<input ms-duplex="p2" ms-widget="spinner, $spinner, $spinnerOpts" id="test"/>
										</th>
									</tr>
								</thead>
								<tbody>
									<tr><td>运费(ALL IN)($)</td><td>\</td><td>2418.00</td><td>\</td></tr>
									<tr><td>安保费(￥)</td><td>\</td><td>30.00</td><td>\</td></tr>
									<tr><td>装箱信息费(￥)</td><td>\</td><td>10.00</td><td>\</td></tr>
									<tr><td>码头提柜费(￥)</td><td>\</td><td>75.00</td><td>\</td></tr>
									<tr><td>综合单证费(￥)</td><td>\</td><td>40.00</td><td>\</td></tr>
									<tr><td>订舱费(￥)</td><td>\</td><td>380.00</td><td>\</td></tr>
									<tr><td>码头操作费(THC)(￥)</td><td>\</td><td>1200.00</td><td>\</td></tr>
									<tr><td>打单费(￥)</td><td>\</td><td>\</td><td>\</td></tr>
									<tr><td>封条费(￥)</td><td>\</td><td>\</td><td>\</td></tr>
								</tbody>
							</table>	
							<table class="cost-info-part2">
							<tbody>
							<tr>
							<td class="col-1">电子入单费(￥): </td>
							<td>CN ￥8.00/单</td><td class="col-2">文件费(￥):</td>
							<td>CN ￥450.00/单</td>
							</tr>
									<tr><td class="col-1">舱单申报费（UR-ENS）($): </td><td>US $0.00/单</td><td class="col-2"></td><td></td></tr>
								</tbody>
								</table>
								<dl class="cost-info-des">
								<dt class="cost-info-des-title">费用说明：</dt>
									<dd>实际费用以开船后的账单为准实际费用以开船后的账单为准实际费用以开船后的账单为准实际费用以开船后的账单为准实际费用以开船后的账单为准实际费用以开船后的账单为准实际费用以开船后的账单为准</dd>
								</dl>
							</div>
<p>美金项合计：	US $26439.00</p>
<p>人民币项合计：	CN ￥19788.00</p>
<p>折合人民币总计：	CN ￥185031.75</p>
<p>（美金兑人民币参考汇率：1 : 6.25000）</p>
					</td>
				</tr>
				<tr class="split">
					<td class="ta-c"><img src="public/images/MU.png" alt="马士基" class="hipping-compay-logo">OOCL</td>
					<td class="ta-c">直达</td>
					<td class="price">520</td>
					<td class="price">1134</td>
					<td class="price">123123</td>
					<td>截:2014-12-12</td>
					<td>3天</td>
					<td>2014-120-20</td>
					<td>深圳海光国际物流有限公司</td>
					<td><a href="#" ms-widget="button" data-button-color="primary" ms-click="show('aa')">立即订舱</a></td>
				</tr>
				<tr>
					<td class="ta-c"><img src="public/images/MU.png" alt="马士基" class="hipping-compay-logo">OOCL</td>
					<td class="ta-c">直达</td>
					<td class="price">520</td>
					<td class="price">1134</td>
					<td class="price">1123</td>
					<td>截:2014-12-12</td>
					<td>3天</td>
					<td>2014-120-20</td>
					<td>深圳海光国际物流有限公司</td>
					<td><a href="#" ms-widget="button" data-button-color="primary" ms-click="show('aa')">立即订舱</a></td>
				</tr>
				<tr class="split">
					<td class="ta-c"><img src="public/images/MU.png" alt="马士基" class="hipping-compay-logo">OOCL</td>
					<td class="ta-c">直达</td>
					<td class="price">520</td>
					<td class="price">1134</td>
					<td class="price">2313</td>
					<td>截:2014-12-12</td>
					<td>3天</td>
					<td>2014-120-20</td>
					<td>深圳海光国际物流有限公司</td>
					<td><a href="#" ms-widget="button" data-button-color="primary" ms-click="show('aa')">立即订舱</a></td>
				</tr>
			</tbody>
		</table> -->
		<!-- <div ms-widget="pager" class="pagination"></div> -->
	










		<div ms-widget="dialog,aa">
			<p>{{message}}</p>
			<!-- <ul ms-widget="checkboxlist" data-checkboxlist-duplex="check1">
				<li><input type="checkbox" value="1">选项一</li>
				<li><input type="checkbox" value="2">选项二</li>
				<li><input type="checkbox" value="3">选项三</li>
			</ul> -->
		</div>
</div>

	

</body>
</html>



