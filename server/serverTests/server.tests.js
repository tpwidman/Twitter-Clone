var expect = require('../../node_modules/chai/chai').expect;
var request = require('request');
var url = require('url');

function waitForThen(test, cb) {
  setTimeout(function() {
    test() ? cb.apply(this) : waitForThen(test, cb);
  }, 5);
}

function parseData(body){
  var messages = [];
  body.split('\n').forEach(function(text){
      if(text.length){
        text = JSON.parse(text);
        messages.push(text);
      }
  });
  return messages;
}


describe('Node Server', function() {

  it('Should answer requests for / with a 200 status code', function(done) {
    request('http://127.0.0.1:3000/', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('Should answer requests for content according to contentType', function(done) {
    request('http://127.0.0.1:3000/', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });




  it('Should answer GET requests for /messages with a 200 status code', function(done) {
    request('http://127.0.0.1:3000/messages', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should send text data as a string ready to parse', function(done) {
    request('http://127.0.0.1:3000/messages', function(error, response, body) {
      expect(body).to.be.a('string');
      done();
    });
  });

  it('should accept POST requests to /messages', function(done) {
    var requestParams = {
      method: 'POST',
      uri: 'http://127.0.0.1:3000/messages',
      json: {
        text: '8-bit High Life cred!',
        userName: 'bot'
      }
    };

    request(requestParams, function(error, response, body) {
      expect(response.statusCode).to.equal(201);
      done();
    });
  });

  it('should respond with messages that were previously posted', function(done) {
    var requestParams = {
      method: 'POST',
      uri: 'http://127.0.0.1:3000/messages',
      json: {
        text: '8-bit High Life cred!',
        userName: 'bot'
      }
    };

    request(requestParams, function(error, response, body) {
      request('http://127.0.0.1:3000/messages', function(error, response, body) {

        var messages = parseData(body);
        var len = messages.length - 1;
          expect(messages[len].userName).to.equal('bot');
          expect(messages[len].text).to.equal('8-bit High Life cred!');
          done();
        });
    });
  });

  it('Should 404 when asked for a nonexistent file', function(done) {
    request('http://127.0.0.1:3000/arglebargle', function(error, response, body) {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });

});