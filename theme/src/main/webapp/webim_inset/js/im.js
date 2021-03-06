﻿var apiURL = null;
	var curUserId = null;
	var curChatUserId = null;
	var conn = null;
	var curRoomId = null;
	var msgCardDivId = "chat01";
	var talkToDivId = "talkTo";
	var talkInputId = "talkInputId";
	var fileInputId = "fileInput";
	var bothRoster = [];
	var toRoster = [];
	var maxWidth = 200;
	var listRoom = [];
	var listRoomId = [];
	var groupFlagMark = "group--";
	var groupQuering = false;
	var textSending = false;
	var curChatToNickName;
	var curUserNickName;
	var mememberRegistUrl="http://shen.qa.com/cpmembership/regist.ctrl?$action=registOneView";
	var mememberLoginUrl="http://shen.qa.com/cpmembership/commonLog.ctrl";

	var allRoster = [];//所有联系人

	var blinkStep=0;
	var parentTitle="";//提示信息//
	//结构如下

	///
	/*
	var options = {
			username : user,
			nickname : nickname
		};
	*/
	////////////////

	//var appkey = "easemob-demo#chatdemoui";
	var appkey = "leos-olymtech#testim";
	var time = 0;

	window.URL = window.URL || window.webkitURL || window.mozURL
			|| window.msURL;
	var getLoginInfo = function() {
		return {
			isLogin : false
		};
	};

	var showMini = function() {

		$('#divPanel').css({
			"display" : ""
		});

		

var divChild = document.getElementById("divPanel");
var mainChild = document.getElementById("content");

		divChild.style.left=mainChild.style.left;//"160px";//$('#content').style.left;//"160px";//因为offsetLeft是只读属性所以要通过left属性设置。而且还要设置绝对定位。
  divChild.style.top=mainChild.style.top-25;//
	};


