var articleArray = [];

$('#searchBtn').click(function() {
  searchLocal();
});

//Search function 
function searchLocal() {

  var user = {};
  user.act = "getArticle";
  user.title = $("input[name='search_word']").val();;

  if (user.title == "") {
    alert("Please input search word.");
  } else {

    $.ajax({
      url: "http://myweb-chunkan529713586.codeanyapp.com:5000/search.html",
      type: "POST",
      data: user,
      success: function(result) {
        //alert(result);
        //console.log(result);

        //Check if result can found or not
        if (result != "No suitable results!") {
          articleArray = result.split("|");
          articleArray.pop();

          showSearchResult();
        } else {
          alert(result);
        }
      },
      error: function(result) {
        console.log(result);
      }

    })
  }
}


//Generate search results
function showSearchResult() {

  //Prevent no serach results then clear the list
  if (articleArray.length != 0) {
    var tempstring = "";
    $('#search_result').html('');

    //alert(articleArray.length)
    //console.log(articleArray)
    for (var i = 0; i < articleArray.length; i++) {
      console.log(articleArray[i]);
      console.log(articleArray[i + 1]);
      tempstring += '<div class="col-md-10 blogShort"><h1>' + articleArray[i] + '</h1>'
      tempstring += '<article><p>' + articleArray[(i + 1)] + '</p></article>'
      tempstring += ' <a class="btn btn-blog pull-right marginBottom10" href="http://myweb-chunkan529713586.codeanyapp.com:5000/list.html">READ MORE</a></div>'
      i++;
    }
    //alert(tempstring);
    $('#search_result').append(tempstring);
  }
}