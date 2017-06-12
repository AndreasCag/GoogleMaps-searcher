/**
 * Created by Andreas on 11.06.2017.
 */
var Vue = require('vue');

var socket = require('./socket')();
var mapWorker = require('./mapWorker');

Vue.directive('hide-for', {
    bind(button, b, vnode, oldVnode) {
        const id = b.value
        button.addEventListener('click', (b) => {
            var elsToToggle = document.querySelectorAll(`[hide-name="${id}"]`);
            elsToToggle.forEach((el) => {
                el.classList.toggle('hide');
            })
        }, false)
    }
});

var placeInfoWindows = [];

module.exports = function (map) {
    if (!window.vueBinding) {
        window.vueBinding = new Vue({
            el: '#app',
            data: {
                selectedClasses: []
            },
            methods: {
                getPlaces: function () {

                    this.clear();
                    if (this.selectedClasses.length === 0)
                        return;

                    var pyrmont = socket.myMarker.getPosition();

                    // Specify location, radius and place types for your Places API search.
                    var request = {
                        location: pyrmont,
                        radius: '5000',
                        types: this.selectedClasses
                    };

                    // Create the PlaceService and send the request.
                    // Handle the callback with an anonymous function.
                    var service = new google.maps.places.PlacesService(map);
                    service.nearbySearch(request, function (results, status) {
                        if (status == google.maps.places.PlacesServiceStatus.OK) {
                            for (var i = 0; i < results.length; i++) {
                                var place = results[i];
                                // If the request succeeds, draw the place location on
                                // the map as a marker, and register an event to handle a
                                // click on the marker.
                                var infoWindow = mapWorker.createInfoWindow(map, place.geometry.location, place.name);
                                placeInfoWindows.push(infoWindow);
                            }
                        }
                    });
                },
                clear() {
                    for (let info of placeInfoWindows) {
                        mapWorker.removeMapElement(info);
                    }
                }
            }
        })
    }


}