var hideMini = function() {

		$('#divPanel').css({
			"display" : "none"
		});
	};
	var showLoginUI = function() {
		return;
		$('#loginmodal').modal('show');
		$('#username').focus();
	};
	var hiddenLoginUI = function() {
		$('#loginmodal').modal('hide');
	};
	var showWaitLoginedUI = function() {
		return;
		$('#waitLoginmodal').modal('show');
	};
	var hiddenWaitLoginedUI = function() {
		$('#waitLoginmodal').modal('hide');
	};
	var showChatUI = function() {
		$('#content').css({
			"display" : "block"
		});
		var login_userEle = document.getElementById("login_user").children[0];
		//xxf
		login_userEle.innerHTML = curUserNickName;//curUserId;
		login_userEle.setAttribute("title", curUserNickName);

 $('#min').css({
			"display" : ""
		});
	};
	//登录之前不显示web对话框
	var hiddenChatUI = function() {
		$('#content').css({
			"display" : "none"
		});
		document.getElementById(talkInputId).value = "";
	};
	//定义消息编辑文本域的快捷键，enter和ctrl+enter为发送，alt+enter为换行
	//控制提交频率
	$(function() {
		$("textarea").keydown(function(event) {
			if (event.altKey && event.keyCode == 13) {
				e = $(this).val();
				$(this).val(e + '\n');
			} else if (event.ctrlKey && event.keyCode == 13) {
				//e = $(this).val();
				//$(this).val(e + '<br>');
				event.returnValue = false;
				sendText();
				return false;
			} else if (event.keyCode == 13) {
				event.returnValue = false;
				sendText();
				return false;
			}

		});
	});
	//easemobwebim-sdk注册回调函数列表
	$(document).ready(function() {





		conn = new Easemob.im.Connection();
		//初始化连接
		conn.init({
			https : false,
			//当连接成功时的回调方法
			onOpened : function() {
				handleOpen(conn);
				$("#notlogin").hide();
				$("#sendbutton").show();
			},
			//当连接关闭时的回调方法
			onClosed : function() {
				handleClosed();
			},
			//收到文本消息时的回调方法
			onTextMessage : function(message) {
				handleTextMessage(message);
			},
			//收到表情消息时的回调方法
			onEmotionMessage : function(message) {
				handleEmotion(message);
			},
			//收到图片消息时的回调方法
			onPictureMessage : function(message) {
				handlePictureMessage(message);
			},
			//收到音频消息的回调方法
			onAudioMessage : function(message) {
				handleAudioMessage(message);
			},
			onLocationMessage : function(message) {
				handleLocationMessage(message);
			},
			//收到联系人订阅请求的回调方法
			onPresence : function(message) {
				handlePresence(message);
			},
			//收到联系人信息的回调方法
			onRoster : function(message) {
				handleRoster(message);
			},
			//收到群组邀请时的回调方法
			onInviteMessage : function(message) {
				handleInviteMessage(message);
			},
			//异常时的回调方法
			onError : function(message) {
				handleError(message);
			}
		});
		var loginInfo = getLoginInfo();
		if (loginInfo.isLogin) {
			showWaitLoginedUI();
		} else {
			showLoginUI();
		}
		//发送文件的模态窗口
		$('#fileModal').on('hidden.bs.modal', function(e) {
			var ele = document.getElementById(fileInputId);
			ele.value = "";
			if (!window.addEventListener) {
				ele.outerHTML = ele.outerHTML;
			}
			document.getElementById("fileSend").disabled = false;
			document.getElementById("cancelfileSend").disabled = false;
		});

		$('#addFridentModal').on('hidden.bs.modal', function(e) {
			var ele = document.getElementById("addfridentId");
			ele.value = "";
			if (!window.addEventListener) {
				ele.outerHTML = ele.outerHTML;
			}
			document.getElementById("addFridend").disabled = false;
			document.getElementById("cancelAddFridend").disabled = false;
		});

		$('#delFridentModal').on('hidden.bs.modal', function(e) {
			var ele = document.getElementById("delfridentId");
			ele.value = "";
			if (!window.addEventListener) {
				ele.outerHTML = ele.outerHTML;
			}
			document.getElementById("delFridend").disabled = false;
			document.getElementById("canceldelFridend").disabled = false;
		});

		$('#confirm-block-div-modal').on('hidden.bs.modal', function(e) {

		});

		$('#option-room-div-modal').on('hidden.bs.modal', function(e) {

		});

		$('#notice-block-div').on('hidden.bs.modal', function(e) {

		});

		$('#regist-div-modall').on('hidden.bs.modal', function(e) {

		});

		//在 密码输入框时的回车登录
		$('#password').keypress(function(e) {
			var key = e.which;
			if (key == 13) {
				login();
			}
		});

		$(function() {
			$(window).bind('beforeunload', function() {
				if (conn) {
					conn.close();
				}
			});
		});
	});

	//处理连接时函数,主要是登录成功后对页面元素做处理
	var handleOpen = function(conn) {
		//从连接中获取到当前的登录人注册帐号名
		curUserId = conn.context.userId;
		//获取当前登录人的联系人列表
		conn.getRoster({
			success : function(roster) {
				// 页面处理
				hiddenWaitLoginedUI();
				showChatUI();

				//createContactlistUL();
				var curroster;
				for ( var i in roster) {
					var ros = roster[i];
					///////////xxf
					var options = {
			username : roster[i].name,
			nickname : roster[i].name
		};

		if(roster[i].name!=''&&ros.subscription!='none')
			allRoster.push(options);

		document.getElementById('min_msg_tip').innerHTML = '联系人 ( '+ allRoster.length +" )";
					////////////xxf
					//both为双方互为好友，要显示的联系人,from我是对方的单向好友
					if (ros.subscription == 'both'
							|| ros.subscription == 'from') {
						bothRoster.push(ros);
					} else if (ros.subscription == 'to') {
						//to表明了联系人是我的单向好友
						toRoster.push(ros);
					}
				}
				if (bothRoster.length > 0) {
					curroster = bothRoster[0];
					buildContactDiv("contractlist", bothRoster);//联系人列表页面处理
					if (curroster)
						setCurrentContact(curroster.name);//页面处理将第一个联系人作为当前聊天div
				}
				//获取当前登录人的群组列表
				conn.listRooms({
					success : function(rooms) {
						if (rooms && rooms.length > 0) {
							buildListRoomDiv("contracgrouplist", rooms);//群组列表页面处理
							if (curChatUserId == null) {
								setCurrentContact(groupFlagMark
										+ rooms[0].roomId);
								$('#accordion2').click();
							}
						}
						conn.setPresence();//设置用户上线状态，必须调用
					},
					error : function(e) {

					}
				});
			}
		});

	};


	//连接中断时的处理，主要是对页面进行处理
	var handleClosed = function() {

		curUserId = null;
		curChatUserId = null;
		curRoomId = null;
		bothRoster = [];
		allRoster = [];
		toRoster = [];
		listRoom = [];
		listRoomId = [];
		hiddenChatUI();
		clearContactUI("contactlistUL", "contactgrouplistUL",
				"momogrouplistUL", msgCardDivId);

		showLoginUI();
		groupQuering = false;
		textSending = false;
	};
	//easemobwebim-sdk中收到联系人订阅请求的处理方法，具体的type值所对应的值请参考xmpp协议规范
	var handlePresence = function(e) {
		//（发送者希望订阅接收者的出席信息），即别人申请加你为好友
		if (e.type == 'subscribe') {
			if (e.status) {
				if (e.status.indexOf('resp:true') > -1) {
					agreeAddFriend(e.from);
					return;
				}
			}
			var subscribeMessage = e.from + "请求加你为好友。\n验证消息：" + e.status;
			showNewNotice(subscribeMessage);
			$('#confirm-block-footer-confirmButton').click(function() {
				//同意好友请求
				agreeAddFriend(e.from);//e.from用户名
				//反向添加对方好友
				conn.subscribe({
					to : e.from,
					message : "[resp:true]"
				});
				$('#confirm-block-div-modal').modal('hide');
			});









			$('#confirm-block-footer-cancelButton').click(function() {
				rejectAddFriend(e.from);//拒绝加为好友
				$('#confirm-block-div-modal').modal('hide');
			});
			return;
			
		}
		//(发送者允许接收者接收他们的出席信息)，即别人同意你加他为好友
		if (e.type == 'subscribed') {
			toRoster.push({
				name : e.from,
				jid : e.fromJid,
				subscription : "to"
			});
			return;
		}
		//（发送者取消订阅另一个实体的出席信息）,即删除现有好友
		if (e.type == 'unsubscribe') {
			//单向删除自己的好友信息，具体使用时请结合具体业务进行处理
			delFriend(e.from);
			return;
		}
		//（订阅者的请求被拒绝或以前的订阅被取消），即对方单向的删除了好友
		if (e.type == 'unsubscribed') {
			delFriend(e.from);
			return;
		}
	};
	//easemobwebim-sdk中处理出席状态操作
	var handleRoster = function(rosterMsg) {
		for (var i = 0; i < rosterMsg.length; i++) {
			var contact = rosterMsg[i];
			if (contact.ask && contact.ask == 'subscribe') {
				continue;
			}
			if (contact.subscription == 'to') {
				toRoster.push({
					name : contact.name,
					jid : contact.jid,
					subscription : "to"
				});
			}
			//app端删除好友后web端要同时判断状态from做删除对方的操作
			if (contact.subscription == 'from') {
				toRoster.push({
					name : contact.name,
					jid : contact.jid,
					subscription : "from"
				});
			}
			if (contact.subscription == 'both') {
				var isexist = contains(bothRoster, contact);
				if (!isexist) {
					var lielem = $('<li>').attr({
						"id" : contact.name,
						"class" : "offline",
						"className" : "offline"
					}).click(function() {
						chooseContactDivClick(this);
					});
					$('<img>').attr({
						"src" : "img/head/contact_normal.png"
					}).appendTo(lielem);
					//$('<span>').html(contact.name).appendTo(lielem);
					$('#contactlistUL').append(lielem);
					bothRoster.push(contact);
				}
			}
			if (contact.subscription == 'remove') {
				var isexist = contains(bothRoster, contact);
				if (isexist) {
					removeFriendDomElement(contact.name);
				}
			}
		}
	};
	//异常情况下的处理方法
	var handleError = function(e) {
		if (curUserId == null) {
			hiddenWaitLoginedUI();
			alert(e.msg + ",请重新登录");
			showLoginUI();
		} else {
			var msg = e.msg;
			if (e.type == EASEMOB_IM_CONNCTION_SERVER_CLOSE_ERROR) {
				if (msg == "") {
					alert("服务器器断开连接,可能是因为在别处登录");
				} else {
					alert("服务器器断开连接");
				}
			} else {
				alert(msg);
			}
		}
	};
	//判断要操作的联系人和当前联系人列表的关系
	var contains = function(roster, contact) {
		var i = roster.length;
		while (i--) {
			if (roster[i].name === contact.name) {
				return true;
			}
		}
		return false;
	};

	Array.prototype.indexOf = function(val) {
		for (var i = 0; i < this.length; i++) {
			if (this[i].name == val.name)
				return i;
		}
		return -1;
	};
	Array.prototype.remove = function(val) {
		var index = this.indexOf(val);
		if (index > -1) {
			this.splice(index, 1);
		}
	};

	//登录系统时的操作方法
	var login = function() {
		var user = "frankb";//$("#username").val();
		var pass = "123456";//$("#password").val();
		if (user == '' || pass == '') {
			alert("请输入用户名和密码");
			return;
		}


		
		hiddenLoginUI();

		var number = Math.random();number = Math.ceil(number * 100); 
		//根据用户名密码登录系统
		conn.open({
			apiUrl : apiURL,
			user : user,
			pwd : pass,
			appKey : appkey,//,//连接时提供appkey
			resource:number
		   // accessToken : 'YWMt8bfZfFk5EeSiAzsQ0OXu4QAAAUpoZFOMJ66ic5m2LOZRhYUsRKZWINA06HI'
		});
		/**/
		return false;
	};

	//注册新用户操作方法
	var regist = function() {
		var user = $("#regist_username").val();
		var pass = $("#regist_password").val();
		var nickname = $("#regist_nickname").val();
		if (user == '' || pass == '' || nickname == '') {
			alert("用户名/密码/昵称 不能为空");
			return;
		}
		var options = {
			username : user,
			password : pass,
			nickname : nickname,
			appKey : appkey,
			success : function(result) {
				alert("注册成功!");
				$('#loginmodal').modal('show');
				$('#regist-div-modal').modal('hide');
			},
			error : function(e) {
				alert(e.error);
			}
		};
		Easemob.im.Helper.registerUser(options);
	};

	//注册页面返回登录页面操作
	var showlogin = function() {
		$('#loginmodal').modal('show');
		$('#regist-div-modal').modal('hide');
	};

	var logout = function() {
		conn.close();
	};

	//设置当前显示的聊天窗口div，如果有联系人则默认选中联系人中的第一个联系人，如没有联系人则当前div为null-nouser
	var setCurrentContact = function(defaultUserId) {

if(defaultUserId==curChatUserId)
return;

		showContactChatDiv(defaultUserId);
		if (curChatUserId != null) {
			hiddenContactChatDiv(curChatUserId);
		} else {
			$('#null-nouser').css({
				"display" : "none"
			});
		}
		curChatUserId = defaultUserId;
	};

	//构造联系人列表
	var buildContactDiv = function(contactlistDivId, roster) {
		var uielem = document.getElementById("contactlistUL");
		var cache = {};
		for (i = 0; i < roster.length; i++) {
			if (!(roster[i].subscription == 'both' || roster[i].subscription == 'from')) {
				continue;
			}
			var jid = roster[i].jid;

			var userName = jid.substring(jid.indexOf("_") + 1).split("@")[0];
			if (userName in cache) {
				continue;
			}
			cache[userName] = true;
			var lielem = $('<li>').attr({
				'id' : userName,
				'class' : 'offline',
				'className' : 'offline',
				'type' : 'chat',
				'displayName' : userName
			}).click(function() {
				chooseContactDivClick(this);
			});
			$('<img>').attr("src", "img/head/contact_normal.png").appendTo(
					lielem);
			$('<span>').html(userName).appendTo(lielem);
			$('#contactlistUL').append(lielem);
		}
		var contactlist = document.getElementById(contactlistDivId);
		var children = contactlist.children;
		if (children.length > 0) {
			contactlist.removeChild(children[0]);
		}
		contactlist.appendChild(uielem);
	};

	//构造群组列表
	var buildListRoomDiv = function(contactlistDivId, rooms) {
		var uielem = document.getElementById("contactgrouplistUL");
		var cache = {};
		for (i = 0; i < rooms.length; i++) {
			var roomsName = rooms[i].name;
			var roomId = rooms[i].roomId;
			listRoomId.push(roomId);
			if (roomId in cache) {
				continue;
			}
			cache[roomId] = true;
			var lielem = $('<li>').attr({
				'id' : groupFlagMark + roomId,
				'class' : 'offline',
				'className' : 'offline',
				'type' : 'groupchat',
				'displayName' : roomsName,
				'roomId' : roomId,
				'joined' : 'false'
			}).click(function() {
				chooseContactDivClick(this);
			});
			$('<img>').attr({
				'src' : 'img/head/group_normal.png'
			}).appendTo(lielem);
			$('<span>').html(roomsName).appendTo(lielem);
			$('#contactgrouplistUL').append(lielem);
		}
		var contactlist = document.getElementById(contactlistDivId);
		var children = contactlist.children;
		if (children.length > 0) {
			contactlist.removeChild(children[0]);
		}
		contactlist.appendChild(uielem);
	};

	//选择联系人的处理
	var getContactLi = function(chatUserId) {
		return document.getElementById(chatUserId);
	};

	//构造当前聊天记录的窗口div
	var getContactChatDiv = function(chatUserId) {
		return document.getElementById(curUserId + "-" + chatUserId);
	};

	//如果当前没有某一个联系人的聊天窗口div就新建一个
	var createContactChatDiv = function(chatUserId) {
		var msgContentDivId = curUserId + "-" + chatUserId;
		var newContent = document.createElement("div");
		$(newContent).attr({
			"id" : msgContentDivId,
			"class" : "chat01_content",
			"className" : "chat01_content",
			"style" : "display:none"
		});
		return newContent;
	};

	//显示当前选中联系人的聊天窗口div，并将该联系人在联系人列表中背景色置为蓝色
	var showContactChatDiv = function(chatUserId) {
		var contentDiv = getContactChatDiv(chatUserId);
		if (contentDiv == null) {
			contentDiv = createContactChatDiv(chatUserId);
			document.getElementById(msgCardDivId).appendChild(contentDiv);
		}
		contentDiv.style.display = "block";
		var contactLi = document.getElementById(chatUserId);
		if (contactLi == null) {
			return;
		}
		contactLi.style.backgroundColor = "#DEF0FE";
		contactLi.style.borderRadius = "3px";
		contactLi.style.color = "#214f78";
		var dispalyTitle = null;//聊天窗口显示当前对话人名称
		if (chatUserId.indexOf(groupFlagMark) >= 0) {
			dispalyTitle = "群组" + $(contactLi).attr('displayname') + "聊天中";
			curRoomId = $(contactLi).attr('roomid');
			$("#roomMemberImg").css('display', 'block');
		} else {
			//dispalyTitle = "与" + chatUserId + "聊天中";
			//xxf
			dispalyTitle =  $(contactLi).attr('displayname')+ " - <span class='friend-status-online'>在线<span class='status-icon'></span></span>";
			$("#roomMemberImg").css('display', 'none');
		}

		document.getElementById(talkToDivId).children[0].innerHTML = dispalyTitle;
	};
	//对上一个联系人的聊天窗口div做隐藏处理，并将联系人列表中选择的联系人背景色置空
	var hiddenContactChatDiv = function(chatUserId) {
		var contactLi = document.getElementById(chatUserId);
		if (contactLi) {
			contactLi.style.backgroundColor = "";
			contactLi.style.color = "";
			contactLi.style.borderRadius = "";
			contactLi.children[0].src = 'img/head/contact_normal.png';
		}
		var contentDiv = getContactChatDiv(chatUserId);
		if (contentDiv) {
			contentDiv.style.display = "none";

		}

	};
	//切换联系人聊天窗口div
	var chooseContactDivClick = function(li) {
		//alert("click");
		var chatUserId = li.id;
		if ($(li).attr("type") == 'groupchat'
				&& ('true' != $(li).attr("joined"))) {
			conn.join({
				roomId : $(li).attr("roomId")
			});
			$(li).attr("joined", "true");
		}
		if (chatUserId != curChatUserId) {
			if (curChatUserId == null) {
				showContactChatDiv(chatUserId);
			} else {
				showContactChatDiv(chatUserId);
				hiddenContactChatDiv(curChatUserId);
			}
			curChatUserId = chatUserId;
		}
		//对默认的null-nouser div进行处理,走的这里说明联系人列表肯定不为空所以对默认的聊天div进行处理
		$('#null-nouser').css({
			"display" : "none"
		});
		var badgespan = $(li).children(".badge");
		if (badgespan && badgespan.length > 0) {
			li.removeChild(li.children[2]);
		}

		//点击有未读消息对象时对未读消息提醒的处理
		var badgespanGroup = $(li).parent().parent().parent().find(".badge");
		if (badgespanGroup && badgespanGroup.length == 0) {
			$(li).parent().parent().parent().prev().children().children()
					.remove();
		}
	};

	var clearContactUI = function(contactlistUL, contactgrouplistUL,
			momogrouplistUL, contactChatDiv) {
		//清除左侧联系人内容
		$('#contactlistUL').empty();
		$('#contactgrouplistUL').empty();
		$('#momogrouplistUL').empty();

		//处理联系人分组的未读消息处理
		var accordionChild = $('#accordionDiv').children();
		for (var i = 1; i <= accordionChild.length; i++) {
			var badgegroup = $('#accordion' + i).find(".badgegroup");
			if (badgegroup && badgegroup.length > 0) {
				$('#accordion' + i).children().remove();
			}
		}
		;

		//清除右侧对话框内容
		document.getElementById(talkToDivId).children[0].innerHTML = "";
		var chatRootDiv = document.getElementById(contactChatDiv);
		var children = chatRootDiv.children;
		for (var i = children.length - 1; i > 1; i--) {
			chatRootDiv.removeChild(children[i]);
		}
		$('#null-nouser').css({
			"display" : "block"
		});
	};

	var emotionFlag = false;
	var showEmotionDialog = function() {
		if (emotionFlag) {
			$('#wl_faces_box').css({
				"display" : "block"
			});
			$(".chat02_title_btn").addClass("ctb01-active");
			return;
		}
		emotionFlag = true;
		// Easemob.im.Helper.EmotionPicData设置表情的json数组
		var sjson = Easemob.im.Helper.EmotionPicData;
		for ( var key in sjson) {
			var emotions = $('<img>').attr({
				"id" : key,
				"src" : sjson[key],
				"style" : "cursor:pointer;"
			}).click(function() {
				selectEmotionImg(this);
			});
			$('<li>').append(emotions).appendTo($('#emotionUL'));
		}
		$('#wl_faces_box').css({
			"display" : "block"
		});
	};
	//表情选择div的关闭方法
	var turnoffFaces_box = function() {
		$("#wl_faces_box").fadeOut("slow");
		$(".chat02_title_btn").removeClass("ctb01-active");
	};
	var selectEmotionImg = function(selImg) {
		var txt = document.getElementById(talkInputId);
		txt.value = txt.value + selImg.id;
		txt.focus();
	};
	var showSendPic = function() {
		$('#fileModal').modal('toggle');
		$('#sendfiletype').val('pic');
		$('#send-file-warning').html("");
	};
	var showSendAudio = function() {
		$('#fileModal').modal('toggle');
		$('#sendfiletype').val('audio');
		$('#send-file-warning').html("");
	};

	var hideChatDlg=function(){
		//$("#content").slideToggle(100,showMini());//,showLoginUI());
		$("#content").hide();
		//$("#chatRight").slideToggle(1500);//
	return;
	}

	var showChatDlg=function(){
		$("#content").show();
		//$("#content").slideToggle(100,hideMini());//,showLoginUI());
		//$("#chatRight").slideToggle(1500);//
	return;
	}

