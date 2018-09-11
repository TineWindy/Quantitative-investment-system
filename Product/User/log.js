$(function(){

var phone,user,pass,code;
console.log(document.cookie);

$("#phoneBtn").click(function(){
	phone = document.getElementById("phone").value;
	//console.log("'" + phone + "'");
    $.post("http://10.133.23.90:8003/api/users/code/",
    {
        phone:phone
    },
        function(data){
        console.log(data);
    });    
});

$("#su").click(function(){
	phone = document.getElementById("phone").value;
	user = document.getElementById("inputUser").value;
	pass = document.getElementById("inputPassword").value;
	code = document.getElementById("code").value;
    	$.post("http://10.133.23.90:8003/api/users/register/",
	    	{
	    		username:user,
	    		password:pass,
	    		phone:phone,
	    		code:code
	    	},
	    	function(data){
	    		console.log(data);
	    	}
    	);
 });

$("#si1").click(function(){
	user = document.getElementById("inputUser").value;
	pass = document.getElementById("inputPassword").value;
	var data = {
	    		username:user,
	    		password:pass
	    	};
	var postData = JSON.stringify(data);

    	$.ajax({
    		type : "post",
			contentType: 'application/json',
			xhrFields: {
	          withCredentials: true
	    	},
    		url : "http://10.133.23.90:8003/api/users/login_passwd/",
	    	data : postData,
	    	beforeSend : function(xhr){
	    		//xhr.setRequestHeader("Access-Control-Allow-Origin","*");
	    	},
	    	success : function(result){
	    		// console.log(data);
	    		if(result.error==0){
	    			sessionStorage.setItem("userId",result.data.uid);
	    			//console.log(data.data.access_token);
	    			//console.log("cookie:"+result.set-cookie);
	    			//sessionStorage.setItem("csrftoken",xhr.token);
	    			//console.log(sessionStorage.getItem("test"));
	    			// console.log(xhr.getAllResponseHeaders());
	    			// console.log(xhr.getResponseHeader("Server"));
	    			// console.log(xhr.getResponseHeader("Set-Cookie"));
	    			window.location.href = "../hello.html";
	    		}
	    	}
	    });

	    			
    	// $.ajax({
    	// 	type : "post",
    	// 	data : {
    	// 		username:user,
    	// 		password:pass,
    	// 	}, 
    	// 	url : "http://10.133.23.90:8003/api/users/login_passwd/",
    	// 	success:function(result){
    	// 		console.log(result.data.username);
    	// 	}
    	// })
 });

$("#si2").click(function(){
	phone = document.getElementById("phone").value;
	code = document.getElementById("code").value;

    	$.post("http://10.133.23.90:8003/api/users/login_code/",
	    	{
	    		phone:phone,
	    		code:code
	    	},
	    	function(data){
	    		console.log(data);
	    		if(data.error==0){
	    			window.location.href = "../hello.html";
	    		}
	    		else{
	    			console.log(data.error);
	    		}
	    	}
    	);
 });



})

