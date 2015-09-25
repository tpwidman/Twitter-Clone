/* Require node modules to implement */
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var app = require('./server/app.js');

/*createServer takes in a function to handle requests. Here is where you can create a handler for get and post requests. 
Note: req(request) and res(response) come from node's http module. 
They include both incoming information like urls and outgoing like content */

/*In order to complete the project, this callback will need to handle get requests, post requests and server up other files like css.

Hint: creating a function to replace the anonymous function may be useful.
		EXAMPLE:
		function requestHandler(req, res) {
			if(request url === '/'){
				// handle this way
			} else if(request url === '/messages'){
				if(request method  === 'GET'){
					// handle this way
				}

				...
		};

		var server = http.createServer(requestHandler)


*/
var server = http.createServer(app.handleRequests);

/*Requests are completed over port numbers and each one needs a unique number. Most port numbers between 0 - 1024 are reserved so here 3000 is a standard testing port to use. More on port numbers: https://en.wikipedia.org/wiki/Port_(computer_networking) */
var port = 3000;

server.listen(port);
console.log('Listening on port', port);