var interFaceLogin=function(userName,userPsw,userNickName)
	{
		curUserNickName=userNickName;
		var number = Math.random();number = Math.ceil(number * 100); 
		//根据用户名密码登录系统
		conn.open({
			apiUrl : apiURL,
			user : userName,
			pwd : userPsw,
			appKey : appkey,//,//连接时提供appkey
			resource:number
		   // accessToken : 'YWMt8bfZfFk5EeSiAzsQ0OXu4QAAAUpoZFOMJ66ic5m2LOZRhYUsRKZWINA06HI'
		});

		//$("#main").show();

	}
///////////////////////////////////
var interFaceSend2Other=function(chatUserId,nickName)
	{
//xxf
		showChatDlg();
		var user;
		user=chatUserId;
		if (validateFriend(user, bothRoster))
		{
			setCurrentContact(user);//页面处理将第一个联系人作为当前聊天div
			sendText();

		}
		else
		{
			if(curUserId==user)
			{
				alert("不要给自己发了好么……");
			}
			else
			{
				var contactLi = getContactLi(user);
				if (contactLi == null) {
					var uielem = document.getElementById("contactlistUL");
					var jid = "";//roster[i].jid;
					var lielem = $('<li>').attr({
						'id' : user,
						'class' : 'offline',
						'className' : 'offline',
						'type' : 'chat',
						'displayName' : nickName
					}).click(function() {
						chooseContactDivClick(this);
					});
					$('<img>').attr("src", "img/head/contact_normal.png").appendTo(
							lielem);
					//$('<span>').html(user).appendTo(lielem);
					$('<span>').html(nickName).appendTo(lielem);
					$('#contactlistUL').append(lielem);

				var contactlist = document.getElementById("contractlist");
				var children = contactlist.children;
				if (children.length > 0) {
					contactlist.removeChild(children[0]);
				}
				contactlist.appendChild(uielem);

				var options = {
					username : user,
					nickname : nickName
					};
					allRoster.push(options);

					document.getElementById('min_msg_tip').innerHTML = '联系人 ( '+ allRoster.length +" )";

				}
				else
				{
					//alert("临时好友");
				}
				setCurrentContact(user);//页面处理将第一个联系人作为当前聊天div
				
				sendText();

			}
			
		}

	};
