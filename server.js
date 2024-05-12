var http = require("http");
var fs = require("fs");
var path = require("path");

var server = http.createServer(function (req, res) {
	var filePath = "." + req.url;
	if (filePath == "./") {
		filePath = "./index.html";
	}

	var extname = String(path.extname(filePath)).toLowerCase();
	var mimeTypes = {
		".html": "text/html",
		".js": "text/javascript",
		".css": "text/css",
		".json": "application/json",
		".png": "image/png",
		".jpg": "image/jpg",
		".gif": "image/gif",
		".svg": "image/svg+xml",
		".ico": "image/x-icon",
	};

	var contentType = mimeTypes[extname] || "application/octet-stream";

	fs.readFile(filePath, function (error, content) {
		if (error) {
			if (error.code == "ENOENT") {
				fs.readFile("./404.html", function (error, content) {
					res.writeHead(404, { "Content-Type": "text/html" });
					res.end(content, "utf-8");
				});
			} else {
				res.writeHead(500);
				res.end(
					"Sorry, check with the site admin for error: " + error.code + " ..\n"
				);
			}
		} else {
			res.writeHead(200, { "Content-Type": contentType });
			res.end(content, "utf-8");
		}
	});
});

const port = 8080;
server.listen(port, function () {
	console.log(`Server berjalan pada http://localhost:${port}`);
});
