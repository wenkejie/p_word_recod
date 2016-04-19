var olyIm_getAccount=function (openid){
	var result;
	result={"username":"test1","password":"111111"};
	return result;
};

var olyIm_getUserStatus=function (openid){
	var result;
	result={ openid: "online"};
	return result;
};

var olyIm_Login=function(openid,nickname)
{
	var result;
	result=olyIm_getAccount(openid);
	if(result!="")
	{
		document.getElementById('imFrame').contentWindow.interFaceLogin(result.username,result.password,nickname);
	}

};

var olyIm_TalkTo=function(openid,nickname)
{
	var result;
	result=olyIm_getAccount(openid);
	if(result!="")
	{
		document.getElementById('imFrame').contentWindow.interFaceSend2Other(result.username,nickname);
	}
};

var olyIm_addNickList=function(username,nickname)
{
	var options = {
			username : username,
			nickname : nickname
		};
document.getElementById('imFrame').contentWindow.allRoster.push(options);
};

var olyIm_getNickByUsername=function(username)
{
	for ( var deluser in document.getElementById('imFrame').contentWindow.allRoster) {
			if (username == document.getElementById('imFrame').contentWindow.allRoster[deluser].username) {
				return document.getElementById('imFrame').contentWindow.allRoster[deluser].nickname;
			}
		}
		return "";
};