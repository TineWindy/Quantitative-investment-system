

var articleString = "";

// function transP(obj){
// 	var pString = "";
// 	for(var i = 0;i<obj.children.length;i++){
// 		if(typeof(obj.children[i])=="object"){
// 			//检测子元素是否带有加粗等属性
// 			for(var j = 0;j<obj.children[i].attrs.length;j++){
// 				switch(obj.children[i].attrs[j].value){
// 					case "font-weight:bold":
// 						h2String += "<b>" + obj.children[i].children[0] + "</b>";
// 						break;
// 					case "font-style:italic":
// 						h2String += "<i>" + obj.children[i].children[0] + "</i>";
// 						breaj;
// 					default:
// 						break;
// 				}
// 			}
// 		}
// 		else{
// 			pString = pString + obj.children[i];
// 		}
// 	}
// 	var p = "<p>" + pString + "</p>";
// 	return p;
// }

// function transH2(obj){
// 	var h2String = "";
// 	for(var i = 0;i<obj.children.length;i++){
// 		if(typeof(obj.children[i])=="object"){
// 			//检测子元素是否带有加粗等属性
// 			for(var j = 0;j<obj.children[i].attrs.length;j++){
// 				switch(obj.children[i].attrs[j].value){
// 					case "font-weight:bold":
// 						h2String += "<b>" + obj.children[i].children[0] + "</b>";
// 						break;
// 					case "font-style:italic":
// 						h2String += "<i>" + obj.children[i].children[0] + "</i>";
// 						breaj;
// 					default:
// 						break;
// 				}
// 			}
// 		}
// 		else{
// 			h2String += obj.children[i];
// 		}
// 	}
// 	var h2 = "<h2 class='section-heading'>" + h2String + "</h2>";
// 	return h2;
// }

function trans(obj){
	//obj为json格式
	var htmlCode = "";
	for(var i = 0;i<obj.children.length;i++){
		if(typeof(obj.children[i])=="string"){
			htmlCode += obj.children[i];
		}
		else if(typeof(obj.children[i])=="object"){
			htmlCode += trans(obj.children[i]);
		}
	}
	var attrCode = "";
	for(var i = 0;i<obj.attrs.length;i++){
		attrCode += " " + obj.attrs[i].name + "=" + "'" + obj.attrs[i].value + "'";
	}
	var classCode = "";
	switch(obj.tag){
		case "h2":
			classCode += " class='section-heading'";
			break;
		case "br":
			return "<br>";
		default:
	}
	h = "<" + obj.tag + classCode + attrCode + ">" + htmlCode + "</" + obj.tag + ">";
	return h;
}
  
function transToHtml(json){
	//json是json格式
	var jsonStr = json;
	var htmlString = "";
	//console.log(jsonStr);

	for(var i = 0;i<jsonStr.length;i++){
		htmlString += trans(jsonStr[i]);
	}

	return htmlString;
}

var cliked = 0;

function like(pid){

	var but = document.getElementById("art-like");
	var btn = but.innerHTML;
	var len = btn.length;
	var likeNum = parseInt(btn[len-1]);
	
		$.ajax({
			type : "post",
			url : "http://10.133.23.90:8003/api/posts/likes/post/",
			//http://10.133.23.90:8003/
			//contenType : "application/json",
			xhrFields: {
		          withCredentials: true
		    },
		    data : {
		    	post : pid,
		    	userprefer : 1
		    },
		    success : function(result){
		    	console.log("Success to like!");
		    	likeNum++;
		    }

		});
	var neww = btn.replace(btn[len-1],likeNum);
	but.innerHTML = neww;

}

function dislike(pid){
	var but = document.getElementById("art-like");
	var btn = but.innerHTML;
	var len = btn.length;
	var likeNum = parseInt(btn[len-1]);
	
		$.ajax({
			type : "post",
			url : "http://10.133.23.90:8003/api/posts/likes/post/",
			//contenType : "application/json",
			xhrFields: {
		          withCredentials: true
		    },
		    data : {
		    	post : pid,
		    	userprefer : -1
		    },
		    success : function(result){
		    	console.log("Success to like!");
		    	likeNum--;
		    }

		});
	var neww = btn.replace(btn[len-1],likeNum);
	but.innerHTML = neww;
}


function publishArticle(title,article,tags){
	//para article,title is string,tags string array
	var tag = "";
	for(var i = 0;i<tags.length;i++){
		if(i!=0){
			tag+=";";
		}
		tag += tags[i];
	}
	var data = {
		title : title,
		content : article,
		tag : tag
	}
	var artData = JSON.stringify(data);
	console.log(artData);
	$.ajax({
		type : "post",
		url : "http://10.133.23.90:8003/api/posts/publish/",
		contenType : "application/json",
		xhrFields: {
	          withCredentials: true
	    },
	    data : data,
	    success : function(result){
	    	console.log(result.error);
	    	window.location.href = "./article.html";
	    }
	});
}

function loadArticle(artId){
	var url = "http://10.133.23.90:8003/api/posts/detail/" + artId;
	var jsonStr,title,author,time;
	$.ajax({
		type : "get",
		url : url,
		//contenType : "application/json",
		xhrFields: {
	          withCredentials: true
	    },
	    success : function(result){
	    	console.log(result.error);
	    	jsonStr = result.content;
	    	json = JSON.parse(jsonStr);
	    	title = result.title;
	    	author = result.username;
	    	time = result.created_at.slice(0,10);
	    	console.log();
	    	$("#art-body").html(transToHtml(json));
	    	$("#art-title").html(title);
	    	$("#art-author").text("Written by " + author + " ," + time);
	    }
	})
}



function comment(pid,comment){
	$.ajax({
		type : "post",
		url : "http://10.133.23.90:8003/api/posts/comments/post/",
		//contenType : "application/json",
		xhrFields: {
	          withCredentials: true
	    },
	    data : {
	    	post : pid,
	    	content : comment
	    },
	    success : function(result){
	    	console.log("Success to comment!");
	    }
	});
}


function loadComment(pid){
	$.ajax({
		type : "get",
		url : "http://10.133.23.90:8003/api/posts/comments/" + pid,
		//contenType : "application/json",
		xhrFields: {
	          withCredentials: true
	    },
	    success : function(result){
	    	var allComments = "";
	    	console.log("All comments get!");
	    	for(var i = 0;i<result.length;i++){
	    		var content = result[i].content;
	    		var userprefer = result[i].userprefer;
	    		var time = result[i].created_at;
	    		var user = result[i].user;
	    		var username;


	    		$.ajax({
	    			type : "get",
	    			url : user,
	    			async : false,
	    			xhrFields : {
	    				withCredentials : true
	    			},
	    			success : function(result){
	    				username = result.data.username;
	    				//console.log(username);
	    			}
	    		});
	    		console.log(username);

	    		var comment = "<div class='card comment' ><div class='card-header row'><a class='navbar-brand col-md-1' href='#''><img src='../imgs/logo.png' width='36' height='36' class='mr-sm-2'></a><div class='col-md-6 row'><span>" + username + "</div></div><div class='card-body'><p class='card-text'>" + content + "</p><button class='btn btn-outline-secondary commentLike'>Agree" + userprefer + "</button><span style='font-size: 15px;float: right;'>" + time + "</span> </div></div>";
	    		//var artComment = $("#art-comment").html() + comment;
	    		//$("#art-comment").html(artComment);
	    		allComments += comment;

	    	}
	    	$("#art-comment").html(allComments);
	    }
	});
}





//////////////////////////////////////////////////
