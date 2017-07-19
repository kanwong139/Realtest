
//Set left div height
//$("#leftHeight").css({"height":$("#rightHeight").height()});



$(function() {
	
			var statWord = "";
			var loginUrl = "";
			var loginIcon = ""; 
			//localStorage.removeItem("isLogin");
 			var isLogin = localStorage.getItem("isLogin");
	
      // Show username on top left coner if login
			if (typeof(Storage) != "undefined") {
				checkLogin(isLogin);
				// Code for localStorage/sessionStorage.
				//alert("Code for localStorage/sessionStorage.")
			} else {
				// Sorry! No Web Storage support..
				//alert("Sorry! No Web Storage support..")
			}
  		
			
			$("#footerAll").load("./footer.html");                        
			$("#loginOrLogout").html('<a href='+ loginUrl +'><span class="'+loginIcon+'"></span><span> ' +statWord+ '</span></a></li>');
			//
			function checkLogin(isLogin){
								
				//alert("Logined : " + isLogin);
				$("#login_as").html("")
				
				if(isLogin == null || isLogin == "" ){
					statWord = " Login";
					loginUrl = "http://myweb-chunkan529713586.codeanyapp.com:5000/login.html";
					loginIcon = "glyphicon glyphicon-log-in";
				}else {
					statWord = " Logout";
					loginUrl = "http://myweb-chunkan529713586.codeanyapp.com:5000/logout.html";
					loginIcon = "glyphicon glyphicon-log-out";
					$("#login_as").html('<span>Wellcome, ' + localStorage.getItem("LoginAs") + '</span>')
				}
				
				//alert(localStorage.getItem("LoginAs"));
			}
})