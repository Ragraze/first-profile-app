var http = require("http");
var fs = require("fs");

var server = http.createServer(function (req, res) {
	fs.readFile("./index.html", function (err, data) {
		if (err) {
			res.writeHead(500);
			res.end("Error loading index.html");
		} else {
			res.writeHead(200, { "Content-Type": "text/html" });
			res.write(data);
			res.end();
		}
	});
});
const port = 8080;
server.listen(port, function () {
	console.log(`Server berjalan pada http://localhost:${port}`);
});
