
function getAllTags(){
	var url = "http://10.133.23.90:8003/api/posts/tags/?page=";
	//var i = 1;
	var pages = 10;
	var tags = new Array();
	var sum = 0;
	for(var i = 1;i<=pages;i++){
		$.ajax({
			type : "get",
			xhrFields : {
		    				withCredentials : true
		    			},
		    url : url + i,
		    async : false,
		    success(result){
		    	if(result.error!=0){
		    	}
		    	else{
		    		pages = result.pages;
		    		for(var j = 0;j<result.data.length;j++){
		    			tags[sum] = result.data[j].name;
		    			//console.log(tags[sum]);
		    			sum++;
		    		}
		    	}
		    }
		});
		//i++;
		//console.log(i);
		//if(i==10){break;}
	}
	return tags;
}

function loadTagCheckbox(){
	var tags = getAllTags();
	var checkboxs = "";
	for(var i = 0;i<tags.length;i++){
		if(i%5==0){
			checkboxs+="<div class='input-group mb-3 container'><div class='input-group-prepend'>";
		}
		checkboxs += "<div class='input-group-text'>" + tags[i] + "<input type='checkbox' aria-label='Checkbox for following text input' value='" + i + "' name='" + tags[i] + "'> </div>";
		if(i%5==4){
			checkboxs+="</div></div>";
		}
		
	}
	$("#write-tag").html(checkboxs);
}


function getTagCheckbox(){
	var tags = new Array();
	var sum = 0;
	$('input:checkbox').each(function(){ 
		if($(this).prop("checked")==true){
			tags[sum]=parseInt($(this).attr("value")) + 1;
			//console.log(tags[sum]);
			sum++;
		};
	}); 
	return tags;
}