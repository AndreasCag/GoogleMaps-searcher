/**
 * Created by andre on 06.06.2017.
 */

var mapWorker = require('./mapWorker');

var myPosition;
var mainMap;
var socket;
function positionWatcher(position) {
    socket.iWantToSetGeo(position);

    if (!myPosition) {
        socket.iWantToGetFullGeos();

        mapWorker.setCenter(mainMap, position);
    }

    myPosition = position;
}

function watchGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(positionWatcher);
    } else {
        alert("You browser doesn't support geolocation");
    }
}

module.exports = function (map, _socket) {

    if (_socket)
        socket = _socket;
    if (map)
        mainMap = map;

    return {
        watchGeolocation
    }

}