    //Initial Data of list page
    var addedToFav = [false, false, false, false, false, false, false, false, false, false];

    var listTitle = [" Spot imposters. ",
      " Do online searches. ",
      " Don’t believe your caller ID. ",
      " Don’t pay upfront for a prsomise. ",
      " Consider how you pay. ",
      " Talk to someone. ",
      " Hang up on robocalls.",
      " Be skeptical about free trial offers. ",
      " Don’t deposit a check and wire money back. ",
      " Sign up for free scam alerts from the FTC at ftc.gov/scams."
    ];
    var listItem = ["Scammers often pretend to be someone you trust, like a government official, a family member, a charity, or a company you do business with. Don’t send money or give out personal information in response to an unexpected request — whether it comes as a text, a phone call, or an email.",
      "Type a company or product name into your favorite search engine with words like “review,” “complaint” or “scam.” Or search for a phrase that describes your situation, like “IRS call.” You can even search for phone numbers to see if other people have reported them as scams.",
      "Technology makes it easy for scammers to fake caller ID information, so the name and number you see aren’t always real. If someone calls asking for money or personal information, hang up. If you think the caller might be telling the truth, call back to a number you know is genuine.",
      "Someone might ask you to pay in advance for things like debt relief, credit and loan offers, mortgage assistance, or a job. They might even say you’ve won a prize, but first you have to pay taxes or fees. If you do, they will probably take the money and disappear.",
      "Credit cards have significant fraud protection built in, but some payment methods don’t. Wiring money through services like Western Union or MoneyGram is risky because it’s nearly impossible to get your money back. That’s also true for reloadable cards like MoneyPak, Reloadit or Vanilla. Government offices and honest companies won’t require you to use these payment methods.",
      "Before you give up your money or personal information, talk to someone you trust. Con artists want you to make decisions in a hurry. They might even threaten you. Slow down, check out the story, do an online search, consult an expert — or just tell a friend.",
      "If you answer the phone and hear a recorded sales pitch, hang up and report it to the FTC. These calls are illegal, and often the products are bogus. Don’t press 1 to speak to a person or to be taken off the list. That could lead to more calls.",
      "Some companies use free trials to sign you up for products and bill you every month until you cancel. Before you agree to a free trial, research the company and read the cancellation policy. And always review your monthly statements for charges you don’t recognize.",
      "By law, banks must make funds from deposited checks available within days, but uncovering a fake check can take weeks. If a check you deposit turns out to be a fake, you’re responsible for repaying the bank.",
      "Get the latest tips and advice about scams sent right to your inbox."
    ];

    var imgLink = ["./image/books3.jpg", "./image/books3.jpg", "./image/books3.jpg", "./image/books3.jpg", "./image/books3.jpg",
      "./image/books3.jpg", "./image/books3.jpg", "./image/books3.jpg", "./image/books3.jpg", "./image/books3.jpg"
    ];
    var itemOption = [" Add to favorite ", " Remove Now"];


    $(function() {
      //Do once when page start;
      genlist();

      //Put Favlist from Database, if any
      getFavList();
    })



    //Function haddle save favourite list
    function saveFavList(obj) {

      //change button status
      if (addedToFav[obj.value - 1] == false) {
        addedToFav[obj.value - 1] = true;
        $('#btnText' + (obj.value)).html('Remove favorite')
      } else {
        addedToFav[obj.value - 1] = false;
        $('#btnText' + (obj.value)).html('<span class="glyphicon glyphicon-heart"></span> Add to favorite</div></button>');
      }
      var user = {};
      user.act = "setFav";
      user.ac = localStorage.getItem("LoginAs");
      user.item0 = addedToFav[0];
      user.item1 = addedToFav[1];
      user.item2 = addedToFav[2];
      user.item3 = addedToFav[3];
      user.item4 = addedToFav[4];
      user.item5 = addedToFav[5];
      user.item6 = addedToFav[6];
      user.item7 = addedToFav[7];
      user.item8 = addedToFav[8];
      user.item9 = addedToFav[9];

      //If user logined, send favourite list to db 
      if (localStorage.getItem("LoginAs") != null) {

        $.ajax({
          url: "http://myweb-chunkan529713586.codeanyapp.com:5000/list.html",
          type: "POST",
          data: user,
          success: function(result) {
            //alert(result);
            console.log(result);

            //add Favorite list to local storage & Mongodb
            if (result == "ADD OK") {

              //window.location.replace("http://myweb-chunkan529713586.codeanyapp.com:5000/list.html");
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
    }

    function getFavList() {
      //alert("getFav");
      var user = {};
      user.act = "getFav";
      user.ac = localStorage.getItem("LoginAs");
      //alert("User :" + user.act)
      //Get favourite list if login
      if (localStorage.getItem("LoginAs") != null) {

        $.ajax({
          url: "http://myweb-chunkan529713586.codeanyapp.com:5000/list.html",
          type: "POST",
          data: user,
          success: function(result) {
            //alert("Result :" + result);

            var temp = result.split('|');
            //remove first element (Username) in array
            temp.shift();

            //Convert string array to boolean array
            for (var i = 0; i < temp.length; i++) {
              if (temp[i] == "true") {
                addedToFav[i] = true;
              } else {
                addedToFav[i] = false;
              }
            }

            //console.log(addedToFav[0]);
            genlist();

            //console.log(result);

            //If user have favourite list, retieve to web page
            /*if (result) {
              for (var i = 0; i <= 9; i++) {
                addedToFav[i] = "result.item" + i
              }
              //window.location.replace("http://myweb-chunkan529713586.codeanyapp.com:5000/list.html");
            }*/

            if (result.status == 200) {
              console.log("hope can see here");
            }
          },
          error: function(result) {
            console.log(result);
          }

        })
      }
      //Write favourite array to localStorage
      /*if (localStorage.getItem('favList')) {
        for (var i = 0; i < 9; i++) {
          localStorage.getItem('favList')[i] = addedToFav[i];
        }
      }*/

    }

    console.log(addedToFav);

    //Generate 10 list item by looping
    function genlist() {
      //console.log("GEN!!!")
      //console.log("ADD : " + addedToFav)
      $('#fullList').html("");

      for (var i = 0; i < listTitle.length; i++) {
        console.log(addedToFav[i]);
        var tempString1 = '<a href="#" class="list-group-item" name = "item' + i + ' " onclick = "return false"><div class="media col-md-3"><figure class="pull-left"><img class="media-object img-rounded img-responsive" src="' + imgLink[i] + '" ></figure></div>';
        var tempString2 = '<div class="col-md-6"><h4 class="list-group-item-heading">' + listTitle[i] + '</h4><p class="list-group-item-text"> ' + listItem[i] + '</p></div>';
        var tempString3 = "";


        if (addedToFav[i] == true) {
          console.log("B");
          tempString3 = '<div class="col-md-3 text-center"><div class="stars"></br></div><button type="button" class="btn btn-primary btn-lg btn-block" id = "favBtn' + (i + 1) + '" value = "' + (i + 1) + '" onclick = "saveFavList(this)"> <div id = "btnText' + (i + 1) + '">Remove favorite</div></button></div></a>';
        } else {
          console.log("A");
          tempString3 = '<div class="col-md-3 text-center"><div class="stars"><h1><span id = "heartItem10" class="glyphicon glyphicon-heart"></span></h1></div><button type="button" class="btn btn-primary btn-lg btn-block" id = "favBtn' + (i + 1) + '" value = "' + (i + 1) + '"  onclick = "saveFavList(this)"><div id = "btnText' + (i + 1) + '"><span class="glyphicon glyphicon-heart"></span> Add to favorite</div></button></div></a>';
        }

        var tempString = tempString1 + tempString2 + tempString3;


        $('#fullList').append(tempString);
      }
      //console.log("addedToFav : " + addedToFav)
    }