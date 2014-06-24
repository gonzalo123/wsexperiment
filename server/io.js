var
    express = require('express'),
    expressApp = express(),
    server = require('http').Server(expressApp),
    io = require('socket.io')(server, {origins:'localhost:*'})
    ;

expressApp.get('/emit', function (req, res) {
    io.sockets.emit('io.response', {item: 'answer', value: req.query.newValue});
    res.json('OK');
});

expressApp.listen(3001, 'localhost', function() {
    console.log('Express started');
});

server.listen(3000, function() {
    console.log('IO started');
});