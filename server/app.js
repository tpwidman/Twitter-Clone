var fs = require('fs');
var path = require('path');
var url = require('url');

function getFileExtension(route) {
    var arr = route.split('.');
    if(arr.length<=1) {
        return 'html';
    }
    return arr[arr.length -1].toLowerCase();
}

function handleRequests(req, res) {

    var header;
    var route = url.parse(req.url).path;

    if(route === '/') {
        route = '/index.html';
    }
    var ext = getFileExtension(route);

    switch (ext) {
        case 'css':
            header = {
                'Content-Type': 'text/css'
            };
            break;
        case 'js':
            header = {
                'Content-Type': 'application/javascript'
            };
            break;
        case 'html':
            header = {
                'Content-Type': 'text/html'
            };
            break;
        default:
            header = {
                'Content-Type': 'application/json'
            };
            break;
    }
    var filePath;
    if(route === '/messages') {
        if(req.method === 'GET') {
            filePath = './messages.txt';
            readFile(filePath, header, res);
        }
        if(req.method === 'POST') {
            var body = '';
            req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                writeTweet(JSON.parse(body), res);
            });
        }
    } else {
        filePath = '../client' + route;
        readFile(filePath, header, res);
    }
}

function writeTweet(tweet, res) {
    if(tweet.text && tweet.userName) {
        console.log(tweet);
        fs.appendFile(__dirname + '/messages.txt', '\n' + JSON.stringify(tweet), function(err){
            res.writeHead(201);
            res.end();
        });
    } else {
        console.log('server error');
        res.writeHead(500);
        res.end();
    }
}

function readFile(filePath, header, res) {
    
    var file = path.join(__dirname, filePath);
      fs.readFile(file, function (err, data) {
          if(err) {
              var statusCode = statusCode || 404;
              res.writeHead(statusCode, header);
              res.end(data);
          }
        var statusCode = statusCode || 200;
        res.writeHead(statusCode, header);
        res.end(data);
      });
};

 
module.exports = {
    handleRequests: handleRequests
};