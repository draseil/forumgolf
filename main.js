var express = require("express");
var body_parser = require("body-parser");
var app = express();
var urlencoded_parser = body_parser.urlencoded({ extended: false });

var threads = {"first-thread" : [[]]};
var thread_names = Object.keys(threads);

app.get("/", function(req, res) {
	for (var i = 0; i < thread_names.length; i++) {
		res.write('<a href="' + thread_names[i] + '">' + thread_names[i] + "</a><br/>");
	}
	res.end();
});

for (var i = 0; i < thread_names.length; i++) {
	var current_thread = thread_names[i];

	app.post("/" + current_thread + "/new_post", urlencoded_parser, function(req, res) {
		threads[current_thread].push([req.body.username, req.body.post]);
		res.end("Post published!  Go back to take a look");
	});

	app.get("/" + current_thread, function(req, res) {
		res.setHeader('Content-Type', 'text/html');
		res.write('<form action="/' + current_thread + '/new_post" method="POST"><label for="username">Username:</label><input type="text" name="username"><br/><label for="post">Post: </label><input type="text" id="post" name="post" required><input type="submit" value="Post!"/></form>');
		var posts = threads[current_thread];
		for (var i = 0; i < posts.length; i++) {
			if (posts[i][0] === undefined) {
				continue;
			} else if (posts[i][0] === "") {
				posts[i][0] = "Anonymous";
			}
			res.write("<b>" + posts[i][0] + "</b><br/>" + posts[i][1] + "<br/><br/>");
		}
		res.end();
	});
}

app.listen(8080);
