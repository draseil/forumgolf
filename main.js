var http = require('http');
var url = require('url');

var posts = [
	["name", "post"],
	["example_name", "example_post"]
];

function getPosts(post) {
	return "name: " + post[0] + "\n" + post[1];
}

http.createServer(function (req, res) {
	var q = url.parse(req.url, true).query;
//	res.write(q.thread + '\nHello World!\n');
	for (var i = 0; i < posts.length; i++) {
		res.write("name: " + posts[i][0] + "\n" + posts[i][1] + "\n");
	}
    res.end();
}).listen(8080);
