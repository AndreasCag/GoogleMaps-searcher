/**
 * Created by andre on 06.06.2017.
 */

var center = {lat: 55.7534014, lng: 37.6222947};

var getGoogleMapLocation = (position) => {
    if (position.lat)
        return position;
    return new google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude);

};

var createMarker = (map, position, title) => {
    var myMarker = new google.maps.Marker({
        position: position.lat ? position : getGoogleMapLocation(position),
        map: map,
        label: title ? title : "I'm"
    });
    return myMarker;
}

module.exports = {
    initialize: function () {

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: center
        });
        return map;
    },
    setCenter: function (map, position) {
        center = getGoogleMapLocation(position);
        map.setCenter(
            center
        )
    },

    setMarkerPosition(marker, position) {
        marker.setPosition(getGoogleMapLocation(position));
    },

    createMarker : createMarker,

    createInfoWindow(map, position, content) {
        var infoWindow = new google.maps.InfoWindow({map: map});
        infoWindow.setPosition(getGoogleMapLocation(position));
        infoWindow.setContent(content);
        return infoWindow;
    },

    removeMapElement(el) {

        el.setMap(undefined);
        el = undefined;
    }
}