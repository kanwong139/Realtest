$(function() {
	$('.form').find('input, textarea').on('keyup blur focus', function(e) {

		var $this = $(this),
			label = $this.prev('label');

		if (e.type === 'keyup') {
			if ($this.val() === '') {
				label.removeClass('active highlight');
			} else {
				label.addClass('active highlight');
			}
		} else if (e.type === 'blur') {
			if ($this.val() === '') {
				label.removeClass('active highlight');
			} else {
				label.removeClass('highlight');
			}
		} else if (e.type === 'focus') {

			if ($this.val() === '') {
				label.removeClass('highlight');
			} else if ($this.val() !== '') {
				label.addClass('highlight');
			}
		}

	});

	$('.tab a').on('click', function(e) {

		e.preventDefault();

		$(this).parent().addClass('active');
		$(this).parent().siblings().removeClass('active');

		target = $(this).attr('href');

		$('.tab-content > div').not(target).hide();

		$(target).fadeIn(1000);

	});

	//Login button handle login progress
	$("#loginBtn").click(function(e) {
		$(function() {
			var user = {};
			user.act = "login";
			user.ac = $("input[name='log_ac']").val();
			user.pw = $("input[name='log_pw']").val();
			//alert(user.ac);

			// check if ac and pw is null
			if (user.ac == "" || user.pw == "") {
				alert("Nothing");
			} else {

				var xhr = $.ajax({
					url: "http://myweb-chunkan529713586.codeanyapp.com:5000/login.html",
					type: "POST",
					data: user,
					success: function(result) {

						console.log(result);

						//add login status to local storage & redirect
						if (result == "LOGIN OK") {
							alert(result);
							localStorage.setItem("LoginAs", user.ac);
							localStorage.setItem("isLogin", true);
							window.location.replace("http://myweb-chunkan529713586.codeanyapp.com:5000/index.html");
						} else {
							alert(result);
							xhr.abort();
						}
						if (result.status == 200) {
							console.log("hope can see here");
						}
					},
					error: function(result) {
						console.log(result);
					}

				})
			}
			return false;
		});
	});

		//Signup button handle signup progress
	$("#sign_upBtn").click(function(e) {
		var user = {};
		user.act = "signup";
		user.ac = $("input[name='ac']").val();
		user.pw = $("input[name='pw']").val();
		user.email = $("input[name='email']").val();
		//alert(user.ac);
		if (user.ac == "" || user.pw == "" || $("input[name='re_pw']").val() == "" || user.email == "") {
			alert("Please input all infomration!");
		} else if ($("input[name='re_pw']").val() != user.pw) {
			alert("Please input same password at repeat password!");
		} else {
			var xhr = $.ajax({
				url: "http://myweb-chunkan529713586.codeanyapp.com:5000/login.html",
				type: "POST",
				data: user,
				success: function(result) {
					alert("User has been create!")
					//alert(result);
					console.log(result);
					if (result.status == 200) {
						console.log("hope can see here");
					}
					xhr.abort();
				},
				error: function(result) {
					console.log(result);
				}
			});
		}
		return false;
	});
})