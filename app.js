
var port = 1337;

var express = require('express')
	, app = require('express')()
	, server = require('http').createServer(app)
	, io = require('socket.io').listen(server)
	, http = require('http')
	, path = require('path')
  
var index = require('./routes/index')
	, dbadmin = require('./routes/dbadmin');

require('./config')(app, express, path);


app.get('/', index.home);
app.get('/register', function (req, res){
	res.render('register', { title: 'GroupNote' });
});
app.post('/register', index.register_post);
app.post('/login', index.login_post);
app.get('/logout', function (req, res) {
  req.session = null;
  res.redirect('/');
});


//ADMIN
app.get('/dblist', dbadmin.list);
app.get('/dbdeleteusers', dbadmin.deleteusers);
app.get('/dbsessionuser', dbadmin.sessionuser);


server.listen(port);
console.log('Listening on port ' + port);