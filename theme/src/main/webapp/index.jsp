<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>

</head>
<body>
	<div id="max_div" ms-controller="demo4">
		<!-- data-tab-removable  是否可以删除，标签属性覆盖js 属性 -->
		<!-- <div ms-widget="tab" data-tab-removable="false"></div> -->

		<div data-tab-removable="false" ms-widget="tab,tabs,tabOpts"
			class="oni-tabs oni-widget oni-widget-content oni-corner-all">
			<ul class="oni-tabs-nav oni-helper-oni-helper-reset oni-helper-clearfix oni-widget-header oni-corner-all">
				<li class="oni-state-default oni-corner-top oni-tab-item oni-tab-active"
					data-removable="false">海运整箱</li>
				<li
					class="oni-state-default oni-corner-top oni-tab-item"
					data-removable="false">海运拼箱</li>
				<li class="oni-state-default oni-corner-top oni-tab-item">空运</li>
			</ul>
			<div>
				 <div id="efcl" class="oni-tabs-panel oni-widget-content oni-corner-bottom" style="display: none;" >
				<!-- 起运港： <input ms-widget="textbox,loadport,opts" ms-duplex="loadport"
						type="textbox" id="loadport" placeholder="NINGBO"
						data-textbox-suggest="loadport" data-textbox-limit="5" /> 
					目的港： <input
						ms-widget="textbox,dischargeport,opts" ms-duplex="dischargeport"
						type="textbox" id="dischargeport" placeholder="NINGBO"
						data-textbox-suggest="dischargeport" data-textbox-limit="5" /> -->
				</div>

				<div class="oni-tabs-panel oni-widget-content oni-corner-bottom"
					style="display: none;">
				<!-- 起运港：
							<input ms-widget="textbox,loadport,opts" ms-duplex="loadport" type="textbox" id="loadport" placeholder="NINGBO"
								data-textbox-suggest="loadport" data-textbox-limit="5" />
					目的港：
						<input ms-widget="textbox,dischargeport,opts" ms-duplex="dischargeport" type="textbox" id="dischargeport" placeholder="NINGBO"
							data-textbox-suggest="dischargeport" data-textbox-limit="5" />  -->
				</div>

				<div class="oni-tabs-panel oni-widget-content oni-corner-bottom"
					style="display: none;">
					<!--  起运港：
							<input ms-widget="textbox,loadport,opts" ms-duplex="loadport" type="textbox" id="loadport" placeholder="NINGBO"
								data-textbox-suggest="loadport" data-textbox-limit="5" />
					目的港：
						<input ms-widget="textbox,dischargeport,opts" ms-duplex="dischargeport" type="textbox" id="dischargeport" placeholder="NINGBO"
							data-textbox-suggest="dischargeport" data-textbox-limit="5" /> -->
				</div>

			</div>
		</div>





	
 		    <div  style="display: ;">
			 起运港：
			<input ms-widget="textbox,loadport,opts" ms-duplex="loadport" type="textbox" id="loadport" placeholder="NINGBO"
			data-textbox-suggest="loadport" data-textbox-limit="5" />
			
			目的港：
			<input ms-widget="textbox,dischargeport,opts" ms-duplex="dischargeport" type="textbox" id="dischargeport" placeholder="NINGBO"
			data-textbox-suggest="dischargeport" data-textbox-limit="5" />		
			</div>      
	</div>
</body>
</html>