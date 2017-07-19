//Check if user is logined, retrieve favorite list data
if (localStorage.getItem('LoginAs') == null || localStorage.getItem('LoginAs') === undefined) {
  for (var i = 0; i <= 9; i++) {
    localStorage.setItem('favList' + i, false);
    //alert(localStorage.getItem('favList' + i))
  }
}