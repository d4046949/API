module.exports = function(io) {

    io.sockets.on('connection', function (socket) {
        socket.on('message', function (message) {

            console.log(message);
            var data = new Object();
            data.pseudo = 'Server Relay';
            data.message = message;
            socket.broadcast.emit('message',data); // relays message to other connected users

        });

    });
};