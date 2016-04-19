
/* Path : /{org_name}/{app_name}/token
	HTTP Method : POST
	URL Params ： 无
	Request Headers : {“Content-Type”:”application/json”}
	Request Body ： {“grant_type”: “client_credentials”,”client_id”: “{app的client_id}”,”client_secret”: “{app的client_secret}”}
	*/
function getToken(){
	var d = {
		grant_type:"client_credentials",
		client_id:"YXA6RtJ68Hj0EeSm5rH7xD-OKA",
		client_secret:"YXA6eoAGGpzj28fT1byjo-Llxdcxqwk"
	}
	var token="";
	$.ajax({
		url:"https://a1.easemob.com/olymtech/chatdemoui/token",
		type:"POST",
		headers:{'Content-Type':'application/json'},
		data:JSON.stringify(d),
		async:false,
		dataType:"json",
		success:function(data){
			token=data.access_token;
			//console.log(data);
		},
		error:function(e){
			//console.log(e);
		}
	});
	return token;
}

/**
 * 根据userId查看该用户是否是IM用户
 * @param token
 */
function checkUser(token){
	console.log(token);
	$.ajax({
		url:"https://a1.easemob.com/olymtech/chatdemoui/users/12405740574",
		type:"GET",
		headers:{"Authorization":"Bearer "+token,'Content-Type':'application/json'},
		async:false,
		success:function(data){
			console.log(data);
		},
		error:function(e){
			console.log("出错啦！！");
			//sendMsg(getToken());
		}
	});
}
var register = function(username,password,nickname){
	/*	Path : /{org_name}/{app_name}/users
	HTTP Method : POST
	URL Params ： 无
	Request Headers : {“Content-Type”:”application/json”}
	Request Body ： {“username”:”${用户名}”,”password”:”${密码}”, “nickname”:”${昵称值}”}
	// 创建用户时候username 和password是必须的, nickname是可选的. 
	//如果要在创建用户时设置nickname, 请求body是: {“username”:”jliu”,”password”:”123456”, “nickname”:”建国”} 这种形式, 
	*/
	//注册IM用户
	var d = {
		"username":username,"password":password,"nickname":nickname
	};
	$.ajax({
		url:"https://a1.easemob.com/olymtech/chatdemoui/users",
		type:"POST",
		headers:{'Content-Type':'application/json'},
		data:JSON.stringify(d),
		async:false,
		success:function(data){
			console.log(data);
		},
		error:function(e){
			//console.log(e);
		}
	});
};
/**
 * 发送文本消息
 * @param token
 */
function sendMsg(token){
	var d = {
		 "target_type" : "users", 
		 "target" : ["test"], 
		 "msg" : {
			 "type" : "txt",
		     "msg" : "hello from rest"
		 },
		 "from" : "cjy", 
		 "ext" : {
			 "attr1" : "v1",
		     "attr2" : "v2"
		 }  
	};
	$.ajax({
		url:"https://a1.easemob.com/olymtech/chatdemoui/messages",
		type:"POST",
		headers:{'Content-Type':'application/json',"Authorization":"Bearer "+token},
		data:JSON.stringify(d),
		async:false,
		success:function(data){
			console.log("消息发送成功！！");
		},
		error:function(e){
			//console.log(e);
		}
	});
}

/**
 * 查看用户在线状态
 * Response:
 * {
    "action": "get",
    "application": "4d7e4ba0-dc4a-11e3-90d5-e1ffbaacdaf5",
    "params": {},
    "uri": "https://a1.easemob.com/easemob-demo/chatdemoui",
    "entities": [],
    "data": {
        "stliu": "online"  //注意, 这里返回的是用户名和在线状态的键值对, 值为 online 或者 offline
    },
    "timestamp": 1404932199220,
    "duration": 743,
    "organization": "easemob-demo",
    "applicationName": "chatdemoui"
   }
 */
var checkUserOnlineStatus = function(token,username){
	console.log(token);
	$.ajax({
		url:"https://a1.easemob.com/olymtech/chatdemoui/users/"+username+"/status",
		type:"GET",
		headers:{"Content-Type":'application/json',"Authorization":"Bearer "+token},
		async:false,
		success:function(data){
			console.log(data.data);
		},
		error:function(e){
			//console.log(e);
		}
	});
}
/**
 * 取聊天记录
 */
var getChatMessage = function (token){
	console.log(token);
	$.ajax({
		url:"https://a1.easemob.com/olymtech/chatdemoui/chatmessages",
		type:"GET",
		headers:{"Content-Type":'application/json',"Authorization":"Bearer "+token},
		async:false,
		success:function(data){
			console.log(data);
		},
		error:function(e){
			//console.log(e);
		}
	});

}