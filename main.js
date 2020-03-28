var express = require("express");
var app = express();

app.get("/", function (req, res) {
	res.setHeader('Content-Type', 'text/html');
	res.write('<form action="/process_get" method="GET"><label for="username">Username:</label><input type="text" name="username"><br/><label for="post">Post: </label><input type="text" id="post" name="post" required><input type="submit" value="Post!"/></form>');
	res.end();
});

app.get("/process_get", function(req, res) {
	response = {
		username:req.query.username,
		post:req.query.post
	};
	console.log(response);
	res.end(JSON.stringify(response));
});


app.listen(8080);
