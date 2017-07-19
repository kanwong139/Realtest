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

	$("#addArtBtn").click(function(e) {
		$(function() {
			var user = {};
			user.act = "setArticle";
			user.title = $("input[name='art_title']").val();
			user.content = $("input[name='art_content']").val();
			//alert(user.ac);
			
			// check if ac and pw is null
			if (user.title == "" || user.content == "") {
				alert("Nothing");
			}else {
			
				$.ajax({
					url: "http://myweb-chunkan529713586.codeanyapp.com:5000/add_search_item.html",
					type: "POST",
					data: user,
					success: function (result) {
							alert(result);
							console.log(result);

								//add login status to local storage & redirect
																
								if(result.status == 200){
									console.log("hope can see here");
									window.location.replace("http://myweb-chunkan529713586.codeanyapp.com:5000/add_search_item.html");
								}
						},
						error: function(result){
								console.log(result);
						} 
        
			})}
			return false;
		});
	});

})