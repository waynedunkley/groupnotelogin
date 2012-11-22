var db = require("../db");
	
	
exports.list = function(req, res){
	db.users.find(function(err, users) {
		if( err || !users) console.log(err);
		else if ( users == 0) console.log("There are no users");
		else users.forEach(function(user){
			console.log(user);
		});
	});
	res.send("Users listed in terminal");
};



exports.deleteusers = function(req, res){
	db.users.remove({}); 
	res.send("All users deleted")
};

exports.sessionuser = function(req, res){
	console.log(req.session.username);
	console.log(req.session.email);
	res.send("session user in terminal");
};