/**
 * Created by andre on 10.06.2017.
 */
module.exports = (httpsServer) => {
    var io = require('socket.io')(httpsServer);

    var connections = [];
    var connectionGeolocation = {};

    io.on('connection', function (socket) {
        connections.push(socket);

        console.log('a user connected, total count %s', connections.length);
        socket.on('disconnect', () => {
            connections.splice(connections.indexOf(socket), 1);
            connectionGeolocation[socket.id] = undefined;
            console.log('a user disconnected, total count %s', connections.length);

            socket.broadcast.emit('removeGeo', socket.id);
        });
        socket.on('setGeo', (position) => {
            console.log('a user set geo , total count %s', connections.length);
            connectionGeolocation[socket.id] = position;
            io.emit('newGeo', {id: socket.id, position});

        });
        socket.on('wantGeos', () => {
            console.log('a user want geo, total count %s', connections.length);

            socket.emit('getFullGeos', connectionGeolocation);
        });
    });
}