///////////////////////////////////


var Send2Other=function()
{
var user;
user=document.getElementById("searchfriendNickName").value;
if (validateFriend(user, bothRoster))
{
	alert("已经是好友，直接发送");
	setCurrentContact(user);//页面处理将第一个联系人作为当前聊天div


	sendText();
	//alert("发送");

}
else
{
	if(curUserId==user)
	{
		alert("不要给自己发了好么……");
	}
	else
	{
		
		



//bothRoster.push(ros);
/*
buildContactDiv("contractlist", bothRoster);//联系人列表页面处理

*/

var contactLi = getContactLi(user);
			if (contactLi == null) {
//alert("还不是好友");
				var uielem = document.getElementById("contactlistUL");

			var jid = "";//roster[i].jid;
			var lielem = $('<li>').attr({
				'id' : user,
				'class' : 'offline',
				'className' : 'offline',
				'type' : 'chat',
				'displayName' : user
			}).click(function() {
				chooseContactDivClick(this);
			});
			$('<img>').attr("src", "img/head/contact_normal.png").appendTo(
					lielem);
			$('<span>').html(user).appendTo(lielem);
			$('#contactlistUL').append(lielem);


		var contactlist = document.getElementById("contractlist");
		var children = contactlist.children;
		if (children.length > 0) {
			contactlist.removeChild(children[0]);
		}
		contactlist.appendChild(uielem);

				}
				else
				{
					//alert("临时好友");
				}



		setCurrentContact(user);//页面处理将第一个联系人作为当前聊天div


sendText();

	}
}
		
	}

	var sendText = function() {

		if (textSending) {
			//alert("未发成功，等待");
			return;
		}
		textSending = true;

		var msgInput = document.getElementById(talkInputId);
		var msg = msgInput.value;

		if (msg == null || msg.length == 0) {
			//alert("空，不发送");
			textSending=false;
			return;
		}
		var to = curChatUserId;

		///check if is in Roster

		//////////////////////
		//alert(curChatUserId);
		if (to == null) {
			textSending=false;
			return;
		}
		var options = {
			to : to,
			msg : msg,
			type : "chat",
			ext : curUserNickName
		};
		// 群组消息和个人消息的判断分支
		if (curChatUserId.indexOf(groupFlagMark) >= 0) {
			options.type = 'groupchat';
			options.to = curRoomId;
		}
		//easemobwebim-sdk发送文本消息的方法 to为发送给谁，meg为文本消息对象
		conn.sendTextMessage(options);

		//当前登录人发送的信息在聊天窗口中原样显示
		var msgtext = msg.replace(/\n/g, '<br>');
		//xxf
		appendMsg(curUserNickName, to, msgtext);
		//appendMsg(curUserId, to, msgtext);
		turnoffFaces_box();
		msgInput.value = "";
		msgInput.focus();

		setTimeout(function() {
			textSending = false;
		}, 1000);
	};

	var pictype = {
		"jpg" : true,
		"gif" : true,
		"png" : true,
		"bmp" : true
	};
	var sendFile = function() {
		var type = $("#sendfiletype").val();
		if (type == 'pic') {
			sendPic();
		} else {
			sendAudio();
		}
	};
	//发送图片消息时调用方法
	var sendPic = function() {
		var to = curChatUserId;
		if (to == null) {
			return;
		}
		// Easemob.im.Helper.getFileUrl为easemobwebim-sdk获取发送文件对象的方法，fileInputId为 input 标签的id值
		var fileObj = Easemob.im.Helper.getFileUrl(fileInputId);
		if (fileObj.url == null || fileObj.url == '') {
			$('#send-file-warning')
					.html("<font color='#FF0000'>请选择发送图片</font>");
			return;
		}
		var filetype = fileObj.filetype;
		var filename = fileObj.filename;
		if (filetype in pictype) {
			document.getElementById("fileSend").disabled = true;
			document.getElementById("cancelfileSend").disabled = true;
			var opt = {
				type : 'chat',
				fileInputId : fileInputId,
				to : to,
				ext : curUserNickName,
				onFileUploadError : function(error) {
					$('#fileModal').modal('hide');
					var messageContent = error.msg + ",发送图片文件失败:" + filename;
					appendMsg(curUserNickName, to, messageContent);
				},
				onFileUploadComplete : function(data) {
					$('#fileModal').modal('hide');
					var file = document.getElementById(fileInputId);
					if (file && file.files) {
						var objUrl = getObjectURL(file.files[0]);
						if (objUrl) {
							var img = document.createElement("img");
							img.src = objUrl;
							img.width = maxWidth;
						}
					}
					appendMsg(curUserNickName, to, {
						data : [ {
							type : 'pic',
							filename : filename,
							data : img
						} ]
					});
				}
			};

			if (curChatUserId.indexOf(groupFlagMark) >= 0) {
				opt.type = 'groupchat';
				opt.to = curRoomId;
			}
			opt.apiUrl = apiURL;
			conn.sendPicture(opt);
			return;
		}
		$('#send-file-warning').html(
				"<font color='#FF0000'>不支持此图片类型" + filetype + "</font>");
	};
	var audtype = {
		"mp3" : true,
		"wma" : true,
		"wav" : true,
		"amr" : true,
		"avi" : true
	};
	//发送音频消息时调用的方法
	var sendAudio = function() {
		var to = curChatUserId;
		if (to == null) {
			return;
		}
		//利用easemobwebim-sdk提供的方法来构造一个file对象
		var fileObj = Easemob.im.Helper.getFileUrl(fileInputId);
		if (fileObj.url == null || fileObj.url == '') {
			$('#send-file-warning')
					.html("<font color='#FF0000'>请选择发送音频</font>");
			return;
		}
		var filetype = fileObj.filetype;
		var filename = fileObj.filename;
		if (filetype in audtype) {
			document.getElementById("fileSend").disabled = true;
			document.getElementById("cancelfileSend").disabled = true;
			var opt = {
				type : "chat",
				fileInputId : fileInputId,
				to : to,//发给谁
				ext : curUserNickName,
				onFileUploadError : function(error) {
					$('#fileModal').modal('hide');
					var messageContent = error.msg + ",发送音频失败:" + filename;
					appendMsg(curUserNickName, to, messageContent);
				},
				onFileUploadComplete : function(data) {
					var messageContent = "发送音频" + filename;
					$('#fileModal').modal('hide');
					appendMsg(curUserNickName, to, messageContent);
				}
			};
			//构造完opt对象后调用easemobwebim-sdk中发送音频的方法
			if (curChatUserId.indexOf(groupFlagMark) >= 0) {
				opt.type = 'groupchat';
				opt.to = curRoomId;
			}
			opt.apiUrl = apiURL;
			conn.sendAudio(opt);
			return;
		}
		$('#send-file-warning').html(
				"<font color='#FF0000'>不支持此音频类型" + filetype + "</font>");
	};
	//easemobwebim-sdk收到文本消息的回调方法的实现
	var handleTextMessage = function(message) {
		var from = message.from;//消息的发送者
		var mestype = message.type;//消息发送的类型是群组消息还是个人消息
		var messageContent = message.data;//文本消息体
		//TODO  根据消息体的to值去定位那个群组的聊天记录
		var room = message.to;
		var nickNameShow;
		if(message.ext!='')
		{
			nickNameShow=message.ext;
		}
		else
		{
			nickNameShow=from;
		}


		if (mestype == 'groupchat') {
			appendMsg(message.from, message.to, messageContent, mestype);
		} else {
			appendMsg(nickNameShow, from, messageContent);
		}
	};
	//easemobwebim-sdk收到表情消息的回调方法的实现，message为表情符号和文本的消息对象，文本和表情符号sdk中做了
	//统一的处理，不需要用户自己区别字符是文本还是表情符号。
	var handleEmotion = function(message) {
		var from = message.from;
		var room = message.to;
		var mestype = message.type;//消息发送的类型是群组消息还是个人消息

		var nickNameShow;
		if(message.ext!='')
		{
			nickNameShow=message.ext;
		}
		else
		{
			nickNameShow=from;
		}
		if (mestype == 'groupchat') {
			appendMsg(message.from, message.to, message, mestype);
		} else {

				appendMsg(nickNameShow, from, message);
		}

	};
	//easemobwebim-sdk收到图片消息的回调方法的实现
	var handlePictureMessage = function(message) {
		var filename = message.filename;//文件名称，带文件扩展名
		var from = message.from;//文件的发送者
		var mestype = message.type;//消息发送的类型是群组消息还是个人消息
		var contactDivId = from;
		if (mestype == 'groupchat') {
			contactDivId = groupFlagMark + message.to;
		}
		var options = message;
		// 图片消息下载成功后的处理逻辑
		options.onFileDownloadComplete = function(response, xhr) {
			var objectURL = window.URL.createObjectURL(response);
			img = document.createElement("img");
			img.onload = function(e) {
				img.onload = null;
				window.URL.revokeObjectURL(img.src);
			};
			img.onerror = function() {
				img.onerror = null;
				if (typeof FileReader == 'undefined') {
					img.alter = "当前浏览器不支持blob方式";
					return;
				}
				img.onerror = function() {
					img.alter = "当前浏览器不支持blob方式";
				};
				var reader = new FileReader();
				reader.onload = function(event) {
					img.src = this.result;
				};
				reader.readAsDataURL(response);
			}
			img.src = objectURL;
			var pic_real_width = options.width;

            var nickNameShow;
			if(message.ext!='')
			{
				nickNameShow=message.ext;
			}
			else
			{
				nickNameShow=from;
			}


			if (pic_real_width == 0) {
				$("<img/>").attr("src", objectURL).load(function() {
					pic_real_width = this.width;
					if (pic_real_width > maxWidth) {
						img.width = maxWidth;
					} else {
						img.width = pic_real_width;
					}
					appendMsg(nickNameShow, contactDivId, {
						data : [ {
							type : 'pic',
							filename : filename,
							data : img
						} ]
					});

				});
			} else {
				if (pic_real_width > maxWidth) {
					img.width = maxWidth;
				} else {
					img.width = pic_real_width;
				}
				appendMsg(nickNameShow, contactDivId, {
					data : [ {
						type : 'pic',
						filename : filename,
						data : img
					} ]
				});
			}
		};
		options.onFileDownloadError = function(e) {
			appendMsg(nickNameShow, contactDivId, e.msg + ",下载图片" + filename + "失败");
		};
		//easemobwebim-sdk包装的下载文件对象的统一处理方法。
		Easemob.im.Helper.download(options);
	};

	//easemobwebim-sdk收到音频消息回调方法的实现
	var handleAudioMessage = function(message) {
		var filename = message.filename;
		var filetype = message.filetype;
		var from = message.from;

		var nickNameShow;
		if(message.ext!='')
		{
			nickNameShow=message.ext;
		}
		else
		{
			nickNameShow=from;
		}

		var mestype = message.type;//消息发送的类型是群组消息还是个人消息
		var contactDivId = from;
		if (mestype == 'groupchat') {
			contactDivId = groupFlagMark + message.to;
		}
		var options = message;
		options.onFileDownloadComplete = function(response, xhr) {
			var objectURL = window.URL.createObjectURL(response);
			var audio = document.createElement("audio");
			if (("src" in audio) && ("controls" in audio)) {
				audio.onload = function() {
					audio.onload = null;
					window.URL.revokeObjectURL(audio.src);
				};
				audio.onerror = function() {
					audio.onerror = null;
					appendMsg(nickNameShow, contactDivId, "当前浏览器不支持播放此音频:" + filename);
				};
				audio.controls = "controls";
				audio.src = objectURL;
				appendMsg(nickNameShow, contactDivId, {
					data : [ {
						type : 'audio',
						filename : filename,
						data : audio
					} ]
				});
				//audio.play();
				return;
			}
		};
		options.onFileDownloadError = function(e) {
			appendMsg(nickNameShow, contactDivId, e.msg + ",下载音频" + filename + "失败");
		};
		options.headers = {
			"Accept" : "audio/mp3"
		};
		Easemob.im.Helper.download(options);
	};

	var handleLocationMessage = function(message) {
		var from = message.from;
		var to = message.to;
		var mestype = message.type;
		var content = message.addr;
		if (mestype == 'groupchat') {
			appendMsg(from, to, content, mestype);
		} else {
			appendMsg(from, from, content, mestype);
		}
	};

	var handleInviteMessage = function(message) {
		var type = message.type;
		var from = message.from;
		var roomId = message.roomid;

		//获取当前登录人的群组列表
		conn.listRooms({
			success : function(rooms) {
				if (rooms) {
					for (i = 0; i < rooms.length; i++) {
						var roomsName = rooms[i].name;
						var roomId = rooms[i].roomId;
						var existRoom = $('#contactgrouplistUL').children(
								'#group--' + roomId);
						if (existRoom && existRoom.length == 0) {
							var lielem = $('<li>').attr({
								'id' : groupFlagMark + roomId,
								'class' : 'offline',
								'className' : 'offline',
								'type' : 'groupchat',
								'displayName' : roomsName,
								'roomId' : roomId,
								'joined' : 'false'
							}).click(function() {
								chooseContactDivClick(this);
							});
							$('<img>').attr({
								'src' : 'img/head/group_normal.png'
							}).appendTo(lielem);
							$('<span>').html(roomsName).appendTo(lielem);
							$('#contactgrouplistUL').append(lielem);
							//return;
						}
					}
					//cleanListRoomDiv();//先将原群组列表中的内容清除，再将最新的群组列表加入
					//buildListRoomDiv("contracgrouplist", rooms);//群组列表页面处理
				}
			},
			error : function(e) {
			}
		});

	};
	var cleanListRoomDiv = function cleanListRoomDiv() {
		$('#contactgrouplistUL').empty();
	};

	//收到陌生人消息时创建陌生人列表
	var createMomogrouplistUL = function createMomogrouplistUL(contact,who, message) {

		var momogrouplistUL = document.getElementById("contactlistUL");
		//xxf
		//var momogrouplistUL = document.getElementById("momogrouplistUL");
		var cache = {};

		if (contact in cache) {
			return;
		}
		cache[contact] = true;

		var displayName;
		if(who!='')
		{
			displayName=who;
		}
		else
		{
			displayName=contact;
		}
		var lielem = document.createElement("li");
		$(lielem).attr({
			'id' : contact,
			'class' : 'offline',
			'className' : 'offline',
			'type' : 'chat',
			'displayName' : displayName
		});
		lielem.onclick = function() {
			chooseContactDivClick(this);
		};
		var imgelem = document.createElement("img");
		imgelem.setAttribute("src", "img/head/contact_normal.png");
		lielem.appendChild(imgelem);

		var spanelem = document.createElement("span");
		spanelem.innerHTML = displayName;
		lielem.appendChild(spanelem);

		momogrouplistUL.appendChild(lielem);

		var options = {
			username : contact,
			nickname : displayName
		};
		allRoster.push(options);


	};

	//xxf 未读消息闪烁
	var messageBlink=function messageBlink()
	{
		 blinkStep++;
         if(blinkStep==3)
		 {
			 document.getElementById('min_msg_tip').innerHTML = '联系人 ( '+ allRoster.length +" )";
			 $('#min_msg').removeClass("minsize_msg_blue");
			 window.parent.document.title=parentTitle;
			 blinkStep=1;
		 }
         else if(blinkStep==1)
		 {
			parentTitle= window.parent.document.title;
			window.parent.document.title='';
		 }
         else if(blinkStep==2)
		 {
			 $('#min_msg').addClass("minsize_msg_blue");
			 window.parent.document.title='你有未读新消息，请注意查收';
		 }

		var o =document.getElementById("content").style.display;
		if(o=="none")
		{
			setTimeout("messageBlink()",500);
		}
		else
		{
			blinkStep=0;
			document.getElementById('min_msg_tip').innerHTML = '联系人 ( '+ allRoster.length +" )";
			$('#min_msg').removeClass("minsize_msg_blue");
			window.parent.document.title=parentTitle;
		}


         
	}
	//显示聊天记录的统一处理方法//xxf 显示消息
	//who 为昵称 contact 为id
	var appendMsg = function(who, contact, message, chattype) {

		var o =document.getElementById("content").style.display;
		if(o=="none")
		{
			//闪起来
			messageBlink();
		}


		var contactUL = document.getElementById("contactlistUL");
		var contactDivId = contact;
		if (chattype && chattype == 'groupchat') {
			contactDivId = groupFlagMark + contact;
		}
		var contactLi = getContactLi(contactDivId);
		if (contactLi == null) {

			createMomogrouplistUL(contact,who, message);
		}

		// 消息体 {isemotion:true;body:[{type:txt,msg:ssss}{type:emotion,msg:imgdata}]}
		var localMsg = null;
		if (typeof message == 'string') {
			localMsg = Easemob.im.Helper.parseTextMessage(message);
			localMsg = localMsg.body;
		} else {
			localMsg = message.data;
		}
		var headstr;
		if (curUserNickName == who)
		{
			headstr= [ "<div class='chat-content-p1'>" + who + "(我)    <span></span>" + "   </div>",
				"<div class='chat-content-p2'>" + getLoacalTimeString() + "<b></b><br/></div>" ];
		}
		else
		{
			headstr= [ "<div class='chat-content-p1'>" + who + "  <span></span>" + "   </div>",
				"<div class='chat-content-p2'>" + getLoacalTimeString() + "<b></b><br/></div>" ];
		}

		var header = $(headstr.join(''))

		var lineDiv = document.createElement("div");
		for (var i = 0; i < header.length; i++) {
			var ele = header[i];
			lineDiv.appendChild(ele);
		}
		var messageContent = localMsg;
		for (var i = 0; i < messageContent.length; i++) {
			var msg = messageContent[i];
			var type = msg.type;
			var data = msg.data;
			if (type == "emotion") {
				var eletext = "<div class='chat-content-p3'><img class='msg-head' src='img/head/msg_head_default.png'/><div class='chat-content-box'><div class='chat-content-text'><img src='" + data + "'/></div><span class='msg-my-arrow1'>◆</span><span class='msg-my-arrow2'>◆</span></div></div>";
				var ele = $(eletext);
				for (var j = 0; j < ele.length; j++) {
					lineDiv.appendChild(ele[j]);
				}
			} else if (type == "pic") {
				var filename = msg.filename;
				var fileele = $("<div>" + filename + "</div><br>");
				for (var j = 0; j < fileele.length; j++) {
					lineDiv.appendChild(fileele[j]);
				}
				lineDiv.appendChild(data);
			} else if (type == 'audio') {
				var filename = msg.filename;
				var fileele = $("<div>" + filename + "</div><br>");
				for (var j = 0; j < fileele.length; j++) {
					lineDiv.appendChild(fileele[j]);
				}
				lineDiv.appendChild(data);
			} else {
				var eletext = "<div><img class='msg-head' src='img/head/msg_head_default.png'/><div class='chat-content-box'><div class='chat-content-text'>" + data + "</div><span class='msg-my-arrow1'>◆</span><span class='msg-my-arrow2'>◆</span></div></div>";
				var ele = $(eletext);
				ele[0].setAttribute("class", "chat-content-p3");
				ele[0].setAttribute("className", "chat-content-p3");
				if (curUserNickName == who) {
					ele[0].style.backgroundColor = "#EBEBEB";
				}
				for (var j = 0; j < ele.length; j++) {
					lineDiv.appendChild(ele[j]);
				}
			}
		}
		if (curChatUserId == null && chattype == null) {
			setCurrentContact(contact);
			if (time < 1) {
				//xxf
				time++;
			}


		}
		if (curChatUserId && curChatUserId.indexOf(contact) < 0) {
			var contactLi = getContactLi(contactDivId);
			if (contactLi == null) {
				return;
			}
			//contactLi.style.backgroundColor = "#f5e0c8";
			contactLi.children[0].src = "img/head/contact_normal_msg.png";
			var badgespan = $(contactLi).children(".badge");
			if (badgespan && badgespan.length > 0) {
				var count = badgespan.text();
				var myNum = new Number(count);
				myNum++;
				badgespan.text(myNum);

			} else {
				$(contactLi).append('<span class="badge">1</span>');
			}
			//联系人不同分组的未读消息提醒
			var badgespanGroup = $(contactLi).parent().parent().parent().prev()
					.children().children(".badgegroup");
			if (badgespanGroup && badgespanGroup.length == 0) {
				$(contactLi).parent().parent().parent().prev().children()
						.append('<span class="badgegroup">New</span>');
			}

		}
		var msgContentDiv = getContactChatDiv(contactDivId);
		if (curUserNickName == who) {
			lineDiv.className = "msg-my";
		} else {
			lineDiv.className = "msg-friend";
		}
		var create = false;
		if (msgContentDiv == null) {
			msgContentDiv = createContactChatDiv(contactDivId);
			create = true;
		}
		msgContentDiv.appendChild(lineDiv);
		if (create) {
			document.getElementById(msgCardDivId).appendChild(msgContentDiv);
		}
		msgContentDiv.scrollTop = msgContentDiv.scrollHeight;


		////
		//显示联系人个数
		if (allRoster)
		{
			if(allRoster.length>0)
			{
				for (var i = 0; i < allRoster.length; i++)
				{
					//allRoster[i].username；
					//allRoster[i].nickname;
					//alert(allRoster[i].username + " " + allRoster[i].nickname);
				}
			//alert(allRoster.length);
			//xxf
			document.getElementById('min_msg_tip').innerHTML = '联系人 ( '+ allRoster.length +" )";
			}
		}
		/////
		return lineDiv;

	};

	var showAddFriend = function() {
		$('#addFridentModal').modal('toggle');
		$('#addfridentId').val('好友账号');//输入好友账号
		$('#add-frident-warning').html("");
	};

	//添加输入框鼠标焦点进入时清空输入框中的内容
	var clearInputValue = function(inputId) {
		$('#' + inputId).val('');
	};

	var showDelFriend = function() {
		$('#delFridentModal').modal('toggle');
		$('#delfridentId').val('好友账号');//输入好友账号
		$('#del-frident-warning').html("");
	};

	//消息通知操作时条用的方法
	var showNewNotice = function(message) {
		$('#confirm-block-div-modal').modal('toggle');
		$('#confirm-block-footer-body').html(message);
	};

	var showWarning = function(message) {
		$('#notice-block-div').modal('toggle');
		$('#notice-block-body').html(message);
	};

	//主动添加好友操作的实现方法
	var startAddFriend = function() {
		var user = $('#addfridentId').val();
		if (user == '') {
			$('#add-frident-warning').html(
					"<font color='#FF0000'> 请输入好友名称</font>");
			return;
		}
		if (bothRoster)
			for (var i = 0; i < bothRoster.length; i++) {
				if (bothRoster[i].name == user) {
					$('#add-frident-warning').html(
							"<font color='#FF0000'> 已是您的好友</font>");
					return;
				}
			}
		//发送添加好友请求
		conn.subscribe({
			to : user,
			message : "加个好友呗-" + getLoacalTimeString()
		});
		$('#addFridentModal').modal('hide');
		return;
	};

	//回调方法执行时同意添加好友操作的实现方法
	var agreeAddFriend = function(user) {
		conn.subscribed({
			to : user,
			message : "[resp:true]"
		});
	};
	//拒绝添加好友的方法处理
	var rejectAddFriend = function(user) {
		conn.unsubscribed({
			to : user,
			message : getLoacalTimeString()
		});
	};

	//直接调用删除操作时的调用方法
	var directDelFriend = function() {
		var user = $('#delfridentId').val();
		if (validateFriend(user, bothRoster)) {
			conn.removeRoster({
				to : user,
				success : function() {
					conn.unsubscribed({
						to : user
					});
					//删除操作成功时隐藏掉dialog
					$('#delFridentModal').modal('hide');
				},
				error : function() {
					$('#del-frident-warning').html(
							"<font color='#FF0000'>删除联系人失败!</font>");
				}
			});
		} else {
			$('#del-frident-warning').html(
					"<font color='#FF0000'>该用户不是你的好友!</font>");
		}
	};
	//判断要删除的好友是否在当前好友列表中
	var validateFriend = function(optionuser, bothRoster) {
		for ( var deluser in bothRoster) {
			if (optionuser == bothRoster[deluser].name) {
				return true;
			}
		}
		return false;
	};

	//回调方法执行时删除好友操作的方法处理
	var delFriend = function(user) {
		conn.removeRoster({
			to : user,
			groups : [ 'default' ],
			success : function() {
				conn.unsubscribed({
					to : user
				});
			}
		});
	};
	var removeFriendDomElement = function(userToDel, local) {
		var contactToDel;
		if (bothRoster.length > 0) {
			for (var i = 0; i < bothRoster.length; i++) {
				if (bothRoster[i].name == userToDel) {
					contactToDel = bothRoster[i];
					break;
				}
			}
		}
		if (contactToDel) {
			bothRoster.remove(contactToDel);
		}
		// 隐藏删除好友窗口
		if (local) {
			$('#delFridentModal').modal('hide');
		}
		//删除通讯录
		$('#' + userToDel).remove();
		//删除聊天
		var chatDivId = curUserId + "-" + userToDel;
		var chatDiv = $('#' + chatDivId);
		if (chatDiv) {
			chatDiv.remove();
		}
		if (curChatUserId != userToDel) {
			return;
		} else {
			var displayName = '';
			//将第一个联系人作为当前聊天div
			if (bothRoster.length > 0) {
				curChatUserId = bothRoster[0].name;
				$('#' + curChatUserId).css({
					"background-color" : "#DEF0FE",
					"border-radius" : "3px",
					"color" : "#214f78"
				});
				var currentDiv = getContactChatDiv(curChatUserId)
						|| createContactChatDiv(curChatUserId);
				document.getElementById(msgCardDivId).appendChild(currentDiv);
				$(currentDiv).css({
					"display" : "block"
				});
				displayName = '与' + $(currentDiv).attr('displayname') + '聊天中fff';
				//displayName = '与' + curChatUserId + '聊天中';
			} else {
				$('#null-nouser').css({
					"display" : "block"
				});
				displayName = '';
			}
			$('#talkTo').html('<a href="#">' + displayName + '</a>');
		}
	};

	//清除聊天记录
	var clearCurrentChat = function clearCurrentChat() {
		var currentDiv = getContactChatDiv(curChatUserId)
				|| createContactChatDiv(curChatUserId);
		currentDiv.innerHTML = "";
	};

	//显示成员列表
	var showRoomMember = function showRoomMember() {
		if (groupQuering) {
			return;
		}
		groupQuering = true;
		queryOccupants(curRoomId);
	};

	//根据roomId查询room成员列表
	var queryOccupants = function queryOccupants(roomId) {
		var occupants = [];
		conn.queryRoomInfo({
			roomId : roomId,
			success : function(occs) {
				if (occs) {
					for (var i = 0; i < occs.length; i++) {
						occupants.push(occs[i]);
					}
				}
				conn.queryRoomMember({
					roomId : roomId,
					success : function(members) {
						if (members) {
							for (var i = 0; i < members.length; i++) {
								occupants.push(members[i]);
							}
						}
						showRoomMemberList(occupants);
						groupQuering = false;
					},
					error : function() {
						groupQuering = false;
					}
				});
			},
			error : function() {
				groupQuering = false;
			}
		});
	};

	var showRoomMemberList = function showRoomMemberList(occupants) {
		var list = $('#room-member-list')[0];
		var childs = list.childNodes;
		for (var i = childs.length - 1; i >= 0; i--) {
			list.removeChild(childs.item(i));
		}
		for (i = 0; i < occupants.length; i++) {
			var jid = occupants[i].jid;
			var userName = jid.substring(jid.indexOf("_") + 1).split("@")[0];
			var txt = $("<p></p>").text(userName);
			$('#room-member-list').append(txt);
		}
		$('#option-room-div-modal').modal('toggle');
	};

	var showRegist = function showRegist() {
		$('#loginmodal').modal('hide');
		$('#regist-div-modal').modal('toggle');
	};

	var getObjectURL = function getObjectURL(file) {
		var url = null;
		if (window.createObjectURL != undefined) { // basic
			url = window.createObjectURL(file);
		} else if (window.URL != undefined) { // mozilla(firefox)
			url = window.URL.createObjectURL(file);
		} else if (window.webkitURL != undefined) { // webkit or chrome
			url = window.webkitURL.createObjectURL(file);
		}
		return url;
	};
	var getLoacalTimeString = function getLoacalTimeString() {
		var date = new Date();
		var time = date.getHours() + ":" + date.getMinutes() + ":"
				+ date.getSeconds();
		return time;
	}


var showContent = function showContent()
{
	$("#content").show();
}


var hideContent = function hideContent()
{
	$("#content").hide();
}

var disconnectIm = function disconnectIm()
{
	//alert("Clsoe");
	conn.close();
}
$(function(){
	var uiIm = $("#ui-im");
	$("#main").show();
	$("#minbutton").click(function(){
		$("#content").hide();
		uiIm.css({width:'auto',height:'auto'});
	});
	$("#min").click(function(){
		$("#content").show();
		uiIm.css({width:'705px',height:'486px'});
	});
});