var http = require("http");
var fs = require("fs");
var qs = require("querystring");
var mongodb = require("mongodb");
var MongoClient = require("mongodb").MongoClient;
require("events").EventEmitter.prototype._maxListeners = 100;

var mongodbServer = new mongodb.Server("localhost", 27017, {
	auto_reconnect: true,
	poolSize: 10
});
var db = new mongodb.Db("dataB", mongodbServer);
var usersssssss = "";
var isTriedLogin = false,
	isLoginSuccessful = false;
var canRegis = true;

var server = http.createServer(function(request, response) {
	if (request.method == "POST") {



		console.log("post call");
		// Switch msg into a JSON object
		var formData = "",
			msg = "",
			obj = "";
		return request.on("data", function(data) {
			formData += data;


		}).on('end', function(chunk) {
			var user;
			user = qs.parse(formData);
			msg = JSON.stringify(user);
			console.log("305cde=" + msg);

			obj = JSON.parse(msg);
			//console.log("aa=" + obj['act']);
			if (request.url == "/login.html") {
				console.log("login page comes");


				if (obj['act'] == "signup") {
					//if (obj.signup != null) {

					console.log("SIGNUP");
					// Send obj data to dataB

					db.open(function() {

						db.collection("user", function(err, collection) {

							collection.insert({

								username: obj.ac,
								password: obj.pw
							}, function(err, data) {

								if (data) {
									console.log("Successfully Insert");
									//response.end(200, {'success': "apple"});
									response.end('{"success" : "Updated Successfully", "status" : 200}');
								} else {
									console.log("Failed to Insert");
								}
								db.close();
							});
						});
					});

				} else if (obj['act'] == "login") {
					//if (obj.signup != null) {
					//	response.end('{"success" : "Updated Successfully", "status" : 200}');
					console.log("Try to login");
					// Send obj data to dataB
					//	db.open(function() {

					//		db.collection("user", function(err, collection) {

					//collection.find({

					//		username: obj.ac,
					//			password: obj.pw
					//		}, function(err, data) {

					//	if (data) {





					var username = obj.ac;
					var password = obj.pw;

					console.log("User input login: " + obj.ac);
					console.log("User input password: " + obj.pw);

					MongoClient.connect("mongodb://localhost:27017/dataB", function(err, db) {
						db.collection("user", function(err, collection) {
							collection.find({
								username: obj.ac
							}).toArray(function(err, items) {
								if (err) throw err;
								// Check whether there is data in the dataB
								console.log(items.length);
								if (items != "") {
									// Check whether the user account exists
									isLoginSuccessful = false;
									for (var i = 0; i < items.length; i++) {

										//	if (username == items[i].ac && password == items[i].pw) {
										console.log("find user: " + items[i].username);
										console.log("find password: " + items[i].password);
										//console.log("user1=" + obj.ac);
										//console.log("pass1=" + obj.pw);
										if (items[i].username == obj.ac && items[i].password == obj.pw) {
											usersssssss = items[i].username;

											//console.log("if user=" + items[i].username);
											//console.log("if pass=" + items[i].password);
											console.log("USER FOUND CONFIGURATION");
											//response.end('{"success" : "Updated Successfully", "status" : 200}');
											isLoginSuccessful = true;
										} else {
											//response.end('{"success" : "Updated Successfully", "status" : 200}');
										}


									}


									/*	  fs.readFile('./json.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
											console.log("end here");
                });*/

									if (isLoginSuccessful == false) {
										console.log("Fail to login");
										response.end('Password invald.');
									} else {
										console.log("LOGIN OK");
										response.end('LOGIN OK');
									}
								} else {
									console.log("Fail to login");
									response.end('No such user.');
								}
							});
						});
					});
					//	} else {
					//	console.log("Failed to Insert");
					//	}
					//	});
					//});
					//	});

				}
			} else if (request.url == "/list.html") {

				//Get favourite list from ajax and send to DB
				if (obj['act'] == "setFav") {
					//if (obj.signup != null) {

					console.log("Modify favourite list");
					console.log("Your are : " + obj.ac) // Send obj data to dataB
					console.log("item0 : " + obj.item0)
					console.log("item9 : " + obj.item9)

					db.open(function() {

						db.collection("favList", function(err, collection) {

							collection.update({
								username: obj.ac
							}, {
								username: obj.ac,
								item0: obj.item0,
								item1: obj.item1,
								item2: obj.item2,
								item3: obj.item3,
								item4: obj.item4,
								item5: obj.item5,
								item6: obj.item6,
								item7: obj.item7,
								item8: obj.item8,
								item9: obj.item9


							}, {
								upsert: true
							}, function(err, data) {

								if (data) {
									console.log("Successfully add favourite list");
									console.log("DATA: " + data);
									//response.end(200, {'success': "apple"});
									response.end('{"success" : "Favorite list added", "status" : 200}');
								} else {
									console.log("Failed to add");
								}
								//close connection either success or error
								db.close();
							});
						});
					});
					//end of obj['act'] == "setFav"

				} else if (obj['act'] == "getFav") {

					console.log("get favourite list");
					var username = obj.ac;

					console.log("Favlist login=" + obj.ac);

					MongoClient.connect("mongodb://localhost:27017/dataB", function(err, db) {
						db.collection("favList", function(err, collection) {
							collection.find({
								username: obj.ac
							}).toArray(function(err, items) {

								if (err) throw err;
								// Check whether there is data in the dataB
								console.log("Length : " + items.length);

								var tempString = "";
								if (items != "") {

									tempString = items[0].username + "|" + items[0].item0 + "|" + items[0].item1 + "|" + items[0].item2 + "|" + items[0].item3 + "|" + items[0].item4 + "|" + items[0].item5 + "|" + items[0].item6 + "|" + items[0].item7 + "|" + items[0].item8 + "|" + items[0].item9;

									/*	  fs.readFile('./json.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
											console.log("end here");
                });*/

								}
								response.end(tempString);
							});
						});
					});
				}

				//end of if (request.url == "/list.html")
			} else if (request.url == "/search.html") {
				console.log("search page comes");


				if (obj['act'] == "setArticle") {
					//if (obj.signup != null) {

					console.log("Add Article");
					// Send obj data to dataB

					db.open(function() {

						db.collection("article", function(err, collection) {

							collection.insert({

								tile: obj.title,
								content: obj.content
							}, function(err, data) {

								if (data) {
									console.log("Successfully ADD");
									//response.end(200, {'success': "apple"});
									response.end('{"success" : "Updated Successfully", "status" : 200}');
								} else {
									console.log("Failed to Insert");
								}
								db.close();
							});
						});
					});

				} else if (obj['act'] == "getArticle") {
					//if (obj.signup != null) {
					//	response.end('{"success" : "Updated Successfully", "status" : 200}');
					console.log("search article");
					console.log("input title=" + obj.title);


					MongoClient.connect("mongodb://localhost:27017/dataB", function(err, db) {
						db.collection("article", function(err, collection) {
							collection.find({
								$or: [{
									tile: {
										$regex: obj.title
									}
								}, {
									content: {
										$regex: obj.title
									}
								}]
							}).toArray(function(err, items) {
								if (err) throw err;
								// Check whether there is data in the dataB
								console.log(items.length);
								if (items != "") {
									// Check whether the user account exists
									var tempstring = "";
									isLoginSuccessful = false;
									for (var i = 0; i < items.length; i++) {


										//Store search result to string
										console.log("title=" + items[i].tile);
										console.log("content=" + items[i].content);
										tempstring += items[i].tile + '|';
										tempstring += items[i].content + '|';

									}

									//send result back to ajax
									response.end(tempstring);

								} else {
									response.end("No suitable results!");
								}
							});
						});
					});
					//	} else {
					//	console.log("Failed to Insert");
					//	}
					//	});
					//});
					//	});

				}
			} //if request.url = login.html

		})
	} else if (request.url == "/search2") {
		fs.readFile('./search.html', function(error, content) {
			console.log("search page");
			response.writeHead(200, {
				'Content-Type': 'text/html'
			});
			response.end(content, 'utf-8');
		});
	} else {

		// Get
		fs.readFile("./" + request.url, function(err, data) {
			var dotoffset = request.url.lastIndexOf(".");
			var mimetype = dotoffset == -1 ?
				"text/plain" : {
					".html": "text/html",
					".ico": "photo/x-icon",
					".jpg": "photo/jpeg",
					".png": "photo/png",
					".gif": "photo/gif",
					".css": "text/css",
					".js": "text/javascript"
				}[request.url.substr(dotoffset)];
			if (!err) {
				response.setHeader("Content-Type", mimetype);
				response.end(data);
				console.log(request.url, mimetype);
			} else {
				response.writeHead(302, {
					"Location": "./index.html"
				});
				response.end();
			}
		});
	}
});

server.listen(5000);

console.log("Server running at http://127.0.0.1:5000/");