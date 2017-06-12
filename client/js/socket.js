/**
 * Created by andre on 10.06.2017.
 */
var io = require("socket.io-client");
var socket = io();
var map;
var mapWorker = require('./mapWorker');
var fullGeos;

var markers = {};

socket.on('getFullGeos', (data) => {
    fullGeos = data;
    for (var id in data) {
        var position = data[id];
        if (position.coords) {
            if (!markers[id]) {
                var marker = mapWorker.createMarker(map, position, 'H');
                markers[id] = marker;
                continue;
            }

            mapWorker.setMarkerPosition(markers[id], position);
        }
    }
});
socket.on('newGeo', (data) => {
    if (!markers[data.id]) {
        var name = data.id === socket.id ? "I'm" : "H";
        var marker = mapWorker.createMarker(map, data.position, name);

        markers[data.id] = marker;
        return;
    }
    mapWorker.setMarkerPosition(markers[data.id], data.position);

});

socket.on('removeGeo', (id) => {
    if (markers[id]) {
        mapWorker.removeMapElement(markers[id]);
    }
});

function deepCopy(obj) {
    var val = {}
    for (var i in obj) {
        if (typeof(obj[i]) == "object")
            val[i] = deepCopy(obj[i]);
        else
            val[i] = obj[i];
    }
    return val;
}

module.exports = function (_map) {
    if (_map)
        map = _map

    return {
        iWantToGetFullGeos() {
            socket.emit('wantGeos');
        },
        iWantToSetGeo(position) {
            var val = deepCopy(position);

            socket.emit('setGeo', val);
        },
        get id() {
            return socket.id;
        },
        get markers() {
            return markers;
        },
        get myMarker() {
            return markers[socket.id];
        }
    }
}

