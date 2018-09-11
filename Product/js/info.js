$(function(){

var userId = parseInt(sessionStorage.getItem("userId"));
console.log(userId);
if(userId==null){return;}
var url = "http://10.133.41.124:7777/api/users/detail/?page=" + userId;

var csrftoken = sessionStorage.getItem("csrftoken");
console.log(csrftoken);
document.cookie = "123";
console.log(document.cookie);

$.ajax({
	type : "get",
	url : url,
	xhrFields: {
          withCredentials: true
    },
	success:function(result){
		$("#aPersonInfo").html("<label> <a href='./User/userInfo.html'>" + result.data.username + "</label>");
		console.log(result.data.username);
	}
});



})