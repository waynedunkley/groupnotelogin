var db = require("../db");
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

exports.home = function(req, res){
	if(req.session.username == undefined){
		res.render('login', { username: "" });
	}else{
		res.render('index', { username: req.session.username });
	}
};

exports.register_post = function(req, res){
	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;
	var success = true;
	var usernameaval = true;
	var emailaval = true;
	
	//check username is free
	db.users.find({ username: username }, function(err, user) {
		//username if free
		if(user == ""){
			//check email not already registered
			db.users.find({ email: email }, function(err, mail) {
				if(mail == ""){ //username if free
					//encrpyt password
					var hash = bcrypt.hashSync(password, salt);
					
					
					db.users.save({ username: req.body.username, email: req.body.email, password: hash }, function(err, saved){
						console.log("user saved!!!");
						req.session.username = username;
						req.session.email = email;
						res.json({ success: success, usernameaval: usernameaval, emailaval: emailaval});
					});
				}else{
					emailaval = false;
					success = false;
					res.json({ success: success, usernameaval: usernameaval, emailaval: emailaval});
				}
			});
		}else{
			usernameaval = false;
			success = false;
			res.json({ success: success, usernameaval: usernameaval, emailaval: emailaval});
		}
	});
};

exports.login_post = function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	var success = true;
	var msg; //1= user not found, 2= password incorrect
	
	db.users.find({ username: username }, function(err, user) {
		if(user[0]){
			console.log('user found');
			if(bcrypt.compareSync(password, user[0].password)){
				req.session.username = username;
				res.json({ success: success });
				console.log('successful login');
			}else{
				success = false;
				res.json({ success: success, msg: 2});
			}
		}else{
			success = false;
			res.json({ success: success, msg: 1});
		}
	});
};