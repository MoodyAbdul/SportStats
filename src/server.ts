var http: any = require('http');

var port = 8080;

function handleRequest(request: any, response: any){
	response.end('Does this shit work?' + request.url);
}

var server = http.createServer(handleRequest);

server.listen(port, function() {
	console.log('please tell me this shit works fr');
});