var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(1030);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {

  socket.on('valide', function (data) {
    console.log(data);  
    socket.broadcast.emit('valide', {
      id: socket.id,
      message: data
    });
  });

  socket.on('load', function (data) {
    socket.id = data.id;
  });


});