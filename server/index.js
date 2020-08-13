const { info } = require('console');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = '6677';
var servidor = 'http://localhost';


app.use(express.static('client'));
var messages=[{
    id:1,
    text: "Bienvenido al Chat privado de Miguel Angel",
    nickname: "Bot"
}];



//rutas
app.get('/hola-mundo', function(req, res){
    res.status(200).send("<h1>Hola Mundo</h1>");
})

io.on('connection', function(socket){
    console.log("Usuario conectado con IP:" + socket.handshake.address);
    socket.emit('messages', messages);
    socket.on('add-message', function(data){
            messages.push(data);
            io.sockets.emit('messages', messages);
    })
});



server.listen(port, function(){
    console.log("Servidor funciona en " + servidor +":"+port);
});