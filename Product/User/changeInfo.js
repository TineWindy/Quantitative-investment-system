$(function(){

var userId = parseInt(sessionStorage.getItem("userId"));
console.log(userId);
if(userId==null&&userId==NaN){return;}

$.ajax({
	type : "get",
	url : "http://10.133.41.124:7777/api/users/detail/",
	contentType : "application/json",
	xhrFields : {
		withCredentials : true
	},
	success : function(result){
		console.log(result);
		var firstName = result.data.first_name;
		var lastName = result.data.last_name;
		var email = result.data.email;
		var address = result.data.address;
		var major = result.data.major;
		var job = result.data.job;
		var company = result.data.company;

		// console.log(firstName);

		$("#info-firstName").val(firstName);
		$("#info-lastName").val(lastName);
		$("#info-email").val(email);
		$("#info-address").val(address);
		$("#info-major").val(major+"");
		$("#info-job").val(job+"");
		$("#info-company").val(company);		
	}
})


$("#info-confirm").click(function(){
	var firstName = $("#info-firstName").val();
	var lastName = $("#info-lastName").val();
	var email = $("#info-email").val();
	var address = $("#info-address").val();
	var major = $("#info-major").get(0).selectedIndex;
	var job = $("#info-job").get(0).selectedIndex;
	var company = $("#info-company").val();
	// console.log(email);

	var url = "http://10.133.23.90:8003/api/users/update/" + userId;
	var data = {
    		username : "hxy",
    		first_name : firstName,
    		last_name : lastName,
    		email : email,
    		address : address,
    		major : major,
    		job : job,
    		company : company
    	};
    putData = JSON.stringify(data);

	$.ajax({
		type : "put",
		url : "http://10.133.41.124:7777/api/users/update/4/",
		contentType: 'application/json',
		xhrFields: {
          withCredentials: true
    	},
    	data : putData,
    	beforeSend: function(xhr, settings) {
    	},
		success:function(result){
			alert("Infomation Confirmed");
		}
	})

	//console.log(firstName+" "+major);
})

})